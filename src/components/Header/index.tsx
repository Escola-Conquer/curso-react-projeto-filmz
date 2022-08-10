import { FormEvent, useState } from "react"
import { FaHome, FaStar } from "react-icons/fa"

import { Button } from "../Button"
import { Link } from "../Link"

import Logo from "../../assets/logo.png"

import * as Styles from "./styles"

export function Header() {
  const [search, setSearch] = useState("")

  function handleSearch(event: FormEvent) {
    event.preventDefault()
  }

  return (
    <Styles.Container>
      <div>
        <Link to="/">
          <img
            src={Logo}
            alt="Logo de Filmz. Botão de play ao lado do texto 'Filmz'"
          />
        </Link>

        <Link to="/">
          <FaHome />
          Home
        </Link>
        <Link to="/wishlist">
          <FaStar />
          Meus favoritos
        </Link>
      </div>

      <form className="search-wrapper" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Pesquise um filme"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Button style={{ borderRadius: "0 4px 4px 0" }}>Pesquisar</Button>
      </form>
    </Styles.Container>
  )
}
