import { defineStore } from "pinia";
import { Movie } from "../models/movie";
import { ref, computed, watch } from "vue";

export const useMovieStore = defineStore("MovieStore", () => {
    const movies = ref([] as Movie[]);
    const activeTab = ref(2);

    const moviesInLocalStorage = localStorage.getItem("movies")
    if (moviesInLocalStorage) {
        movies.value = JSON.parse(moviesInLocalStorage)._value;
    }

    const watchedMovies = computed((): Movie[] => movies.value.filter(el => el.isWatched));
    const totalCountMovies = computed((): number => movies.value.length)

    const setActiveTab = (id: number) => activeTab.value = id;
    const toggleWatched = (id: number) => {
        const idx = movies.value.findIndex(el => el.id === id);
        movies.value[idx].isWatched = !movies.value[idx].isWatched;
    }
    const deleteMovie = (id: number) => movies.value = movies.value.filter(el => el.id !== id);

    watch(() => movies, (state) => {
        localStorage.setItem("movies", JSON.stringify(state))
    }, { deep: true })

    return {
        movies, activeTab, setActiveTab, watchedMovies, totalCountMovies, toggleWatched, deleteMovie
    }
})