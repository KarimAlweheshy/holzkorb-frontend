import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import {useHttp} from '../hooks/http.hook';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export const Navbar = (isAuthenticated) => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const history = useHistory();
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogIn = () => {
        history.push('/auth')
        history.go()
        handleMenuClose()
    }
    const handleLogout = (event) => {
        try {
            event.preventDefault();
            auth.logout();
            handleMenuClose();
            history.push('/');
            request(
                'https://holzkorb-backend.herokuapp.com/auth/logout',
                'DELETE',
                null,
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            );
        } catch (e) {
            console.log('FAILED LOGOUT');
        }
    };

    const handleProfile = () => {
        history.push('/profile');
        handleMenuClose();
    };

    const menuId = 'menu-id';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            {auth.isAuthenticated && (
                <div>
                    <MenuItem
                        onClick={() => {
                            history.push('/manage-inventory');
                            handleMenuClose();
                        }}>
                        Manage Inventory
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            history.push('/manage-product');
                            handleMenuClose();
                        }}>
                        Manage Products
                    </MenuItem>
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </div>
            )}
            {!auth.isAuthenticated && (
                <div>
                    <MenuItem onClick={handleLogIn}>Log in</MenuItem>
                </div>
            )}
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}
                                onClick={() => {
                                    history.push('/')
                                    history.go()
                                }
                                }
                    >
                        Holzkorb
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="show more"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            color="inherit">
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
};
