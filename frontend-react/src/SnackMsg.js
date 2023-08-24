import React from 'react';
import {Snackbar, Alert} from '@mui/material';

const SnackMsg = (props) => {
    return (
        <Snackbar
        opeen={props.open}
        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
        autoHideDuration={3000}
        onClose={props.onClose}
        message={props.message}>
            {/* <Alert onClose={props.onClose} severity='success' sx={{width:'100%'}}>
                {props.message}
            </Alert> */}
        </Snackbar>
    )
}

export default SnackMsg;