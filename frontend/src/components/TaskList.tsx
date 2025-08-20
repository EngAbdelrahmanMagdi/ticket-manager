'use client'
import TaskCard from "@/components/TaskCard"
import TaskModal from "@/components/TaskModal"
import {getTasks} from "@/services/taskService"
import {Task} from "@/types/task"
import {useState, useEffect } from "react"

export default function TaskList() {
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
