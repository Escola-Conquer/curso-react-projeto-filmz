import { useEffect, useState } from "react"

import { MovieCard } from "../components/MovieCard"
import { Loading } from "../components/Loading"

import { useWishlist } from "../hooks/useWishlist"

import api from "../services/api"

import { ITopTenWeeklyMovies } from "../interface/Home"

import * as Styles from "../styles/pages/Home"

export function Home() {
  const { handleAddOrRemoveMovieOnWishlist, isMovieInWishlist } = useWishlist()

  const [isLoading, setIsLoading] = useState(false)

  const [top10WeeklyMovies, setTop10WeeklyMovies] = useState<
    ITopTenWeeklyMovies[]
  >([])

  useEffect(() => {
    setIsLoading(true)

    api
      .get("/trending/movie/week")
      .then((response) => {
        setTop10WeeklyMovies(
          response.data.results.slice(0, 10).map((movie: any) => movie)
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <Styles.Container>
      <section id="presentation">
        <div className="text-wrapper">
          <h2>Bem vindo ao Filmz</h2>
          <h1>O lugar perfeito para ter sempre um filme na manga!</h1>

          <p>
            Veja o que as pessoas estão curtindo com a seleção do top 10 da
            semana e pesquise por filmes para saber um pouco mais sobre eles!
          </p>
        </div>
      </section>

      <section id="movies">
        <h3>Top 10 da semana</h3>

        <div className="cards">
          {isLoading ? (
            <Loading />
          ) : (
            top10WeeklyMovies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={{
                    id: movie.id,
                    poster_path: movie.poster_path,
                    title: movie.title,
                    overview: movie.overview,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                  }}
                  handleAddMovieOnWishlist={handleAddOrRemoveMovieOnWishlist}
                  inWishlist={isMovieInWishlist(movie.id)}
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
