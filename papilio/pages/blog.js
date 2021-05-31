import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/layout'


export default function Blog() {
  return (
  <Layout home>
    <div className={styles.container}>
      <Head>
        <title>LiteraWiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
	

      <main className={styles.main}>
        <h1>Blog Recogiendo Frutos</h1>
		<label for="buscar">Buscar</label>
		<input type="text" name="buscar"/>
		<div>
			<h3>Primer post</h3>
			<small>5 de marzo del 2021</small>
			<p>Primer registro para el blog, puedes poner loque te de la gana en formato markdown</p>
		</div>
		<div>
			<h3>Segundo Post</h3>
			<small>5 de marzo del 2021</small>
			<p>De la misma forma, puedes adjuntar imagenes de una galeria que algun dia crearé</p>
		</div>
		<div>
			<h3>Tercer post</h3>
			<small>5 de marzo del 2021</small>
			<p>Puedes hacer referencia a un articulo de la wiki usando etiquetas especiales que luego crearé</p>
		</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
	</Layout>
  )
}
