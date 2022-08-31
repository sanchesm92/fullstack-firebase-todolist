import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import feather from '../styles/icons/feather.png'
import Swal from 'sweetalert2'

export default function Header() {
  const router = useRouter()
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
      }
    })

  }
  return (
    <div className='p-10 h-12 flex items-center justify-between bg-red-800 text-white shadow-xl'>
      <div className='flex items-center gap-6'>
      <Image src={feather} alt="feather logo" />
      <h1 className='text-lg font-bold'>{router.query.email}</h1>
      </div>
      <button onClick={logout}>
        <span className='text-lg font-bold'>
          Logout
        </span>
      </button>
    </div>
  )
}
