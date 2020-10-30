import React, { useState } from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {

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

    if (!Auth.isLoggedIn)
    {
        swal("Login Failed!", "Please Login.", "error");
        window.location.href = "/login";
        // const navigate = useNavigate();
        // navigate('/login', { replace: true });
    }

    const classes = useStyles();
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <div className={classes.root}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <NavBar
                onMobileClose={() => setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
            />
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <div className={classes.content}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
      );
};

export default DashboardLayout;
