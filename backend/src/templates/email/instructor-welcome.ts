import {
  EmailLayout,
  EmailHeader,
  EmailFooter,
  EmailContent,
  Heading,
  Paragraph,
  InfoBox,
  Signature,
} from "./components";

interface InstructorWelcomeEmailProps {
  firstName: string;
}

export const instructorWelcomeEmailTemplate = ({
  firstName,
}: InstructorWelcomeEmailProps) => {
  const content = `
    ${Heading(`Olá, ${firstName}! 👋`, 2)}
    
    ${Paragraph(
      "Ficamos muito felizes com seu interesse em se tornar um instrutor parceiro da <strong>DiriJá</strong>!"
    )}
    
    ${Paragraph(
      "Recebemos seu cadastro com sucesso e nossa equipe irá analisá-lo nos próximos dias."
    )}
    
    ${InfoBox("📋 Próximos Passos", [
      "Nossa equipe irá revisar suas informações",
      "Entraremos em contato por email ou telefone o mais breve possível.",
      "Você receberá instruções sobre como completar seu perfil",
      "Após aprovação, você poderá começar a dar aulas!",
    ])}
    
    ${Signature("Equipe DiriJá")}
  `;

  return EmailLayout(`
    ${EmailHeader()}
    ${EmailContent(content)}
    ${EmailFooter()}
  `);
};
