import React from 'react';
import MusicList from './MusicList';

const Favorites = ({likes, setLikes}) => {
    let list = Object.values(likes).reverse();
    return(
        <MusicList list={list} likes={likes} setLikes={setLikes}/>
    )
}
export default Favorites;