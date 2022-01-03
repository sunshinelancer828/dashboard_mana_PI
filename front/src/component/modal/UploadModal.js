import React, { useEffect, useState, createRef } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

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

export const useStyles = makeStyles({
  uploadInput: {
    border: '1px dashed grey',
    padding: '10px',
    width: '400px'
  },
  title: {
    paddingLeft: "10px",
    marginTop: "5px"
  },
  box: {
    padding: '4px'
  }
})

export default function UploadModal({ open, row, setOpenModal }) {
  const dispatch = useDispatch();
  const fileScript = createRef();
  const fileVideo = createRef();
  const fileHtml = createRef();
  const [scriptName, setscriptName] = useState("");
  const [videoName, setvideoName] = useState("");
  const [htmlName, sethtmlName] = useState("");
  const classes = useStyles();
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
        value.id = row._id;
      };

      dispatch(request(value));
      resetForm({ values: '' });
    }
  });

  const setFile1 = evt => {
    setscriptName(evt.target.files[0].name);
  };
  const setFile2 = evt => {
    setvideoName(evt.target.files[0].name);
  };
  const setFile3 = evt => {
    sethtmlName(evt.target.files[0].name);
  };

  const openUploadDialog1 = () => {
    fileScript.current.click();
  };
  const openUploadDialog2 = () => {
    fileVideo.current.click();
  };
  const openUploadDialog3 = () => {
    fileHtml.current.click();
  };

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
              <Stack direction="row" alignItems="center" spacing={2}>
                <Grid
                  className={classes.uploadInput}
                  container
                  direction="column"
                  justifyContent="space-between"
                >
                  <Box className={classes.box}>
                    <label htmlFor="contained-button-file">
                      <input
                        type="file"
                        ref={fileScript}
                        name="photo"
                        style={{ display: "none" }}
                        onChange={setFile1}
                      />
                      <Button type="button" variant="outlined" onClick={openUploadDialog1}>
                        Upload Script
                      </Button>
                      <span className={classes.title}>
                        {scriptName}
                      </span>
                    </label>
                  </Box>
                  <Box className={classes.box}>
                    <label htmlFor="contained-button-file">
                      <input
                        type="file"
                        ref={fileVideo}
                        name="photo"
                        style={{ display: "none" }}
                        onChange={setFile2}
                      />
                      <Button type="button" variant="outlined" onClick={openUploadDialog2}>
                        Upload Video
                      </Button>
                      <span className={classes.title}>
                        {videoName}
                      </span>
                    </label>
                  </Box>
                  <Box className={classes.box}>
                    <label htmlFor="contained-button-file">
                      <input
                        type="file"
                        ref={fileHtml}
                        name="photo"
                        style={{ display: "none" }}
                        onChange={setFile3}
                      />
                      <Button type="button" variant="outlined" onClick={openUploadDialog3}>
                        Upload HTML
                      </Button>
                      <span className={classes.title}>
                        {htmlName}
                      </span>
                    </label>
                  </Box>
                </Grid>
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
    </div >
  );
}