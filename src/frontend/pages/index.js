import Login from "../components/Login";
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fullstack Todolist</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Login />
    </div>
  )
}