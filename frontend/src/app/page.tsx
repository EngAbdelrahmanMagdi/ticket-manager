import TaskList from "@/components/TaskList"
import { useTranslations } from "@/hooks/useTranslations"

export default async function Home() {
  const { translate } = useTranslations()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {translate('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {translate('subtitle')}
          </p>
        </div>
        
            <TaskList />
      </div>
    </main>
  )
}
