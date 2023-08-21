import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export const DeleteConfirmation = ({handleDelete , showDeleteConfirmation , handleCloseModal}) => {
    return (
        <Dialog open={showDeleteConfirmation} onClose={handleCloseModal}>
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this row?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}


