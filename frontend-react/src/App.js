import React, { useEffect } from 'react';
// import MusicList from './MusicList';
// import music_list from './data';
import SearchPage from './SearchPage';
import Favorites from './Favorites';
import {Box, Tabs, Tab, Typography, AppBar, CssBaseline} from '@mui/material';
import { API_URL } from './config/constants';


export default function App () {
    const [currentTab, setCurrentTab] = React.useState(0);
    const [searchResult, setSearchResult] = React.useState([]);
    const [likes, setLikes] = React.useState({});

    let response;
    useEffect(()=>{
        fetch(`${API_URL}/likes`)
        .then(r => r.json())
        .then(r => {
            response = r;
            response = Object.assign({}, 
                ...response.map((x) => ({[x.collectionId]: x})));
            console.log(`response: `, response);
            setLikes(response);
        })
        .catch(e => console.log('ERROR: Fetching Likes from database fail'));
    },[]);

    console.log("likes:");
    console.log(likes);
    
    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    }

    return (
        <React.Fragment>
            <AppBar position='fixed'>
                <Typography align='center' variant='h3' color="inherit">
                    Jaejung's Music Site
                </Typography>
            </AppBar>

            <div style={{height:68, width:'100%'}}></div>
            <Box sx={{borderBottom:1, borderColor:'divider'}}>
                <Tabs 
                value={currentTab} 
                onChange={handleTabChange} 
                aria-label='basic tabs' 
                centered>
                    <Tab label="Search Music" value={0}/>
                    <Tab label="Favorites" value={1}/>
                    <Tab label="More Contents" value={2}/>
                </Tabs>
            </Box>
            {currentTab==0 && <SearchPage list={searchResult} onSearch={setSearchResult} likes={likes} setLikes={setLikes}/>}
            {currentTab==1 && <Favorites likes={likes} setLikes={setLikes}/>}
            {currentTab==2 && <Typography align="center" variant='h2'>Item Three</Typography>}
        </React.Fragment>
    );
}

