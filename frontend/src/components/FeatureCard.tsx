interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm md:text-base text-gray-600">{description}</p>
    </div>
  )
}
