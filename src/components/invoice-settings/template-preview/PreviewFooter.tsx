interface PreviewFooterProps {
  content: {
    footer: {
      alignment: string;
      showTerms: boolean;
      showSignature: boolean;
      includeThankYouNote?: boolean;
    };
  };
}

export const PreviewFooter = ({ content }: PreviewFooterProps) => {
  return (
    <div className={`text-${content.footer.alignment} mt-8`}>
      {content.footer.includeThankYouNote && (
        <div className="text-center mt-8 text-[#94A3B8] text-xl font-medium">
          Thank You!
        </div>
      )}
    </div>
  );
};