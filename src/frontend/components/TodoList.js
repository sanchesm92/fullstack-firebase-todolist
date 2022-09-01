import {  useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Task from "./Task";
import { useProviderContext } from "../context/provider";
import TaskForm from "./TaskForm";
import { firebaseInit } from "../firebase";

export default function TodoList() {
  const [state, getTodos] = useProviderContext()
  const router = useRouter()

    useEffect(() => {
    firebaseInit()
    const getUser = JSON.parse(localStorage.getItem('fb-todo-user'));
    if(!router.query.token && !getUser) {
      router.push('/')
    } else {
      getTodos()
    }
    //eslint-disable-next-line
  },[])

  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div className="px-8 mx-auto flex h-5/6 flex-col items-center w-full">
        <div className="border-2 mt-20 rounded-md container flex flex-col items-center w-full h-5/6 shadow-xl bg-neutral-50 p-4 gap-4">
          <TaskForm />
          <div className="w-full overflow-auto">
          {state[0] ?
          state.map((item) => (
            <div key={item.id} className='flex justify-center w-full'>
              <Task props={item} />
            </div>
          )) : <span>There are no tasks registered to this user</span>
        }
          </div>
        </div>
      </div>
    </main>
  )
}
