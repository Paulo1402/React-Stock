import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function RootLayout() {
  console.log('RootLayout')
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Feito com React Router DOM!</p>
      </footer>
    </>
  )
}
