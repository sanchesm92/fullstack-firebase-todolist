import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
const URL = process.env.REACT_APP_URL_ENDPOINT || 'https://fullstack-firebase-todolist.herokuapp.com/todos/'

const Context = createContext();

export function Provider({ children }) {
  const [state, setState] = useState([]);
  const [filtredState, setFiltredeState] = useState([])
  const router = useRouter();
  const [darkmode, setDarkmode] = useState(false);

/**
* @description
* getTodos responsible for get all tasks
*/

  const getTodos = async () => {
    const user = JSON.parse(localStorage.getItem('fb-todo-user'))
    let email = router.query.email;
    if(user) {
      email = router.query.email || user.email
    }
    await axios({
      method: 'get',
      url: URL,
      params: { email }
    }).then((r) => {
      const data = r.data.sort((a,b) => a.orderNumber - b.orderNumber)
      setState(data);
      const newState = data.filter((i) => i.completed === true)
      setFiltredeState(newState)
    })
  }

  const updateFilteredState = () => {
    const newState = state.filter((i) => i.completed === true)
    setFiltredeState(newState)
  }

const operations = {
  darkmode,
  setDarkmode,
  filtredState,
  updateFilteredState,
  setState,
}

  return (
    <Context.Provider value={[state, getTodos, operations]}>{children}</Context.Provider>
  );
}

export function useProviderContext() {
  return useContext(Context);
}