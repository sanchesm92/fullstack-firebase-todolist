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
    await axios({
      method: 'get',
      url: 'http://localhost:3001/todos/',
      params: { email: router.query.email }
    }).then((r) => {
      const data = r.data.sort((a,b) => a.timestamp - b.timestamp)
      setState(data);
      
    })
  }
const operations = {
  darkmode,
  setDarkmode,
  filtredState,
  setFiltredeState,//ir add ou remover os completos
  setState, // qdo clicar no completed seta o estado com o filtred
}
  return (
    <Context.Provider value={[state, getTodos, operations]}>{children}</Context.Provider>
  );
}

export function useProviderContext() {
  return useContext(Context);
}