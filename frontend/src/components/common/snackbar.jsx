import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export const SuccessSnackBar = (props) => {
    const { message, handleClose } = props;

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            className="w-25"
            open={message.length}
            autoHideDuration={3000}
            onClose={handleClose}>
            <Alert severity="success" onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    )
}