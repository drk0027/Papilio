import Head from 'next/head'
//import styles from '../../styles/Home.module.css'
import "tailwindcss/tailwind.css";
import Link from 'next/link'
import Layout from '../../components/layout'
import NavBar from "../../components/navbar"
const ReactMarkdown = require('react-markdown')

export async function getStaticProps(context) {
  const res = await fetch(`http://165.22.43.21:8081/api/wiki`)
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
          <h1>Listas de Wikis en este servidor</h1>
          <label>Buscar</label>
          <input type="text" name="buscar" />
          <div>
            {data.map((resp) => (
              <div key={resp.id_wiki}>
                <h3><Link href={"/wiki/"+resp.slug}>{resp.nombre}</Link></h3>
                <ReactMarkdown source={resp.descripcion} />
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
