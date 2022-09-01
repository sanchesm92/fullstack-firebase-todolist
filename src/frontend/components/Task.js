import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useProviderContext } from '../context/provider';
import editIcon from '../styles/icons/editIcon.png'
import deleteIcon from '../styles/icons/deleteIcon.png'
import Swal from 'sweetalert2'


export default function Task({props}) {
  const router = useRouter();
  const {task, timestamp, id} = props
  const [editing, setEditing] = useState(false)
  const [completed, setCompleted ] = useState(false)
  const [state, getTodos, operations] = useProviderContext()
  const [taksState, setTaskState] = useState({
    task: task,
    timestamp: timestamp
  })
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

  const putTask = async ({task, email}, id) => {
    await axios({
      method: 'put',
      url: `https://fullstack-firebase-todolist.herokuapp.com/todos/${id}`,
      data: {
        task,
        email
      }
  });
  getTodos()
  }
  const toggleCompleted = () => {
    const obj = {
      email: router.query.email,
      id,
      task,
      timestamp,
    }
    if(!completed) {
      const newArr = [...operations.filtredState, obj]
      operations.setFiltredeState(newArr)
    } else {
      const newArr = operations.filtredState.filter((i) => i.timestamp !== obj.timestamp)
      operations.setFiltredeState(newArr)
    }
    setCompleted(!completed)
  }

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
        await axios.delete(`https://fullstack-firebase-todolist.herokuapp.com/todos/${id}`)
        getTodos()
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your task is safe!',
          'error'
        )
      }
    })

  }
  const uncompletedClass = 'text-md font-bold'
  const completedClass = 'text-md font-bold text-red-600 line-through'
  return (
    <div className='border-b border-slate-300 flex w-full h-12 items-center p-2'>
      {editing ? <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={taksState.task} name="task" maxLength={30} onChange={handleChange} /> : <p onDoubleClick={toggleCompleted} className={!completed ? uncompletedClass : completedClass}>{task}</p>}
      <div className='flex justify-evenly w-1/4 ml-auto gap-4'>
        <button onClick={toggleEditing}>
          <Image width={50} height={50} src={editIcon} alt='edit icon' />
        </button>
        <button onClick={deleteTask}>
          <Image height={20} width={20} src={deleteIcon} alt='edit icon' />
        </button>
      </div>
    </div>
  )
}
