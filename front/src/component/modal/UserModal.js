import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { BootstrapDialogTitle } from './BootstrapDialogTitle'
import { nameUpdateRequest } from '../../action/userAction';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  }
}));

export default function UserModal({ open, user, title, setOpenModal }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModal(false);
  };

  const EditSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('FirstName required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('LastName required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName
    },
    enableReinitialize: true,
    validationSchema: EditSchema,
    onSubmit: (value) => {
      handleClose();
      dispatch(nameUpdateRequest(value, user._id));
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Typography gutterBottom>
                Please change your name.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Stack>
              <DialogActions>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                // loading={isSubmitting && !Error}
                >
                  Save changes
                </LoadingButton>
              </DialogActions>
            </Form>
          </FormikProvider>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}