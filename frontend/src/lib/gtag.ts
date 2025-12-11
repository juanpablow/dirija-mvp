// Google Ads Conversion Tracking
export const trackConversion = (
  conversionLabel: string,
  value?: number,
  currency: string = "BRL"
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: conversionLabel,
      value: value || 1.0,
      currency: currency,
    });
  }
};

// Conversões específicas do DiriJá
export const trackInstructorLead = () => {
  trackConversion("AW-17790307804/GbNKCJ7Jt84bENybiqNC", 1.0, "BRL");
};

// Adicionar tipos ao window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
