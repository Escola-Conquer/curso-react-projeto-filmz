import { FiCheck, FiPlus } from "react-icons/fi"

import { Button } from "../Button"

import { ButtonVariants } from "../Button/types"
import { IMovieCardProps } from "./types"

import * as Styles from "./styles"

export function MovieCard(props: IMovieCardProps) {
  return (
    <Styles.Container {...props}>
      <img
        src={`${import.meta.env.VITE_THE_MOVIE_DB_IMAGES_URL}${
          props.movie.poster_path
        }`}
        alt={`${props.movie.title} film cover`}
      />

      <div>
        <div>
          <h4>{props.movie.title}</h4>
          <p>{props.movie.overview}</p>
        </div>

        <footer>
          <div className="rating">
            <span>Avaliação geral:</span>
            {props.movie.vote_average.toFixed(1)}
          </div>

          <div className="actions">
            <Button
              type="button"
              variant={ButtonVariants.Secondary}
              onClick={() => props.handleAddMovieOnWishlist(props.movie)}
            >
              {props.inWishlist ? (
                <>
                  Em sua lista
                  <FiCheck />
                </>
              ) : (
                <>
                  Adicionar à minha lista
                  <FiPlus />
                </>
              )}
            </Button>
            <Button type="button">Ver mais</Button>
          </div>
        </footer>
      </div>
    </Styles.Container>
  )
}
