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
import { deviceAddRequest, deviceUpdateRequest } from '../../action/deviceAction';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  }
}));

export default function DeviceModal({ open, row, setOpenModal }) {
  const dispatch = useDispatch();
  let headTitle;
  let request;
  let inValues
  if (row && Object.keys(row).length === 0 && row.constructor === Object) {
    headTitle = "Add Device";
    request = deviceAddRequest;
    inValues = {
      title: '',
      ip: '',
      wifi_id: '',
      wifi_pass: '',
      link: ''
    }
  }
  else {
    headTitle = "Edit Device";
    request = deviceUpdateRequest;
    inValues = {
      title: row.title,
      ip: row.ip,
      wifi_id: row.wid,
      wifi_pass: row.wpass,
      link: row.link
    }
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  const EditSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    ip: Yup.string().required('Device IP required'),
    wifi_id: Yup.string().required('WiFi ID required'),
    wifi_pass: Yup.string().required('WiFi Password required'),
    link: Yup.string().required('Link required')
  });

  const formik = useFormik({
    initialValues: inValues,
    enableReinitialize: true,
    validationSchema: EditSchema,
    onSubmit: (value, { resetForm }) => {
      handleClose();
      if (row && Object.keys(row).length === 0 && row.constructor === Object) { }
      else {
        value.id=row._id;
      };

      dispatch(request(value));
      resetForm({ values: '' });
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
          {headTitle}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Typography gutterBottom>
                Please input Device information.
              </Typography>
              <Stack
                spacing={2}
                autoComplete="off"
              >
                <TextField
                  fullWidth
                  label="Title"
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  label="Device Ip"
                  {...getFieldProps('ip')}
                  error={Boolean(touched.ip && errors.ip)}
                  helperText={touched.ip && errors.ip}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="WiFi ID"
                    {...getFieldProps('wifi_id')}
                    error={Boolean(touched.wifi_id && errors.wifi_id)}
                    helperText={touched.wifi_id && errors.wifi_id}
                  />
                  <TextField
                    fullWidth
                    label="WiFi Password"
                    {...getFieldProps('wifi_pass')}
                    error={Boolean(touched.wifi_pass && errors.wifi_pass)}
                    helperText={touched.wifi_pass && errors.wifi_pass}
                  />
                </Stack>
                <TextField
                  fullWidth
                  label="Link"
                  {...getFieldProps('link')}
                  error={Boolean(touched.link && errors.link)}
                  helperText={touched.link && errors.link}
                />
              </Stack>
              <DialogActions>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                // loading={isSubmitting && !Error}
                >
                  Save
                </LoadingButton>
              </DialogActions>
            </Form>
          </FormikProvider>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}