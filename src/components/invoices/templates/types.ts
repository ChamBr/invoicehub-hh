export type InvoiceTemplateType = 'default' | 'simple' | 'detailed' | 'professional' | 'custom';

export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string | null;
  type: InvoiceTemplateType;
  content: {
    header: {
      showLogo: boolean;
      alignment: 'left' | 'center' | 'right' | 'space-between';
      textColor: string;
      backgroundColor: string;
      title: string;
    };
    body: {
      fontFamily: string;
      fontSize: string;
      lineHeight: string;
      tableStyle: 'simple' | 'minimal' | 'modern' | 'bordered';
      headerBackgroundColor: string;
      headerTextColor: string;
      rowBackgroundColor: string;
      alternateRowBackgroundColor: string;
      showHours?: boolean;
      showRate?: boolean;
    };
    footer: {
      showSignature: boolean;
      showTerms: boolean;
      alignment: 'left' | 'center' | 'right' | 'justified';
      includePaymentInstructions?: boolean;
      includeTaxSummary?: boolean;
      includeThankYouNote?: boolean;
    };
  };
  is_default: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  header_background_color: string;
  header_text_color: string;
  table_style: string;
  show_hours: boolean;
  show_rate: boolean;
}