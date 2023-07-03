import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
const url = "https://api.themoviedb.org/3/search/movie?api_key=d90851957f0f4f76d5e2d401ae6876e4&query="

export const useSearchStore = defineStore("searchStore", {
    state: () => ({
        movies: [],
        loader: false,
    }),
    actions: {
        async getSearchMovies(search: string) {
            this.loader = true;
            console.log(search);
            const res = await fetch(`${url}${search}`);
            const data = await res.json();
            this.movies = data.results;
            this.loader = false;
        },
        addToUserMovies(object: any) {
            const movieStore = useMovieStore();
            movieStore.movies.push({ ...object, isWatched: false });
            movieStore.activeTab = 1;
        }
    }
});