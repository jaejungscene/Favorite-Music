import React from 'react';
import {Card, CardContent, CardActions, Typography, IconButton, Alert} from '@mui/material';
import {Favorite, FavoriteBorder} from '@mui/icons-material'
import SnackMsg from './SnackMsg';
import { API_URL } from './config/constants';

const styles = {
    content: {},
    layout: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        minWidth: 275,
        maxWidth: 600,
        marginBottom: '20pt',
        marginLeft: "auto",
        marginRight: "auto",
    },
}


export default function MusicList({list, likes, setLikes}){
    const [snackState, setSnackState] = React.useState({open:false, msg:''});

    const handleSnackbarClose = (event, reasone) => {
        if(reason === 'clickaway')  {return;}
        setSnackState({open:false, msg:''});
    }

    const toggleFavorite = (id, item) => () => {
        if(likes[id]){ //value exists
            const newLikes = likes;
            delete newLikes[id];
            fetch(
                `${API_URL}/likes/${id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                }
            ).then(r => r.json())
            .then(r =>{
                if(r === 1){
                    console.log('response >>> ', r);
                    setLikes(newLikes);
                }
                else{
                    console.log('DB ERROR>>> ', r);
                    alert("DB ERROR: checked music hasn't been stored.");
                }
            })
            .catch(e => console.log('Delete ID from database fail'));
        }
        else{
            fetch(
                `${API_URL}/likes`, 
                {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {"Content-Type": "application/json"},
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(item), // body data type must match "Content-Type" header
                }
            ).then(r => r.json())
            .then(r =>{
                if(r === 1){
                    console.log('response >>> ', r);
                    setLikes({...likes, [id]: item});
                }
                else{
                    console.log('DB ERROR>>> ', r);
                    alert("DB ERROR: checked music hasn't been stored.");
                }
            })
            .catch(e => {console.error("POST Error: ADD like to database", error);});
        }
        setSnackState({...snackState, open:true, msg:`${id} is clicked`})
    }

    return(
        <div>
            <SnackMsg 
            open={snackState.open}
            message={snackState.msg}
            onClose={handleSnackbarClose}/>

            {list.map(item=>{
                return(
                    <Card sx={styles.card} key={item.collectionId}>
                        <CardContent>
                            <Typography variant='subtitle1'>{item.artistName}</Typography>
                            <Typography variant='subtitle2'>{item.collectionName}</Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={toggleFavorite(item.collectionId, item)}>
                                {(likes[item.collectionId]) ?
                                 <Favorite/> : <FavoriteBorder/>}
                            </IconButton>
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )
}