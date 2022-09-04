import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useProviderContext } from '../context/provider';
import Swal from 'sweetalert2'
const URL = process.env.REACT_APP_URL_ENDPOINT || 'https://fullstack-firebase-todolist.herokuapp.com/todos/'

export default function Task({props}) {
  const router = useRouter();
  const {task, id} = props
  const [editing, setEditing] = useState(false)
  const [completed, setCompleted ] = useState(props.completed)
    //eslint-disable-next-line
  const [state, getTodos, operations] = useProviderContext()
  const [taksState, setTaskState] = useState({
    task: task
  })

/**
 * @description
 * handleChange function responsible for updating taks
 */

  const handleChange = ({target}) => {
    setTaskState({...taksState, [target.name]: target.value})
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })

/**
 * @description
 * putTask function responsible for send http request (PUT) to firestore
 */

  const putTask = async (body, id) => {
    await axios({
      method: 'put',
      url: `${URL}${id}`,
      data: {
        ...body
      }
  });
  getTodos()
  }

/**
 * @description
 * toggleCompleted function responsible for set completed/uncompleted task
 */

  const toggleCompleted = async () => {
    await putTask({task, email: router.query.email, completed: !completed}, id)
    setCompleted(!completed)
  }

  // useEffect(() => {
  //   operations.updateFilteredState()
  //   //eslint-disable-next-line
  // }, [completed])

  useEffect(() => {
    operations.updateFilteredState()
    //eslint-disable-next-line
  }, [])
/**
 * @description
 * toggleEditing function responsible for editing task
 */

  const toggleEditing = () => {
    if (editing === true) {
      const body = {
        task: taksState.task,
        email: router.query.email
      }
      putTask(body, id)
    }
    setEditing(!editing)
  }

/**
 * @description
 * deleteTask function responsible for send http request (DELETE) to firestore
 */

  const deleteTask = async () => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${URL}${id}`)
        getTodos()
      }
    })
  }
  const uncompletedClass = 'text-gray-700 text-md font-bold'
  const completedClass = 'text-md font-bold text-red-600 line-through'

  return (
    <div className='border-b bg-neutral-50 border-slate-300 flex w-full h-12 items-center p-2'>
      {editing ?
        <input className='placeholder-gray-700 bg-neutral-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          value={taksState.task}
          name="task"
          maxLength={30}
          onChange={handleChange}
          /> : <p className={!completed ? uncompletedClass : completedClass}>{task}</p>}
      <div className='flex justify-evenly w-1/4 ml-auto gap-4'>
        <button onClick={toggleEditing}>
          📝
        </button>
        <button onClick={toggleCompleted} className='text-center' >{completed ? 
          '🔴' : '⚪'}</button>
        <button onClick={deleteTask}>
          🗑️
        </button>
      </div>
    </div>
  )
}
