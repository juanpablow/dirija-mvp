import { CheckCircle2 } from 'lucide-react'
import { InstructorRegistrationForm } from './InstructorRegistrationForm'

export function InstructorCTASection() {
  return (
    <section id="instructor-form" className="py-12 md:py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto container-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Cadastre-se como Instrutor Autônomo
            </h2>
            <p className="text-lg md:text-xl text-primary-50 leading-relaxed px-4">
              A nova era da habilitação chegou e você pode ser protagonista dessa mudança.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informações */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                Com a regulamentação do instrutor autônomo de trânsito, motoristas experientes podem oferecer aulas práticas diretamente aos futuros condutores, com mais liberdade, autonomia e melhores ganhos.
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Por que se cadastrar?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Mais visibilidade na sua região</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Horários flexíveis</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Maior autonomia e renda</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Perfil verificado e confiável</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Plataforma simples e rápida</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Quem pode participar?
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Instrutores de autoescola, motoristas experientes ou profissionais que desejam se credenciar como instrutor autônomo.
                </p>
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <InstructorRegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
