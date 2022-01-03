import { forwardRef } from 'react';
import { useDispatch } from "react-redux";
import { Snackbar, AlertTitle } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { resetToastHandler } from '../action/authAction';

export const Toast = ({ open, setOpen, errorMessage, reset, isSuccess }) => {

  const dispatch = useDispatch();

  const type = isSuccess ? "success" : "error";
  const title = isSuccess ? "Success" : "Error";

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(reset());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
      <Alert variant="filled" severity={type} onClose={handleClose}>
        <AlertTitle>{title}</AlertTitle>
        {errorMessage} — <strong>check it out!</strong>
      </Alert>
    </Snackbar >
  );
}