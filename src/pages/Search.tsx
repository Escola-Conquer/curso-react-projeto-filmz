import { FormEvent, useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import { Button } from "../components/Button"
import { Loading } from "../components/Loading"
import { MovieCard } from "../components/MovieCard"
import { useWishlist } from "../hooks/useWishlist"
import { IMovieProps } from "../hooks/useWishlist/types"

import api from "../services/api"

import * as Styles from "../styles/pages/Search"

export function Search() {
  const [keyword, setKeyword] = useSearchParams()
  const { handleAddOrRemoveMovieOnWishlist, isMovieInWishlist } = useWishlist()

  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState<IMovieProps[]>([])

  function handleSearch(event: FormEvent) {
    event.preventDefault()

    setKeyword({ keyword: search })
    // api
    //   .get("/search/movie", { params: { query: keyword } })
    //   .then((response) => {
    //     setMovies(response.data.results)
    //   })
    //   .finally(() => {
    //     setIsLoading(false)
    //   })
  }

  useEffect(() => {
    if (keyword.get('keyword')) {
      setIsLoading(true)

      api
        .get("/search/movie", { params: { query: keyword.get('keyword'), include_adult: false } })
        .then((response) => {
          
          setMovies(response.data.results)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [keyword.get('keyword')])

  return (
    <Styles.Container>

      <section id="movies">
        <h3>
          {movies.length} resultado{movies.length !== 1 && "s"} encontrado
          {movies.length !== 1 && "s"}
        </h3>

        <div className="cards">
          {isLoading ? (
            <Loading />
          ) : (
            movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={{
                    id: movie.id,
                    poster_path: movie.poster_path,
                    title: movie.title,
                    overview: movie.overview,
                    genre_ids: movie.genre_ids,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                  }}
                  handleAddMovieOnWishlist={handleAddOrRemoveMovieOnWishlist}
                  inWishlist={isMovieInWishlist(movie)}
                  className="card"
                />
              )
            })
          )}
        </div>
      </section>
    </Styles.Container>
  )
}
