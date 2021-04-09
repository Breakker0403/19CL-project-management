import React from 'react';
import { navigate } from "@reach/router"
import { MaterialUIFormSubmit } from '@modules/FormLogin';
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from '@utils/hooks/useAuth';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#93D5F6',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const auth = useAuth();

  if (auth.isToken()) {
    navigate('/dashboard/deposit-normal');
    return null;
  }

  return (
    <div className={classes.root}>
      <MaterialUIFormSubmit />
    </div>
  )
}

export default LoginPage;