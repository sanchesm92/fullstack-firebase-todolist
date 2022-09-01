import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useProviderContext } from '../context/provider';

export default function TaskForm() {
  const router = useRouter()
  const [state, getTodos, operations] = useProviderContext()
  const [taskState, setTaskState] = useState('')
  const handleChange = ({target}) => {
    setTaskState(target.value)
  }
  const createTask = async () => {
    const body = {
      task: taskState,
      email: router.query.email
    }
    await axios.post('https://fullstack-firebase-todolist.herokuapp.com/todos/', body)
    setTaskState('')
  }

  useEffect(() => {
    if(taskState === '') {
      getTodos()
    }
  },[taskState])

  const allFilter = () => {
    getTodos()
  }

  const completedFilter = () => {
    operations.setState(operations.filtredState)
  }
  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-start gap-4'>
        <button onClick={allFilter}>All</button>
        <button onClick={completedFilter}>Completed</button>
      </div>
      <div className='flex'>
      <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' value={taskState} onChange={handleChange} name="task" placeholder='task'  maxLength={30} />
      <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border border-blue-700 rounded w-24" disabled={taskState === ''} onClick={createTask}>Create</button>
      </div>
    </div>
  )
}
