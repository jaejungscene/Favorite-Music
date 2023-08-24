import React from 'react';
import {Button, TextField} from '@mui/material';
import MusicList from './MusicList';
import {API_URL} from './config/constants.js';

// import temp_list from './data';

export default function SearchPage({list, onSearch, likes, setLikes}){
    const [searchWord, setSearchWord] = React.useState('');
    // const [music_list, setMusicList] = React.useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(`searchWord: ${searchWord}`);
        setSearchWord('');
        fetch(`${API_URL}/musicSearch/${searchWord}`)
        .then(r => r.json())
            .then(r => {
                console.log(`response: ${r}`);
                // setMusicList(r.results);
                onSearch(r.results);
                setSearchWord('');
            })
        .catch(e => console.log('error when search musician'));
    }

    const handleSearchTextChange = (event) => {
        setSearchWord(event.target.value);
    }

    return (
        <React.Fragment>
            <form style={{display:'flex', marginTop:20, marginBottom:15}}>
                <div style={{display:'flex', marginLeft:'auto', marginRight:'auto'}}>
                    <TextField
                    variant='outlined'
                    label='Music Album Search'
                    type='search'
                    style={{width:450}}
                    onChange={handleSearchTextChange}
                    value={searchWord}/>
                    <Button 
                        variant='contained' 
                        color='primary'
                        type='submit'
                        onClick={handleSearch}
                        style={{marginLeft:20}}>
                            Search
                    </Button>
                </div>
            </form>
            <MusicList list={list} likes={likes} setLikes={setLikes}/>
        </React.Fragment>
    )
}