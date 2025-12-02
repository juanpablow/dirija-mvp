import { StepCard } from './StepCard'

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto container-padding">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">
          Como Funciona
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            <StepCard
              number="1"
              title="Crie sua conta"
              description="Cadastre-se como aluno ou instrutor em menos de 2 minutos"
            />
            <StepCard
              number="2"
              title="Encontre o instrutor ideal"
              description="Navegue pelos perfis, veja avaliações e escolha quem mais combina com você"
            />
            <StepCard
              number="3"
              title="Agende sua aula"
              description="Escolha data, horário e local convenientes para ambos"
            />
            <StepCard
              number="4"
              title="Aprenda e evolua"
              description="Pratique com segurança e ganhe confiança ao volante"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
