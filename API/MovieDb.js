import axios from 'axios'

const API_KEY = '165ed5defc4502d6f8a7ac7b85d0ab1f'

const apiBaseUrl = `https://api.themoviedb.org/3`

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`


const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`


const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null


export const fallbackMovies = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg'
export const fallbackPersons = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU'


const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options)
        return response.data;
    } catch (error) {
        console.log('error: ', error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}


export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits = (id) => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id))
}


export const fetchPersonDetails = (id) => {
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovies = (id) => {
    return apiCall(personMoviesEndpoint(id))
}


export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}