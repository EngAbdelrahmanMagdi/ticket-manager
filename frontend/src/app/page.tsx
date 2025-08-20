import { getTasks } from "@/services/taskService"
import TaskCard from "@/components/TaskCard"
import { Task } from "@/types/task"

export default async function Home() {
  const tasks: Task[] = await getTasks()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Task Manager
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize your development tasks and track progress efficiently
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  )
}
