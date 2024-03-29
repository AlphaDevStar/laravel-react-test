import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import PersonIcon from '@material-ui/icons/Person';
import Logo from '../../components/Logo';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
    const onLogOut = () => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        window.location.href = "/login";
    }

    // const onShowProfile = () => {
    //
    //     window.location.href = "/app/account"
    // }

  const classes = useStyles();
  const [notifications] = useState([]);

    let state = localStorage["appState"];
    let AppState = JSON.parse(state);
    let customer_id = AppState.user.id;
    // console.log(AppState);
    // alert(customer_id);

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          {/*<IconButton color="inherit">*/}
          {/*  <Badge*/}
          {/*    badgeContent={notifications.length}*/}
          {/*    color="primary"*/}
          {/*    variant="dot"*/}
          {/*  >*/}
          {/*    <NotificationsIcon />*/}
          {/*  </Badge>*/}
          {/*</IconButton>*/}
            <IconButton color="inherit" href={`/app/user/${customer_id}/edit`}>
                <PersonIcon />
            </IconButton>
            <IconButton color="inherit" onClick={onLogOut}>
                <InputIcon />
            </IconButton>

        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
