interface StepCardProps {
  number: string
  title: string
  description: string
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex items-start space-x-4 md:space-x-6">
      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm md:text-base text-gray-600">{description}</p>
      </div>
    </div>
  )
}
