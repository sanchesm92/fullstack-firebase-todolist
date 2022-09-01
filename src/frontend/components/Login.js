import React from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {firebaseInit} from '../firebase'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Swal from 'sweetalert2'

/**
 * 
 * @returns 
 */
export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [login, setLogin] = useState(null);
  const [credential, setCredential] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (credential) {
      router.push({
        pathname: '/todos',
        query: { token: credential.accessToken, email: credential.email },
      }, 'todos')
    }
    //eslint-disable-next-line
  }, [credential])

  useEffect(() => { firebaseInit() }, [])

  useEffect(() => {
    if (login !== null) {
      setLogin(null)
    }
      //eslint-disable-next-line
  }, [user])

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        Swal.fire({
          icon: 'success',
          title: 'Sign In',
          showConfirmButton: false,
          timer: 1500
        })
        setCredential(userCredential.user)
      })
      .catch((error) => {
        const errorCode = error.code;
        let message = 'Invalid Fields'
        if(errorCode.includes('user-not-found')) {
          message = 'User Not Found'
        }
        setLogin(message)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
        })
      });
  }

  const handleChange = ({target}) => {
    setUser({...user, [target.name]: target.value})
  }

  return (
    <div className='flex h-screen justify-center items-center bg-neutral-100 border-2'>
      <section className='container mx-auto flex flex-col items-center w-96 h-80 justify-around shadow-xl bg-neutral-50 '>
        <h1 className="text-[#808080] text-5xl">Sign In</h1>
        <label htmlFor="email">
        <input className=' placeholder-gray-700 bg-neutral-100 shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' value={user.email} name='email' type="text" placeholder="Email" onChange={(e) => handleChange(e)} />
        </label>
        <label htmlFor="password">
        <input className='placeholder-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-neutral-100 leading-tight focus:outline-none focus:shadow-outline' id='password' value={user.password} name='password' type="password" placeholder="Password" onChange={(e) => handleChange(e)} />
        {<p className='text-red-500'>{login}</p>}
        </label>
          <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border border-blue-700 rounded w-3/6" onClick={signIn}>Sign in</button>
          <span className='text-sm'>{`Don't you have an account? Click to `}<Link href={'/signup'}><spam className='text-blue-600 cursor-pointer'>Sign up</spam></Link></span>
        
      </section>
    </div>
  )
}
