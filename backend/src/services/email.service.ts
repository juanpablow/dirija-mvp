import { Resend } from "resend";
import { instructorWelcomeEmailTemplate } from "../templates/email/instructor-welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendWelcomeEmailParams {
  name: string;
  email: string;
}

export const sendInstructorWelcomeEmail = async ({
  name,
  email,
}: SendWelcomeEmailParams) => {
  console.log("=== INICIANDO ENVIO DE EMAIL ===");
  console.log("Para:", email);
  console.log("Nome:", name);
  console.log("RESEND_API_KEY configurada:", !!process.env.RESEND_API_KEY);
  console.log("RESEND_API_KEY (primeiros 10 chars):", process.env.RESEND_API_KEY?.substring(0, 10));
  
  try {
    const firstName = name.split(" ")[0];
    console.log("Primeiro nome extraído:", firstName);

    console.log("Chamando resend.emails.send...");
    const { data, error } = await resend.emails.send({
      from: "DiriJá <onboarding@dirija.app>",
      to: [email],
      subject: "Bem-vindo ao DiriJá! 🚗",
      html: instructorWelcomeEmailTemplate({ firstName }),
    });

    if (error) {
      console.error("❌ ERRO DO RESEND:", JSON.stringify(error, null, 2));
      return { success: false, error };
    }

    console.log("✅ EMAIL ENVIADO COM SUCESSO!");
    console.log("Data:", JSON.stringify(data, null, 2));
    return { success: true, data };
  } catch (error) {
    console.error("❌ EXCEPTION AO ENVIAR EMAIL:");
    console.error("Tipo:", typeof error);
    console.error("Mensagem:", error instanceof Error ? error.message : "Unknown error");
    console.error("Stack:", error instanceof Error ? error.stack : "No stack");
    console.error("Error completo:", JSON.stringify(error, null, 2));
    return { success: false, error };
  }
};
