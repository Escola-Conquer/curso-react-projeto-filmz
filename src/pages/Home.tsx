import { useEffect, useState } from "react"

import { MovieCard } from "../components/MovieCard"

import { useWishlist } from "../hooks/useWishlist"

import api from "../services/api"

import { ITopTenWeeklyMovies } from "../interface/Home"

import * as Styles from "../styles/pages/home"

export function Home() {
  const { wishlist, handleAddOrRemoveMovieOnWishlist } = useWishlist()

  const [top10WeeklyMovies, setTop10WeeklyMovies] = useState<
    ITopTenWeeklyMovies[]
  >([])

  function getTop10WeeklyMoviesIds() {
    return wishlist?.map((movie) => movie.id)
  }

  useEffect(() => {
    api
      .get("/trending/movie/week", { params: { total_results: 2 } })
      .then((response) => {
        setTop10WeeklyMovies(
          response.data.results.slice(0, 10).map((movie: any) => movie)
        )
      })
  }, [])

  return (
    <Styles.Container>
      <section id="presentation">
        <div className="text-wrapper">
          <h2>Bem vindo ao Filmz</h2>
          <h1>O lugar perfeito para ter sempre um filme na manga!</h1>

          <p>
            Nunca mais fique parado na frente do seu streaming perdendo tempo
            procurando por filmes legais. Aqui você pode salvar os filmes que te
            chamam a atenção e ver o que todos estão vendo e achando mais legal
            no momento!
          </p>
        </div>
      </section>

      <section id="films">
        <h3>Top 10 da semana</h3>

        <div className="cards">
          {top10WeeklyMovies.map((movie) => {
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
                inWishlist={getTop10WeeklyMoviesIds().includes(movie.id)}
                className="card"
              />
            )
          })}
        </div>
      </section>
    </Styles.Container>
  )
}
