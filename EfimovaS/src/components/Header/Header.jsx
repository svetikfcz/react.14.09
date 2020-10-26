import React from 'react';
import cn from 'classnames';
import { AppBar, makeStyles, Toolbar, IconButton, Typography, Badge, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector } from 'react-redux';
import { getFullName, getAvatar } from '../../selectors/profileSelectors';

const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      menuButtonHidden: {
        display: 'none',
      },
      title: {
        flexGrow: 1,
        marginLeft: theme.spacing(1),
      },
}));

const Header = () => {
    const classes = useStyles();
    const fullName = useSelector(getFullName);
    const avatar = useSelector(getAvatar);

    return (
        <AppBar position="absolute" className={cn(classes.appBar, classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    className={cn(classes.menuButton, open && classes.menuButtonHidden,)}
                >
                    <MenuIcon />
                </IconButton>
                <Avatar src={avatar} alt={fullName} />
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                {`${fullName}'s chats`}
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header
