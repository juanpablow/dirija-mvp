import { Shield, Star, Users, Car } from 'lucide-react'
import { FeatureCard } from './FeatureCard'

export function FeaturesSection() {
  return (
    <section id="features" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto container-padding">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">
          Por Que Escolher o DiriJá?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <FeatureCard
            icon={<Shield className="w-10 h-10 md:w-12 md:h-12 text-primary-600" />}
            title="Seguro e Confiável"
            description="Todos os instrutores são verificados e possuem CNH válida"
          />
          <FeatureCard
            icon={<Star className="w-10 h-10 md:w-12 md:h-12 text-primary-600" />}
            title="Instrutores Qualificados"
            description="Motoristas experientes com anos de prática"
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 md:w-12 md:h-12 text-primary-600" />}
            title="Aulas Personalizadas"
            description="Aprenda no seu ritmo com atenção individual"
          />
          <FeatureCard
            icon={<Car className="w-10 h-10 md:w-12 md:h-12 text-primary-600" />}
            title="Flexibilidade Total"
            description="Escolha horário e local que funcione para você"
          />
        </div>
      </div>
    </section>
  )
}
