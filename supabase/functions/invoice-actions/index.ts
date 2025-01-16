import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PDFDocument, rgb, StandardFonts } from "https://cdn.skypack.dev/pdf-lib";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

async function getInvoiceData(invoiceId: string) {
  console.log("Buscando dados da fatura:", invoiceId);
  
  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .select(`
      *,
      customer:customers(name, email),
      items:invoice_items(*)
    `)
    .eq("id", invoiceId)
    .maybeSingle();

  if (invoiceError) {
    console.error("Erro ao buscar fatura:", invoiceError);
    throw invoiceError;
  }
  
  if (!invoice) {
    console.error("Fatura não encontrada");
    throw new Error("Fatura não encontrada");
  }

  return invoice;
}

async function getActiveTemplate(customerId: string) {
  console.log("Buscando template ativo para cliente:", customerId);
  
  const { data: company, error: companyError } = await supabase
    .from("company_profiles")
    .select("active_template_id")
    .eq("user_id", customerId)
    .maybeSingle();

  if (companyError) {
    console.error("Erro ao buscar perfil da empresa:", companyError);
    throw companyError;
  }

  if (!company?.active_template_id) {
    console.log("Nenhum template ativo encontrado, usando padrão");
    return null;
  }

  const { data: template, error: templateError } = await supabase
    .from("invoice_templates")
    .select("*")
    .eq("id", company.active_template_id)
    .maybeSingle();

  if (templateError) {
    console.error("Erro ao buscar template:", templateError);
    throw templateError;
  }

  return template;
}

async function generatePDF(invoiceData: any, template: any) {
  console.log("Gerando PDF para fatura:", invoiceData.id);
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  // Configurar fonte baseada no template
  const fontSize = template?.content?.body?.fontSize || 12;
  const fontFamily = template?.content?.body?.fontFamily || StandardFonts.Helvetica;
  const font = await pdfDoc.embedFont(fontFamily);
  
  // Cabeçalho
  const headerBgColor = template?.header_background_color || "#FFFFFF";
  const headerTextColor = template?.header_text_color || "#000000";
  const [r, g, b] = hexToRgb(headerTextColor);
  
  // Título INVOICE
  page.drawText("INVOICE", {
    x: 50,
    y: height - 50,
    size: 32,
    font,
    color: rgb(r/255, g/255, b/255),
  });

  // Subtítulo "Generated by InvoiceHub"
  page.drawText("Generated by InvoiceHub", {
    x: 50,
    y: height - 80,
    size: 12,
    font,
    color: rgb(0.063, 0.725, 0.506),
  });

  // Informações do cliente
  page.drawText(`Cliente: ${invoiceData.customer.name}`, {
    x: 50,
    y: height - 120,
    size: fontSize,
    font,
  });

  // Itens da fatura
  let yPosition = height - 160;
  const tableStyle = template?.table_style || "modern";
  const lineHeight = tableStyle === "modern" ? 30 : 25;

  invoiceData.items.forEach((item: any) => {
    page.drawText(`${item.description}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font,
    });

    page.drawText(`${item.quantity}x`, {
      x: 300,
      y: yPosition,
      size: fontSize,
      font,
    });

    page.drawText(`R$ ${item.total.toFixed(2)}`, {
      x: 400,
      y: yPosition,
      size: fontSize,
      font,
    });

    yPosition -= lineHeight;
  });

  // Total
  page.drawText(`Total: R$ ${invoiceData.total.toFixed(2)}`, {
    x: 350,
    y: yPosition - 20,
    size: fontSize + 2,
    font,
    color: rgb(0, 0, 0),
  });

  return await pdfDoc.save();
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : [0, 0, 0];
}

async function uploadPDF(pdfBytes: Uint8Array, invoiceId: string) {
  const pdfPath = `invoices/${invoiceId}.pdf`;
  
  const { error: storageError } = await supabase
    .storage
    .from('invoices-invoicehub')
    .upload(pdfPath, pdfBytes, {
      contentType: 'application/pdf',
      upsert: true
    });

  if (storageError) throw storageError;
  return pdfPath;
}

async function sendEmail(invoiceData: any, pdfUrl: string) {
  console.log("Enviando email para:", invoiceData.customer.email);
  if (!invoiceData.customer.email) {
    throw new Error("Email do cliente não encontrado");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Faturamento <faturas@alisson.ai>",
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
    const errorData = await res.text();
    console.error("Erro ao enviar email:", errorData);
    throw new Error(`Falha ao enviar email: ${errorData}`);
  }

  return res.json();
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { invoiceId, action } = await req.json();
    console.log(`Processando ação ${action} para fatura ${invoiceId}`);

    // Buscar dados da fatura
    const invoice = await getInvoiceData(invoiceId);
    let response = {};

    if (action === "generate-pdf" || action === "send") {
      // Buscar template ativo
      const template = await getActiveTemplate(invoice.customer_id);
      
      // Gerar PDF
      const pdfBytes = await generatePDF(invoice, template);
      const pdfPath = await uploadPDF(pdfBytes, invoice.id);
      const pdfUrl = `${SUPABASE_URL}/storage/v1/object/public/invoices-invoicehub/${pdfPath}`;

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
    console.error("Erro na função invoice-actions:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Erro interno do servidor",
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);