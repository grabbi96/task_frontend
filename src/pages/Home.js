import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const router = useNavigate();
    return (
        <div>
            Home
            <a href="osiris://odin" > click here </a>
            <button onClick={() => router('osiris://odin')}> click on button </button>
        </div>
    );
}

export default Home;
