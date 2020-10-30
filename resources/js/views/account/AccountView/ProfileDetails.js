import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from "axios";
import * as Yup from "yup";
import {Formik} from "formik";

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, id, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
        id:id,
        name: '',
        email: '',
        password: ''
  });

    useEffect(() => {
        if (Number(values.id) !== 0)
        {
            axios.post('/api/auth/user/show', {id: values.id})
                .then(response => {
                    return response;
                }).then(json => {

                setValues(
                    {...values, name:json.data.name, email:json.data.email});
                //
            });

        }

    }, []);

    console.log(values);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

    const handleOnSubmit = (values, actions) => {
        console.log(values);
        axios.post("/api/auth/user/save", {...values}).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                window.location.href = "/app/customers";
            }
            else {
                //actions.setSubmitting(false);
                swal("Save Failed!", json.data.message, "error");
            }
        }).catch(error => {
          swal("Server Error!", "Connection is failed", "error");
            //actions.setSubmitting(false);
            //values.isSubmitting = false;

            if (error.response) {

            }
            else if (error.request) {

            } else {

            }
        }).finally();
    };

  return (

      <Formik
          initialValues={{
              email: values.email,
              name: values.name,
              password: '',
              id:values.id
          }}
          enableReinitialize={true}
          validationSchema={
              Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  name: Yup.string().max(255).required('Name is required'),
                  password:  Number(values.id) === 0? Yup.string().max(255).required('password is required'):''
              })
          }
          onSubmit={handleOnSubmit}
      >
          {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
            }) => (
    <form
        onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  onBlur={handleBlur}

                fullWidth
                label="Full name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
                <TextField
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    type="email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                />
            </Grid>
              <Grid
                  item
                  md={4}
                  xs={12}
              >
                  <TextField
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      onBlur={handleBlur}
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      required={Number(values.id) === 0}

                      value={values.password}
                      variant="outlined"
                  />
              </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            //onClick={handleOnSubmit}
            disabled={isSubmitting}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
          )}
      </Formik>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
