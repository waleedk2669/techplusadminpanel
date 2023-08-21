import React, {useEffect, useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DropdownField } from './FormFields';
import { useDispatch, useSelector } from 'react-redux';
import { driverRequest } from '../store/reducers/newOrders';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function OpenModal({open, close, onDispatch}) {

  const dispatch = useDispatch();
  const [selectedDriver, setSelectedDriver] = useState(null)
  const drivers = useSelector(state => state.newOrders.driver)

  const handleDriverChange = (name, newValue, state) => {
    if(newValue){
      console.log(newValue)
      state(newValue.id)
    }
  }
  
  const optionHandler = (option)=> option.first_name + ' ' + option.last_name;
  useEffect(()=>{
    dispatch(driverRequest());

  },[])
  return (
    <div>
      <Dialog open={open} onClose={close}>
            <DialogTitle>Assign driver</DialogTitle>
            <DialogContent>
                <DialogContentText style={{minWidth: '400px'}}>
                <DropdownField data={drivers} name="select_driver" showLabel={false} fieldChange={handleDriverChange} state={setSelectedDriver} label="Select Driver" optionHandler={optionHandler} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="secondary">
                    Cancel
                </Button>
                <Button onClick={(e)=>{onDispatch(e, selectedDriver)}} variant="contained" color="primary">
                    Assign
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
