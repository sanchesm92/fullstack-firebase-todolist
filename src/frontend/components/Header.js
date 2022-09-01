import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import feather from '../styles/icons/feather.png'
import Swal from 'sweetalert2'

export default function Header() {
  const router = useRouter()
  const [emailState, setEmailState] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('fb-todo-user'))
    let email = router.query.email
    if(user) {
      email = router.query.email || user.email
    }
    setEmailState(String(email).split('@')[0])
    //eslint-disable-next-line
  },[])

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, See ya!'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/')
        localStorage.removeItem('fb-todo-user')
      }
    })

  }
  return (
    <div className='p-10 h-12 flex items-center justify-between bg-red-800 text-white shadow-xl'>
      <div className='md: flex items-center gap-6'>
      <Image src={feather} alt="feather logo" />
      <h1 className='hidden md:inline  text-lg font-bold'>{emailState}</h1>
      </div>
      <button onClick={logout}>
        <span className='text-lg font-bold'>
          Logout
        </span>
      </button>
    </div>
  )
}
