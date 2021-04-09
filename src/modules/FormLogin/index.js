import React, { useReducer } from "react";
import { navigate } from '@reach/router';
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from '../../utils/hooks/useAuth';

const useStyles = makeStyles(theme => ({
  button: {
    margin: '16px 8px',
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: '410px',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 21, 0.15)',
  },
  title: {
    marginBottom: '20px',
    marginLeft: '6px',
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: 400
  }
}));

export function MaterialUIFormSubmit(props) {
  const classes = useStyles();
  const auth = useAuth();

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      login: "",
      password: ""
    }
  );

  const handleSubmit = evt => {
    evt.preventDefault();

    let { login, password } = formInput;

    return auth.signin(login, password).then(res => {
      navigate('/dashboard');
    }).catch(err => {
      console.log('error', err)
    });
  };

  const handleInput = evt => {
    const password = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [password]: newValue });
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3" className={classes.title}>
          Đăng nhập
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            id="margin-normal"
            name="login"
            defaultValue={formInput.login}
            className={classes.textField}
            helperText="vd: name@email.com"
            onChange={handleInput}
          />
          <TextField
            label="Password"
            id="margin-normal"
            name="password"
            type="password"
            defaultValue={formInput.email}
            className={classes.textField}
            helperText="Nhập mật khẩu"
            onChange={handleInput}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Đăng nhập <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </Paper>
    </div>
  );
}
