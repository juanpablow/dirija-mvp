'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
}

export function InstructorRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulando envio - integração com backend pode ser adicionada aqui
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
      
      // Scroll suave para a mensagem de sucesso
      setTimeout(() => {
        document.getElementById('instructor-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    } catch (err: any) {
      setError('Erro ao enviar cadastro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSuccess(false)
    setFormData({ name: '', email: '', phone: '' })
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Cadastro Recebido!
        </h3>
        <p className="text-gray-600 mb-6">
          Obrigado pelo interesse, <strong>{formData.name}</strong>!
        </p>
        <p className="text-sm text-gray-600 mb-8">
          Nossa equipe irá analisar seu cadastro e entrará em contato em breve através do email <strong>{formData.email}</strong> ou telefone <strong>{formData.phone}</strong>.
        </p>
        <button
          onClick={resetForm}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          Fazer novo cadastro
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Preencha seus dados
      </h3>
      <p className="text-gray-600 mb-6">
        Nossa equipe entrará em contato em breve
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            <>
              Quero ser Instrutor
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </>
  )
}
