/**
 * Variables
 *
 */


const env = {
    clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    redirectURI: import.meta.env.VITE_REDIRECT_URI,
    authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
    responseType: import.meta.env.VITE_RESPONSE_TYPE,
};

const GlobalVariables = {
    env,
};


export { GlobalVariables };