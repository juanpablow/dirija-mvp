import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendWelcomeEmailParams {
  name: string;
  email: string;
}

export const sendInstructorWelcomeEmail = async ({
  name,
  email,
}: SendWelcomeEmailParams) => {
  try {
    const firstName = name.split(" ")[0];

    const { data, error } = await resend.emails.send({
      from: "DiriJá <onboarding@dirija.app>",
      to: [email],
      subject: "Bem-vindo ao DiriJá! 🚗",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bem-vindo ao DiriJá</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">🚗 DiriJá</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: bold;">
                          Olá, ${firstName}! 👋
                        </h2>
                        
                        <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Ficamos muito felizes com seu interesse em se tornar um instrutor parceiro da <strong>DiriJá</strong>!
                        </p>
                        
                        <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Recebemos seu cadastro com sucesso e nossa equipe irá analisá-lo nos próximos dias.
                        </p>
                        
                        <div style="background-color: #f9fafb; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 4px;">
                          <h3 style="margin: 0 0 10px; color: #1f2937; font-size: 18px; font-weight: 600;">
                            📋 Próximos Passos
                          </h3>
                          <ul style="margin: 10px 0 0; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
                            <li>Nossa equipe irá revisar suas informações</li>
                            <li>Entraremos em contato por email ou telefone em até 48 horas</li>
                            <li>Você receberá instruções sobre como completar seu perfil</li>
                            <li>Após aprovação, você poderá começar a dar aulas!</li>
                          </ul>
                        </div>
                        
                        <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Enquanto isso, se tiver alguma dúvida, não hesite em nos contatar.
                        </p>
                        
                        <p style="margin: 30px 0 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Atenciosamente,<br>
                          <strong style="color: #667eea;">Equipe DiriJá</strong>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
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
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Erro ao enviar email:", error);
      return { success: false, error };
    }

    console.log("Email enviado com sucesso:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return { success: false, error };
  }
};
