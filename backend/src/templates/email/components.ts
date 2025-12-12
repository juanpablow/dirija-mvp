export const EmailLayout = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DiriJá</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            ${content}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const EmailHeader = () => `
<tr>
  <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">🚗 DiriJá</h1>
  </td>
</tr>
`;

export const EmailFooter = () => `
<tr>
  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
    <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
      © 2025 DiriJá. Todos os direitos reservados.
    </p>
    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
      Este é um email automático, por favor não responda.
    </p>
  </td>
</tr>
`;

export const EmailContent = (content: string) => `
<tr>
  <td style="padding: 40px;">
    ${content}
  </td>
</tr>
`;

export const Heading = (text: string, level: 2 | 3 = 2) => {
  const fontSize = level === 2 ? "24px" : "18px";
  return `
<h${level} style="margin: 0 0 20px; color: #1f2937; font-size: ${fontSize}; font-weight: bold;">
  ${text}
</h${level}>
  `;
};

export const Paragraph = (text: string) => `
<p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
  ${text}
</p>
`;

export const InfoBox = (title: string, items: string[]) => `
<div style="background-color: #f9fafb; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 4px;">
  <h3 style="margin: 0 0 10px; color: #1f2937; font-size: 18px; font-weight: 600;">
    ${title}
  </h3>
  <ul style="margin: 10px 0 0; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
    ${items.map((item) => `<li>${item}</li>`).join("\n    ")}
  </ul>
</div>
`;

export const Signature = (teamName: string) => `
<p style="margin: 30px 0 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
  Atenciosamente,<br>
  <strong style="color: #667eea;">${teamName}</strong>
</p>
`;
