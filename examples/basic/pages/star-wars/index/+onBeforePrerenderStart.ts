// https://vike.dev/onBeforePrerenderStart
export { onBeforePrerenderStart }

import type { OnBeforePrerenderStartAsync } from 'vike/types'
import { filterMovieData } from '../filterMovieData'
import { fetchStarWarsMovies, filterMoviesData, getTitle } from './data'
import { Movie } from '../types'

const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async (): ReturnType<OnBeforePrerenderStartAsync> => {
  const movies = await fetchStarWarsMovies()

  return [
    {
      url: '/star-wars',
      // We already provide `pageContext` here so that Vike
      // will *not* have to call the `data()` hook defined
      // above in this file.
      pageContext: {
        data: {
          movies: filterMoviesData(movies),
          title: getTitle(movies)
        }
      }
    },
    ...movies.map((movie) => {
      const url = `/star-wars/${movie.id}`
      return {
        url,
        // Note that we can also provide the `pageContext` of other pages.
        // This means that Vike will not call any
        // `data()` hook and the Star Wars API will be called
        // only once (in this `prerender()` hook).
        pageContext: {
          data: {
            movie: filterMovieData(movie),
            title: movie.title
          }
        }
      }
    })
  ]
}

declare global {
  namespace Vike {
    interface Data {
      movies?: Movie[]
      movie?: Movie
    }
  }
}
