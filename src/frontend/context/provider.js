import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export function Provider({ children }) {
  const [state, setState] = useState([]);
  const [filtredState, setFiltredeState] = useState([])
  const router = useRouter();
  const [darkmode, setDarkmode] = useState(false);

  const getTodos = async () => {
    const user = JSON.parse(localStorage.getItem('fb-todo-user'))
    let email = router.query.email;
    if(user) {
      email = router.query.email || user.email
    }
    await axios({
      method: 'get',
      url: 'https://fullstack-firebase-todolist.herokuapp.com/todos/',
      params: { email }
    }).then((r) => {
      const data = r.data.sort((a,b) => a.timestamp - b.timestamp)
      setState(data);
    })
  }

const operations = {
  darkmode,
  setDarkmode,
  filtredState,
  setFiltredeState,
  setState,
}
  return (
    <Context.Provider value={[state, getTodos, operations]}>{children}</Context.Provider>
  );
}

export function useProviderContext() {
  return useContext(Context);
}