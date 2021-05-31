import Head from 'next/head'
//import styles from '../../styles/Home.module.css'
import "tailwindcss/tailwind.css";
import Link from 'next/link'
import Layout from '../../components/layout'
import NavBar from "../../components/navbar"
const ReactMarkdown = require('react-markdown')

export async function getServerSideProps(context) {
    console.log(context.params.nombre)
  const res = await fetch(`http://localhost:8081/api/wiki/`+context.params.nombre)
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
          <h1>Articulos en esta Wiki:</h1>
          <label>Buscar</label>
          <input type="text" name="buscar" />
          <div>
            {data.map((resp) => (
              <div key={resp.id_wiki}>
                <h3><Link href={"/wiki/articulo/"+resp.slug}>{resp.nombre}</Link></h3>
              </div>
            ))}

          </div>
        </main>

        <footer>

        </footer>
      </div>
    </Layout>
  )
}
