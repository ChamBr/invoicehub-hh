export type InvoiceTemplateType = 'default' | 'simple' | 'detailed' | 'professional' | 'custom';

export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string | null;
  type: InvoiceTemplateType;
  content: {
    header: {
      showLogo: boolean;
      alignment: 'left' | 'center' | 'right';
      textColor: string;
    };
    body: {
      fontFamily: string;
      fontSize: string;
      lineHeight: string;
      tableStyle: 'simple' | 'minimal' | 'bordered';
    };
    footer: {
      showSignature: boolean;
      showTerms: boolean;
      alignment: 'left' | 'center' | 'right' | 'justified';
    };
  };
  is_default: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}