import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HelpCircle, ChevronDown } from "lucide-react";

export const metadata = {
  title: "Como se Tornar Instrutor - DiriJá",
  description:
    "Guia completo sobre como obter certificação e se tornar um instrutor autônomo de trânsito credenciado pelo Detran",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <a
                href="/"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Voltar para página principal
              </a>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <HelpCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Como se Tornar Instrutor
              </h1>
              <p className="text-lg text-gray-600">
                Guia completo com requisitos, certificação do Detran e tudo que
                você precisa saber
              </p>
            </div>

            {/* FAQ Sections */}
            <div className="space-y-8">
              {/* Seção 1: Requisitos */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 min-w-[2rem] bg-primary-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-3 flex-shrink-0">
                    1
                  </span>
                  Requisitos para se tornar Instrutor Autônomo
                </h2>
                <div className="space-y-4">
                  <FAQItem
                    question="Quais são os requisitos básicos para ser instrutor autônomo?"
                    answer={
                      <div className="space-y-3">
                        <p>
                          Para se tornar um instrutor autônomo de trânsito, você
                          precisa atender aos seguintes requisitos:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            Possuir CNH definitiva válida na categoria que
                            pretende ensinar
                          </li>
                          <li>Ter no mínimo 21 anos de idade</li>
                          <li>
                            Não ter cometido infrações graves ou gravíssimas nos
                            últimos 12 meses
                          </li>
                          <li>
                            Não estar cumprindo pena de suspensão ou cassação do
                            direito de dirigir
                          </li>
                          <li>
                            Realizar o curso específico de formação de
                            instrutores
                          </li>
                        </ul>
                      </div>
                    }
                  />

                  <FAQItem
                    question="Como é o curso de formação de instrutor?"
                    answer={
                      <div className="space-y-3">
                        <p>
                          O curso de formação para instrutores autônomos é
                          oferecido gratuitamente no site da Secretaria Nacional
                          de Trânsito (Senatran) e inclui:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            <strong>Habilidades pedagógicas:</strong> Técnicas
                            de ensino e comunicação eficaz
                          </li>
                          <li>
                            <strong>Conhecimento técnico:</strong>{" "}
                            Aprofundamento nas leis de trânsito
                          </li>
                          <li>
                            <strong>Condução responsável:</strong> Práticas de
                            segurança e comportamento no trânsito
                          </li>
                          <li>
                            <strong>Avaliação final:</strong> Prova para
                            verificar o aproveitamento
                          </li>
                          <li>
                            <strong>Certificado de conclusão:</strong> Documento
                            necessário para registro no Detran
                          </li>
                        </ul>
                      </div>
                    }
                  />
                </div>
              </section>

              {/* Seção 2: Certificação e Autorização */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 min-w-[2rem] bg-primary-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-3 flex-shrink-0">
                    2
                  </span>
                  Certificação e Autorização
                </h2>
                <div className="space-y-4">
                  <FAQItem
                    question="Como obter a autorização para trabalhar como instrutor?"
                    answer={
                      <div className="space-y-3">
                        <p>
                          Após concluir o curso de formação, siga estas etapas:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>
                            Realize o curso de formação de instrutores
                            disponível no site da Senatran
                          </li>
                          <li>Seja aprovado na prova final do curso</li>
                          <li>Receba o certificado de conclusão</li>
                          <li>
                            Solicite autorização junto ao Detran do seu estado
                          </li>
                          <li>
                            Após aprovação, seu nome será registrado no
                            Ministério dos Transportes
                          </li>
                          <li>
                            Receba a Carteira de Identificação Profissional de
                            instrutor autônomo
                          </li>
                        </ol>
                      </div>
                    }
                  />

                  <FAQItem
                    question="Onde posso fazer o curso de formação?"
                    answer="O curso de formação para instrutores autônomos está disponível gratuitamente no site da Secretaria Nacional de Trânsito (Senatran). Acesse www.gov.br/transportes para mais informações sobre inscrições e datas."
                  />

                  <FAQItem
                    question="Posso trabalhar como instrutor autônomo e em autoescola ao mesmo tempo?"
                    answer="Sim! Quem já atua como instrutor contratado por uma autoescola poderá seguir normalmente com suas atividades e, paralelamente, trabalhar de maneira autônoma. Isso oferece maior flexibilidade e oportunidades de renda."
                  />
                </div>
              </section>

              {/* Seção 3: Veículo e Equipamentos */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 min-w-[2rem] bg-primary-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-3 flex-shrink-0">
                    3
                  </span>
                  Veículo e Equipamentos
                </h2>
                <div className="space-y-4">
                  <FAQItem
                    question="Quais são os requisitos do veículo para dar aulas?"
                    answer={
                      <div className="space-y-3">
                        <p>
                          O veículo utilizado nas aulas (seja do aluno ou do
                          instrutor) deve atender aos seguintes requisitos:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            Atender às condições de segurança previstas pelo
                            Código de Trânsito Brasileiro (CTB)
                          </li>
                          <li>
                            Estar dentro do limite de anos de fabricação
                            permitido para a frota
                          </li>
                          <li>
                            Possuir identificação de veículo de ensino (como
                            adesivo, por exemplo)
                          </li>
                          <li>Ter todos os documentos em dia (CRLV válido)</li>
                          <li>
                            Estar em boas condições de funcionamento e segurança
                          </li>
                        </ul>
                      </div>
                    }
                  />

                  <FAQItem
                    question="Posso usar o carro do aluno nas aulas?"
                    answer="Sim! As aulas podem ser realizadas tanto com o veículo do instrutor quanto com o veículo do aluno, desde que o veículo atenda a todos os requisitos de segurança e identificação previstos na legislação."
                  />
                </div>
              </section>

              {/* Seção 4: Atuação Profissional */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 min-w-[2rem] bg-primary-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-3 flex-shrink-0">
                    4
                  </span>
                  Atuação Profissional
                </h2>
                <div className="space-y-4">
                  <FAQItem
                    question="Como funcionará a contratação de instrutores autônomos?"
                    answer={
                      <div className="space-y-3">
                        <p>
                          O processo de contratação será facilitado através de
                          meios eletrônicos:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            Seu nome será registrado no sistema do Ministério
                            dos Transportes após autorização do Detran
                          </li>
                          <li>
                            Cidadãos poderão verificar se você está devidamente
                            apto através dos sites oficiais
                          </li>
                          <li>
                            Para divulgar seus serviços,{" "}
                            <a
                              href="/#instructor-form"
                              className="text-primary-600 hover:text-primary-700 font-semibold underline"
                            >
                              cadastre-se na plataforma DiriJá
                            </a>
                            .
                          </li>
                          <li>
                            Clientes podem consultar sua disponibilidade de
                            horários e locais online
                          </li>
                          <li>
                            Você será responsável por registrar e validar as
                            atividades realizadas
                          </li>
                        </ul>
                      </div>
                    }
                  />

                  <FAQItem
                    question="Quais são as responsabilidades do instrutor autônomo durante as aulas?"
                    answer={
                      <div className="space-y-3">
                        <p>
                          Como instrutor autônomo, suas responsabilidades
                          incluem:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            Garantir que o aluno observe todas as normas de
                            mobilidade urbana
                          </li>
                          <li>
                            Assegurar condições de segurança durante as aulas
                          </li>
                          <li>
                            Reforçar os conceitos abordados nas aulas teóricas
                            durante a prática
                          </li>
                          <li>
                            Monitorar o comportamento do aluno no trânsito
                          </li>
                          <li>
                            Oferecer feedback construtivo sobre o desempenho
                          </li>
                          <li>
                            Registrar oficialmente a participação do aluno nas
                            aulas
                          </li>
                        </ul>
                      </div>
                    }
                  />

                  <FAQItem
                    question="Tenho autonomia para definir meus horários e preços?"
                    answer="Sim! Um dos grandes benefícios da nova legislação é que os instrutores autônomos poderão atuar de forma independente, organizando e gerenciando seu próprio negócio. Você terá autonomia para definir horários, locais de atendimento e valores, desde que respeite as regulamentações dos órgãos competentes."
                  />
                </div>
              </section>

              {/* Seção 5: Documentação e Fiscalização */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 min-w-[2rem] bg-primary-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-3 flex-shrink-0">
                    5
                  </span>
                  Documentação e Fiscalização
                </h2>
                <div className="space-y-4">
                  <FAQItem
                    question="Quais documentos devo portar durante as aulas práticas?"
                    answer={
                      <div className="space-y-3">
                        <p>
                          Durante a execução das aulas práticas, você deve
                          sempre portar:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            <strong>CNH</strong> (Carteira Nacional de
                            Habilitação)
                          </li>
                          <li>
                            <strong>Credencial de Instrutor</strong> ou crachá
                            fornecido pelo órgão competente
                          </li>
                          <li>
                            <strong>Licença de Aprendizagem Veicular</strong> do
                            aluno
                          </li>
                          <li>
                            <strong>CRLV</strong> (Certificado de Registro e
                            Licenciamento do Veículo)
                          </li>
                        </ul>
                        <p className="text-sm text-gray-600 mt-2">
                          ⚠️ A ausência de qualquer um desses documentos pode
                          resultar em penalidades.
                        </p>
                      </div>
                    }
                  />

                  <FAQItem
                    question="Como funciona a fiscalização?"
                    answer="Os instrutores autônomos estarão sujeitos à fiscalização pelos órgãos de trânsito, que podem realizar inspeções a qualquer momento para garantir que as atividades estejam sendo realizadas de acordo com a legislação. Por isso, é fundamental sempre manter toda a documentação em ordem e seguir todas as normas estabelecidas."
                  />
                </div>
              </section>

              {/* Seção 6: Sobre o DiriJá */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 min-w-[2rem] bg-primary-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-3 flex-shrink-0">
                    6
                  </span>
                  Sobre o DiriJá
                </h2>
                <div className="space-y-4">
                  <FAQItem
                    question="Como o DiriJá pode me ajudar como instrutor?"
                    answer={
                      <div className="space-y-3">
                        <p>
                          O DiriJá é uma plataforma que conecta instrutores
                          autônomos a alunos de forma prática e segura.
                          Benefícios para instrutores:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Maior visibilidade para seu trabalho</li>
                          <li>Facilidade para gerenciar agendamentos</li>
                          <li>
                            Sistema de avaliações que aumenta sua credibilidade
                          </li>
                          <li>
                            Ferramentas para organizar suas aulas e horários
                          </li>
                          <li>Conexão direta com alunos interessados</li>
                          <li>Suporte para gestão do seu negócio</li>
                        </ul>
                      </div>
                    }
                  />

                  <FAQItem
                    question="Quanto custa para usar a plataforma?"
                    answer="Estamos em fase de desenvolvimento e em breve divulgaremos os planos e valores. Cadastre-se agora para receber informações em primeira mão e aproveitar condições especiais de lançamento!"
                  />

                  <FAQItem
                    question="Como faço para me cadastrar no DiriJá?"
                    answer={
                      <p>
                        Para se cadastrar como instrutor no DiriJá, acesse o
                        link{" "}
                        <a
                          href="/#instructor-form"
                          className="text-primary-600 hover:text-primary-700 font-semibold underline"
                        >
                          https://dirija.app/#instructor-form
                        </a>{" "}
                        e preencha o formulário com suas informações. Nossa
                        equipe entrará em contato assim que a plataforma estiver
                        disponível.
                      </p>
                    }
                  />
                </div>
              </section>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-gray-600 mb-6">
                Entre em contato conosco ou cadastre-se para receber mais
                informações
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#instructor-form"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Cadastrar como Instrutor
                </a>
                <a
                  href="mailto:contato@dirija.app"
                  className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
                >
                  Entrar em Contato
                </a>
              </div>
            </div>

            {/* Referência */}
            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-gray-700">
                <strong>Fonte:</strong> As informações sobre requisitos e
                certificação de instrutores autônomos foram baseadas no artigo
                oficial do{" "}
                <a
                  href="https://www.gov.br/transportes/pt-br/assuntos/noticias/2025/10/instrutor-autonomo-de-transito-entenda-como-vai-funcionar-o-mercado-de-trabalho-para-esses-profissionais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Ministério dos Transportes
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string | React.ReactNode;
}) {
  return (
    <details className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-50 transition">
        <h3 className="text-lg font-semibold text-gray-900 pr-4">{question}</h3>
        <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0" />
      </summary>
      <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
        {typeof answer === "string" ? <p>{answer}</p> : answer}
      </div>
    </details>
  );
}
