'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('instructor-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-12 md:py-20">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Aprenda a Dirigir com{' '}
            <span className="text-primary-600">Praticidade</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4">
            Conectamos você a motoristas experientes e qualificados para aulas práticas de direção.
            Agende suas aulas de forma fácil e segura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <a
              href="#instructor-form"
              onClick={scrollToForm}
              className="bg-primary-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-primary-700 transition inline-flex items-center justify-center cursor-pointer"
            >
              Tornar-se Instrutor
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <Link
              href="/coming-soon"
              className="bg-white text-primary-600 border-2 border-primary-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-primary-50 transition"
            >
              Encontrar Instrutor
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
