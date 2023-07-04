import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref } from "vue";
const url = "https://api.themoviedb.org/3/search/movie?api_key=d90851957f0f4f76d5e2d401ae6876e4&query="

export const useSearchStore = defineStore("searchStore", () => {
    const loader = ref(false);
    const movies = ref([]);

    const getSearchMovies = async (search: string) => {
        loader.value = true;
        console.log(search);
        const res = await fetch(`${url}${search}`);
        const data = await res.json();
        movies.value = data.results;
        loader.value = false;
    }

    const addToUserMovies = (object: any) => {
        const movieStore = useMovieStore();
        movieStore.movies.push({ ...object, isWatched: false });
        movieStore.activeTab = 1;
    }

    return {
        loader,
        movies,
        getSearchMovies,
        addToUserMovies
    }
});
