import { ReactNode } from "react"

interface IGenresProps {
  id: number
  name: string
}

export interface IMovieProps {
  id: number
  title: string
  overview: string
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface IWishlistContextData {
  wishlist: IMovieProps[]
  setWishlist: React.Dispatch<React.SetStateAction<IMovieProps[]>>
  handleAddOrRemoveMovieOnWishlist: (movie: IMovieProps) => void
  isMovieInWishlist: (movieId: number) => boolean
}

export interface IWishlistProviderprops {
  children: ReactNode
}


