'use client'
import SuccessToast from "@/components/SuccessToast"
import LoadingSpinner from "@/components/LoadingSpinner"
import CreateTaskModal from "@/components/CreateTaskModal"
import TaskCard from "@/components/TaskCard"
import TaskModal from "@/components/TaskModal"
import {getTasks} from "@/services/taskService"
import {Task} from "@/types/task"
import {useState, useEffect } from "react"
import {useTranslations} from "@/hooks/useTranslations"

export default function TaskList() {
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const { translate } = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true)
      try {
        const loadedTasks = await getTasks()
        setTasks(loadedTasks)
      } catch (error) {
        console.error('Failed to load tasks:', error)
      } finally {
        setIsLoading(false)
      }
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

  const handleCreateTask = () => {
    setIsCreateModalOpen(true)
  }
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const handleTaskCreated = () => {
    const loadTasks = async () => {
      try {
        const loadedTasks = await getTasks()
        setTasks(loadedTasks)
        setShowSuccessToast(true)
      } catch (error) {
        console.error('Failed to reload tasks:', error)
      }
    }
    loadTasks()
  }

  const handleHideSuccessToast = () => {
    setShowSuccessToast(false)
  }

  if (isLoading) { return <LoadingSpinner />}
  
  if (tasks.length === 0) {
      return (
        <>
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
              <button onClick={handleCreateTask} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"> 
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {translate('createTask')}
              </button>
        </div>
        </div>
          <CreateTaskModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} onTaskCreated={handleTaskCreated}/>
          <SuccessToast message={translate('taskCreatedSuccess')} isVisible={showSuccessToast} onHide={handleHideSuccessToast}/>
        </>
      )
  }

  return (
    <>
      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex flex-col sm:flex-row sm:items-center sm:justify-end w-full">
          <button
            onClick={handleCreateTask}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
                  {translate('createTask')}
          </button>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tasks.map(task=>(
             <TaskCard key={task.id} task={task} onClick={handleCardClick}/>))}
      </div>
              <TaskModal task={selectedTask} isOpen={isModalOpen} onClose={handleCloseModal}/>
              <CreateTaskModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} onTaskCreated={handleTaskCreated}/>
              <SuccessToast message={translate('taskCreatedSuccess')} isVisible={showSuccessToast} onHide={handleHideSuccessToast}/>
    </>
  )
}
