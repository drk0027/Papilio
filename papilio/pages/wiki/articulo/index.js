import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../../../components/layout'


export default function Articulos() {
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
			<h3>A</h3>
				<ul>
					<li>Anastasia</li>
				</ul>
			<h3>B</h3>
				<ul>
					<li>Bernabé</li>
				</ul>
			<h3>C</h3>
				<ul>
					<li>Carlos</li>
				</ul>
			<h3>D</h3>
				<ul>
					<li>Daniel</li>
				</ul>
			<h3>E</h3>
				<ul>
					<li>Eren</li>
				</ul>
			<h3>F</h3>
				<ul>
					<li>Federica</li>
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
