import axios from 'axios';

const TMDB_KEY = '81d04a0fdfd9135f74437fc769c03021';

const makeRequest = (path, params) => (
    axios.get(`https://api.themoviedb.org/3${path}`, {
        params: {
            ...params,
            api_key:TMDB_KEY
        }
    })
);

const getAnything = async (path, params={}) => {
    try {
        const { data: {results}, data} = await makeRequest(path, params);
        return [results || data, null]
    } catch(e) {
        return [null, e]
    }
}



export const movieApi = {
    nowPlaying: () => getAnything('/movie/now_playing'),
    popular: () => getAnything('/movie/popular'),
    upcoming: () => getAnything('/movie/upcoming', {region: 'kr'}),
    search: (query) => getAnything('/search/movie/', {query}),
    movie: (id) => getAnything(`/movie/${id}`, {append_to_response:'videos'}),
    discover: () => getAnything('/discover/movie/')
}

export const tvApi = {
    today:() => getAnything('/tv/airing_today'),
    thisWeek:() => getAnything('/tv/on_the_air'),
    topRated:() => getAnything('/tv/top_rated'),
    popular:() => getAnything('/tv/popular'),
    search:(query) => getAnything('/search/tv', {query}),
    show:(id) => getAnything(`/tv/${id}`, {append_to_response: 'vodeos'})
};

export const apiImage = (path, defaultPoster= 'https://images.unsplash.com/photo-1511875762315-c773eb98eec0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80') =>
    path 
    ? `https://image.tmdb.org/t/p/w500/${path}` 
    : defaultPoster;