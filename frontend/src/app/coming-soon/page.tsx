import Link from 'next/link'
import { Car, Clock, ArrowLeft } from 'lucide-react'

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-8">
          <Car className="w-12 h-12 text-primary-600" />
          <span className="text-3xl font-bold text-gray-900">DiriJá</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 rounded-full p-6">
              <Clock className="w-16 h-16 text-primary-600" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Em Breve!
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Estamos preparando uma experiência incrível para alunos que desejam aprender a dirigir.
          </p>

          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
              No momento, estamos focados em cadastrar instrutores experientes para oferecer as melhores aulas quando lançarmos.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition shadow-lg"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Voltar para Home
            </Link>

            <div className="pt-4">
              <p className="text-sm text-gray-600">
                Quer ser um dos primeiros instrutores?{' '}
                <Link href="/#instructor-form" className="text-primary-600 hover:text-primary-700 font-medium">
                  Cadastre-se aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
