import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { InstructorCTASection } from '@/components/InstructorCTASection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <InstructorCTASection />
      <CTASection />
      <Footer />
    </div>
  )
}
