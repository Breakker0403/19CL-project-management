import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from "@reach/router";
import LoginPage from "../../pages/Login";
import routes from '../../routesNavbar';
import { useAuth } from "../../utils/hooks/useAuth";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: `url('../appbar.png') no-repeat right #19a0db`,
    backgroundSize: '100% 100%',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      height: '46px',
    },
  },
  toolBar: {
    minHeight: '46px',
  },
  heightContent: {
    minHeight: '46px',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },
  listItemIcon: {
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'inline-flex',
    minWidth: '26px',
    flexShrink: 0,
  },
  listItemIconSVG: {
    fontSize: '0.8rem',
    fill: '#000',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: 0,
    userSelect: 'none',
    marginTop: '-1px',
  },
  listItemText: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '0.00938em',
  },
  listItem: {
    color: '#42526e',
    backgroundColor: '#fff',
    paddingLeft: '20px',
    paddingTop: '20px',
    paddingBottom: '20px',
    width: '100%',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textDecoration: 'none',
    outline: 0,
  },
  listItemActive: {
    color: '#0052cc',
    backgroundColor: '#ebecf0',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // overflowX: 'hidden',
    position: 'relative',
  },
}));

const Dash = props => {
  const { window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const auth = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Link to="/dashboard" className={classes.logo}>
        <img src="/logo.png" alt="logo" width="209" />
      </Link>
      <List>
        { routes.map((route, index) => {
          if (route.path !== '/') {
            return undefined;
          }

          const routeList = route.children.map((children, index) => {
            return (
              <ListItem button component={Link} to={children.path} key={children.path} getProps={({ isCurrent }) => {
                // the object returned here is passed to the
                // anchor element's props
                return {
                  // style: {
                  //   color: isCurrent ? "#0052cc" : "#42526e",
                  //   backgroundColor: isCurrent ? '#ebecf0' : '#fff',
                  //   paddingTop: '20px',
                  //   paddingBottom: '20px',
                  // },
                  className: isCurrent ? `${classes.listItem} ${classes.listItemActive}` : classes.listItem
                };
              }}>
                <ListItemIcon className={classes.listItemIcon}>
                  <RadioButtonUncheckedIcon className={classes.listItemIconSVG} />
                </ListItemIcon>
                <span className={classes.listItemText}>{children.name}</span>
              </ListItem>
            )
          })

          return routeList;
        })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    auth.isToken() ? (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Hidden smUp implementation="css">
              <Typography variant="h6" noWrap>
                Vietinbank
              </Typography>
            </Hidden>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.heightContent} />
          { children }
        </main>
      </div>
    ) : (
      <LoginPage anyProp="Is not Authenticated..." />
    )
  )
};

Dash.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dash;
