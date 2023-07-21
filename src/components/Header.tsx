import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header >
      <h2>REACT STOCK</h2>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/items">Itens</Link>
      </nav>
    </header>
  )
}
