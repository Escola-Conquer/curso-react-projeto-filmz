import { HTMLAttributes } from "react"

import { IMovieProps } from "../../hooks/useWishlist/types"

interface IMovieForCardProps {
  id: number
  title: string
  overview: string
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface IMovieCardProps extends HTMLAttributes<HTMLDivElement> {
  movie: IMovieForCardProps
  inWishlist: boolean
  handleAddMovieOnWishlist: (movie: IMovieProps) => void
}
