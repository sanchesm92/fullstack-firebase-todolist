import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useProviderContext } from '../context/provider';
const URL = process.env.REACT_APP_URL_ENDPOINT || 'https://fullstack-firebase-todolist.herokuapp.com/todos/'

export default function TaskForm() {
  const router = useRouter()
  //eslint-disable-next-line
  const [state, getTodos, operations] = useProviderContext()
  const [taskState, setTaskState] = useState('')
  const handleChange = ({target}) => {
    setTaskState(target.value)
  }

/**
 * @description
 * createTask function responsible for send http request (POST) to firestore
 */

  const createTask = async () => {
    const body = {
      task: taskState,
      email: router.query.email
    }
    await axios.post(URL, body)
    setTaskState('')
  }

/**
 * @description
 * useEffect responsible for get all tasks in firestore
 */

  useEffect(() => {
    if(taskState === '') {
      getTodos()
    }
  //eslint-disable-next-line
  },[taskState])

/**
* @description
* allFilter responsible for filter all tasks
*/

  const allFilter = () => {
    getTodos()
  }

/**
* @description
* completedFilter responsible for filter complete tasks
*/

  const completedFilter = () => {
    operations.setState(operations.filtredState)
  }
  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-start gap-4'>
        <button className='text-gray-700' onClick={allFilter}>All</button>
        <button className='text-gray-700' onClick={completedFilter}>Completed</button>
      </div>
      <div className='flex'>
      <input className='placeholder-gray-700 bg-neutral-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' value={taskState} onChange={handleChange} name="task" placeholder='task'  maxLength={30} />
      <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border border-blue-700 rounded w-24" disabled={taskState === ''} onClick={createTask}>Create</button>
      </div>
    </div>
  )
}
