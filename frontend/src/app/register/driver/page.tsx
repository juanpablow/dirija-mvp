'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Car, CheckCircle } from 'lucide-react'

export default function RegisterDriverPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulando envio - aqui você pode adicionar integração com backend posteriormente
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err: any) {
      setError('Erro ao enviar cadastro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
          <Car className="w-10 h-10 text-primary-600" />
          <span className="text-3xl font-bold text-gray-900">DiriJá</span>
        </Link>

        {!success ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Cadastre-se como Instrutor
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Preencha os dados abaixo e nossa equipe entrará em contato
              </p>
            </div>

            <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 98765-4321"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'Enviar Cadastro'
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Faça login
                  </Link>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white py-12 px-6 shadow-xl rounded-2xl sm:px-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Cadastro Recebido com Sucesso!
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Obrigado por se cadastrar como instrutor no DiriJá.
            </p>
            <p className="text-gray-600 mb-8">
              Nossa equipe irá analisar suas informações e entrará em contato em breve pelo email <strong>{formData.email}</strong> ou telefone <strong>{formData.phone}</strong>.
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-all"
              >
                Voltar para Home
              </Link>
              <button
                onClick={() => {
                  setSuccess(false)
                  setFormData({ name: '', email: '', phone: '' })
                }}
                className="block w-full py-3 px-6 border-2 border-primary-600 rounded-lg text-base font-semibold text-primary-600 hover:bg-primary-50 transition-all"
              >
                Fazer Novo Cadastro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
