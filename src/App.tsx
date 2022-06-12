/**
 * App
 *
 */

import React, { useEffect, useState } from 'react';
import { Link } from '@mui/material';
import { GlobalVariables } from './globalVariables';


const App = () => {

    const { authEndpoint, clientId, responseType, redirectURI } = GlobalVariables.env;

    const [ token, setToken ] = useState('');

    useEffect(() => {
        const hash = window.location.hash;
        const token = window.localStorage.getItem('token');

        if (!token && hash) {
            const { access_token } = Object.fromEntries(new URLSearchParams(hash.substring(1)));

            window.location.hash = '';
            window.location.href = redirectURI;
            window.localStorage.setItem('token', access_token);
        }

        token && setToken(token);
        token && searchArtists();
    }, []);

    const logout = () => {
        setToken('');
        window.localStorage.removeItem('token');
    };

    const searchArtists = async () => {
        const searchParams = 'prodigy';
        const type = 'artist';

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchParams}&type=${type}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const { artists: { items } } = await response.json();

            console.log('artists', items);
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="App">
            <Link href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}`}>
                Redirect to login in spotify
            </Link>
        </div>
    );
};

export default App;
