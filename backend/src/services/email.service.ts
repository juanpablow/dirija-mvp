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
  try {
    const firstName = name.split(" ")[0];

    const { data, error } = await resend.emails.send({
      from: "DiriJá <onboarding@dirija.app>",
      to: [email],
      subject: "Bem-vindo ao DiriJá! 🚗",
      html: instructorWelcomeEmailTemplate({ firstName }),
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
