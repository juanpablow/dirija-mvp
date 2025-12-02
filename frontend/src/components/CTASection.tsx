'use client'

import { ArrowRight } from 'lucide-react'

export function CTASection() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('instructor-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-12 md:py-20 bg-gray-900">
      <div className="container mx-auto container-padding text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
          Pronto para Transformar sua Carreira?
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
          Cadastre-se agora e comece a dar aulas como instrutor autônomo
        </p>
        <a
          href="#instructor-form"
          onClick={scrollToForm}
          className="bg-primary-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-primary-700 transition inline-flex items-center cursor-pointer"
        >
          Quero ser Instrutor
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
