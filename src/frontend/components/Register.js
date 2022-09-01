import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { firebaseInit } from '../firebase';

export default function Register() {
  const [signup, setSignup] = useState({
    email: '',
    password: '',
  })
  const [credential, setCredential] = useState(null)
  const [errMessage, setErrMessage] = useState(null);
  const router = useRouter()

  useEffect(() => { firebaseInit() }, [])

  useEffect(() => {
    if (credential) {
      router.push('/')
    }
    //eslint-disable-next-line
  }, [credential])


  const signUp = () => {
    const auth = getAuth();
      createUserWithEmailAndPassword(auth, signup.email, signup.password)
      .then((userCredential) => {
        Swal.fire('Signup complete')
        setCredential(userCredential.user.accessToken)
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        let message = 'Invalid Fields';
        if(errorCode.includes('email-already-in-use')) {
          message = 'Email Already in Use'
        }
        if(!signup.email.includes('@')) {
          message = 'Invalid Email'
        }
        if(signup.password.length < 6) {
          message = 'The password must be at least 6 characters'
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
        })
        setErrMessage(message)
      });
  }

  const handleChange = ({target}) => {
    setSignup({...signup, [target.name]: target.value})
  }

  return (
    <div className='flex h-screen justify-center items-center bg-neutral-100 border-2'>
      <section className='container mx-auto flex flex-col items-center w-96 h-80 justify-around shadow-xl bg-neutral-50 '>
        <h1 className="text-[#808080] text-5xl">Sign Up</h1>
        <label htmlFor="email">
        <input className='placeholder-gray-700 bg-neutral-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' value={signup.email} name='email' type="text" placeholder="Email" onChange={(e) => handleChange(e)} />
        </label>
        <label htmlFor="password">
        <input className='placeholder-gray-700 bg-neutral-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' value={signup.password} name='password' type="password" placeholder="Password" onChange={(e) => handleChange(e)} />
        </label>
        <div className='flex justify-between w-60'>
          <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border border-blue-700 rounded w-24" onClick={signUp}>Sign up</button>
          <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border border-blue-700 rounded w-24" onClick={() => router.push('/')}>Back</button>
        </div>
        {<p className='text-red-500'>{errMessage}</p>}
      </section>
    </div>
  )
}
