import Head from 'next/head'
//import styles from '../../styles/Home.module.css'
import "tailwindcss/tailwind.css";
import Link from 'next/link'
import Layout from '../../../components/layout'
import NavBar from "../../../components/navbar"
const ReactMarkdown = require('react-markdown')

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:8081/api/articulo/` + context.params.nombre)
  console.log(res)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data
    }, // will be passed to the page component as props
  }
}

export default function Inicio({ data }) {
  return (
    <Layout home>
      <NavBar></NavBar>
      <div>
        <Head>
          <title>Papilio</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <main>
          <h1>Articulo:</h1>
          <label>Buscar</label>
          <input type="text" name="buscar" />
          <div>
            <div key={data.id_wiki}>
              <h3>{data.nombre}</h3>
              <ReactMarkdown source={data.contenido} />
            </div>
          </div>
        </main>

        <footer>

        </footer>
      </div>
    </Layout>
  )
}
