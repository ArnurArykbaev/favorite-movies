import { defineStore } from "pinia";
import { Movie } from "../models/movie";

export const useMovieStore = defineStore("MovieStore", {
    state: () => ({
        movies: [] as Movie[],
        activeTab: 2,
    }),
    getters: {
        watchedMovies(): Movie[] {
            return this.movies.filter(el => el.isWatched)
        },
        totalCountMovies(): number {
            return this.movies.length;
        }
    },
    actions: {
        setActiveTab(id: number) {
            this.activeTab = id;
        },
        toggleWatched(id: number) {
            console.log(id)
            const idx = this.movies.findIndex(el => el.id === id);
            this.movies[idx].isWatched = !this.movies[idx].isWatched;
        },
        deleteMovie(id: number) {
            this.movies = this.movies.filter(el => el.id !== id);
        }
    }
})