import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "../components/Header"

import { Home } from "../pages/Home"
import { WishList } from "../pages/WishList"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </BrowserRouter>
  )
}
