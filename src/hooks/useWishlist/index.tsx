import { useState, createContext, useContext } from "react"

import {
  IWishlistContextData,
  IMovieProps,
  IWishlistProviderprops,
} from "./types"

export const WishlistContext = createContext({} as IWishlistContextData)

export function WishlistProvider(props: IWishlistProviderprops): JSX.Element {
  const [wishlist, setWishlist] = useState<IMovieProps[]>(() => {
    const storagedFilms = localStorage.getItem("wishlist")

    if (storagedFilms) {
      return JSON.parse(storagedFilms)
    }

    return []
  })

  function isMovieInWishlist(movie: IMovieProps): boolean {
    const movieFound = wishlist.find(
      (wishlistFilm) => wishlistFilm.id === movie.id
    )

    if (movieFound) {
      return true
    }

    return false
  }

  function handleAddOrRemoveMovieOnWishlist(movie: IMovieProps) {
    if (isMovieInWishlist(movie)) {
      setWishlist((prevState) =>
        prevState.filter((wishlistFilm) => wishlistFilm.id !== movie.id)
      )

      return
    }

    setWishlist((prevState) => [...prevState, movie])
    localStorage.setItem("wishlist", JSON.stringify([...wishlist, movie]))
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        handleAddOrRemoveMovieOnWishlist,
        isMovieInWishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  )
}

export function useWishlist(): IWishlistContextData {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }

  return context
}

export default WishlistContext
