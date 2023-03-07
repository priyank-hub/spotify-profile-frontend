import axios from 'axios';

const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds
export const setTokenTimestamp = () => localStorage.setItem('spotify_token_timestamp', Date.now());

export const setLocalAccessToken = token => {
    setTokenTimestamp();
    localStorage.setItem('spotify_access_token', token);
};
export const setLocalRefreshToken = token => localStorage.setItem('spotify_refresh_token', token);

const getTokenTimestamp = () => localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => localStorage.getItem('spotify_refresh_token');

export const getAccessToken = () => {
    const localAccessToken = getLocalAccessToken();
    
    // If token has expired
    if (localAccessToken && Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...');
        refreshAccessToken();
    }

    // console.log('returning token', localAccessToken);
  
    // If there is no ACCESS token in local storage, set it and return `access_token` from params
    // if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    //     setLocalAccessToken(access_token);
    //     setLocalRefreshToken(refresh_token);
    //     return access_token;
    // }
  
    return localAccessToken;
};

const refreshAccessToken = async () => {
    console.log('refreshing token');
    try {
        const { data } = await axios.get(`http://localhost:3000/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const { access_token } = data;
        setLocalAccessToken(access_token);
        window.location.reload();
        return;
    } catch (e) {
      console.error(e);
    }
};

export const logout = () => {
    localStorage.removeItem('spotify_token_timestamp');
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    location.reload();
};


// API CALLS
// const token = getAccessToken();

// const headers = {
//     Authorization: `Bearer ${getAccessToken()}`,
//     'Content-Type': 'application/json',
// };

// export const getUser = async () => {
//     console.log('getting user', headers);
//     return await axios.get('https://api.spotify.com/v1/me', { headers })
// };