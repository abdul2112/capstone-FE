//SERVER ROUTES
export const USER_SERVER = "/api/users";
export const SERVER_URL = "http://localhost:5000";
export const API_URL = "https://api.themoviedb.org/3/";
export const API_KEY = "844dba0bfd8f3a4f3799f6130ef9e335";

export const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";

// sort by genre = ${API_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=36

// more = ${API_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=16&sort_by=vote_count.desc

//Sizes: w300, w780, w1280, original
export const BACKDROP_SIZE = "w1280";
export const IMAGE_SIZE = "w1280";

// w92, w154, w185, w342, w500, w780, original
export const POSTER_SIZE = "w500";
export const PACEHOLDER_POSTER_SIZE = "500x750";
