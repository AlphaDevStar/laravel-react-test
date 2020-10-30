import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FacebookIcon from '../../icons/Facebook';
import GoogleIcon from '../../icons/Google';
import Page from '../../components/Page';
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const formSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
});

const LoginView = () => {

    let state_of_state = localStorage["appState"];
    if(!state_of_state) {
        let appState = {
            isLoggedIn: false,
            user: {}
        }
        localStorage["appState"] = JSON.stringify(appState);
    }

    let state = localStorage["appState"];
    let AppState = JSON.parse(state);

    const Auth = {
        isLoggedIn: AppState.isLoggedIn,
        user: AppState.user
    }

    if (Auth.isLoggedIn)
    {
        window.location.href = "/app/dashboard";
    }

  const classes = useStyles();
  const navigate = useNavigate();

    const handleOnSubmit = (values, actions) => {

        axios.post("/api/auth/login", values).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let userData = {
                    id: json.data.id,
                    name: json.data.name,
                    email: json.data.email,
                    access_token: json.data.access_token,
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                localStorage["appState"] = JSON.stringify(appState);
                window.location.href = "/app/dashboard";
            }
            else {
                actions.setSubmitting(false);
                actions.resetForm();

                swal("Login Failed!", json.data.message, "error");
                //alert(json.data.message);
            }
        }).catch(error => {
            swal("Server Error!", "Connection is failed", "error");
            // alert("catch");
            actions.setSubmitting(false);
            //values.isSubmitting = false;

            if (error.response) {

            }
            else if (error.request) {

            } else {

            }
        }).finally(this.setState({error: ''}));

    };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={formSchema}
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
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
