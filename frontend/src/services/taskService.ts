import {getApiUrl} from "@/config/api"
import axios from "axios"

export async function getTasks() {
  const res = await axios.get(getApiUrl('tasks'))
  return res.data
}
