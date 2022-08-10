import { ReactNode } from "react"

export interface IMovieProps {
  id: number
  title: string
  overview: string
  poster_path: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
}

export interface IWishlistContextData {
  wishlist: IMovieProps[]
  setWishlist: React.Dispatch<React.SetStateAction<IMovieProps[]>>
  handleAddOrRemoveMovieOnWishlist: (movie: IMovieProps) => void
  isMovieInWishlist: (movie: IMovieProps) => boolean
}

export interface IWishlistProviderprops {
  children: ReactNode
}


