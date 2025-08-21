import {getApiUrl} from "@/config/api"
import axios from "axios"
import { Task } from "@/types/task"

export async function getTasks() {
  const res = await axios.get(getApiUrl('tasks'))
  return res.data
}

export async function createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
  const res = await axios.post(getApiUrl('tasks'), taskData)
  return res.data
}
