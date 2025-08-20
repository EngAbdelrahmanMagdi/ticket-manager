'use client'
import TaskCard from "@/components/TaskCard"
import TaskModal from "@/components/TaskModal"
import {getTasks} from "@/services/taskService"
import {Task} from "@/types/task"
import {useState, useEffect } from "react"
import {useTranslations} from "@/hooks/useTranslations"

export default function TaskList() {
  const { translate } = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const loadTasks = async () => {
      const loadedTasks = await getTasks()
      setTasks(loadedTasks)
    }
    loadTasks()
  },[])

  const handleCardClick = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  
  if (tasks.length === 0) {
      return (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {translate('noTasksTitle')}
            </h3>
            <p className="text-gray-600 mb-6">{translate('noTasksMessage')}</p>
        </div>
        </div>
      )
  }

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tasks.map(task=>(
             <TaskCard key={task.id} task={task} onClick={handleCardClick}/>))}
      </div>
              <TaskModal task={selectedTask} isOpen={isModalOpen} onClose={handleCloseModal}/>
    </>
  )
}
