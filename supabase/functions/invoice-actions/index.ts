import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PDFDocument, rgb } from "https://cdn.skypack.dev/pdf-lib";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

async function generatePDF(invoiceData: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  page.drawText(`Fatura #${invoiceData.id.slice(0, 8)}`, {
    x: 50,
    y: height - 50,
    size: 20,
  });

  page.drawText(`Cliente: ${invoiceData.customer.name}`, {
    x: 50,
    y: height - 80,
    size: 12,
  });

  let yPosition = height - 120;
  invoiceData.items.forEach((item: any) => {
    page.drawText(`${item.description} - ${item.quantity}x - R$ ${item.total}`, {
      x: 50,
      y: yPosition,
      size: 10,
    });
    yPosition -= 20;
  });

  page.drawText(`Total: R$ ${invoiceData.total}`, {
    x: 50,
    y: yPosition - 20,
    size: 12,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

async function uploadPDF(pdfBytes: Uint8Array, invoiceId: string) {
  const { data, error } = await supabase.storage
    .from("invoices")
    .upload(`${invoiceId}.pdf`, pdfBytes, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) throw error;
  return data.path;
}

async function sendEmail(invoiceData: any, pdfUrl: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Fatura <invoices@resend.dev>",
      to: [invoiceData.customer.email],
      subject: `Fatura #${invoiceData.id.slice(0, 8)}`,
      html: `
        <h1>Sua fatura está pronta</h1>
        <p>Olá ${invoiceData.customer.name},</p>
        <p>Sua fatura #${invoiceData.id.slice(0, 8)} está disponível para download.</p>
        <p>Total: R$ ${invoiceData.total}</p>
        <p>Você pode acessar o PDF da fatura através do link: ${pdfUrl}</p>
      `,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send email");
  }

  return res.json();
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { invoiceId, action } = await req.json();

    // Buscar dados da fatura
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .select(`
        *,
        customer:customers(name, email),
        items:invoice_items(*)
      `)
      .eq("id", invoiceId)
      .single();

    if (invoiceError) throw invoiceError;

    let response = {};

    if (action === "generate-pdf" || action === "send") {
      // Gerar PDF
      const pdfBytes = await generatePDF(invoice);
      const pdfPath = await uploadPDF(pdfBytes, invoice.id);
      const pdfUrl = `${SUPABASE_URL}/storage/v1/object/public/invoices/${pdfPath}`;

      // Atualizar URL do PDF na fatura
      await supabase
        .from("invoices")
        .update({
          pdf_url: pdfUrl,
          pdf_generated_at: new Date().toISOString(),
        })
        .eq("id", invoiceId);

      response = { ...response, pdfUrl };

      if (action === "send") {
        // Enviar email
        await sendEmail(invoice, pdfUrl);
        await supabase
          .from("invoices")
          .update({
            email_sent_at: new Date().toISOString(),
            status: "sent",
          })
          .eq("id", invoiceId);

        response = { ...response, emailSent: true };
      }
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);