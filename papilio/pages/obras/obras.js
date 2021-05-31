import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../../components/layout'


export default function Obras() {
  return (
  <Layout home>
    <div className={styles.container}>
      <Head>
        <title>LiteraWiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
	

      <main className={styles.main}>
        <h1>Indice de entradas de la wiki por orden alfabetico</h1>
		<label for="buscar">Buscar</label>
		<input type="text" name="buscar"/>
		<div>
			<h3>Libros</h3>
				<ul>
					<li>Los frutos del tiempo. Primera cosecha</li>
					<li>Los hijos de Galileo</li>
					<li>Supervivencia y redencion</li>
				</ul>
			<h3>Ultimas Actualizaciones</h3>
				<ul>
					<li>Capitulo 1 (libro)</li>
					<li>Capitulo 1 (relato)</li>
					<li>Capitulo 1 (articulo)</li>
				</ul>
			
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
