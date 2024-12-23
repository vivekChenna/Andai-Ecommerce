import { Bot, Workflow, Zap } from 'lucide-react'

const features = [
  {
    icon: <Workflow className="h-10 w-10 text-blue-500" />,
    title: 'AI Workflows',
    description: 'Streamline your processes with intelligent automation.'
  },
  {
    icon: <Bot className="h-10 w-10 text-green-500" />,
    title: 'AI Agents',
    description: 'Deploy smart agents to handle complex tasks autonomously.'
  },
  {
    icon: <Zap className="h-10 w-10 text-yellow-500" />,
    title: 'AI Chatbots',
    description: 'Engage customers with advanced, context-aware chatbots.'
  }
]

export default function Features() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

