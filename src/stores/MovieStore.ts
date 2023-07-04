import { defineStore } from "pinia";
import { Movie } from "../models/movie";
import { ref, computed } from "vue";

export const useMovieStore = defineStore("MovieStore", () => {
    const movies = ref([] as Movie[]);
    const activeTab = ref(2);

    const watchedMovies = computed((): Movie[] => movies.value.filter(el => el.isWatched));
    const totalCountMovies = computed((): number  => movies.value.length)

    const setActiveTab = (id: number) => activeTab.value = id;
    const toggleWatched = (id: number) => {
        const idx = movies.value.findIndex(el => el.id === id);
        movies.value[idx].isWatched = !movies.value[idx].isWatched;
    }
    const deleteMovie = (id: number) => movies.value = movies.value.filter(el => el.id !== id);

    return {
        movies, activeTab, setActiveTab, watchedMovies, totalCountMovies, toggleWatched, deleteMovie
    }
})