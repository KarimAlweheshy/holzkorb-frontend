import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const RegistrationPage = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const { request } = useHttp();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registrationHandler = async () => {
    try {
      const data = await request('https://holzkorb.herokuapp.com/auth/register', 'POST', { ...form });
      auth.login(data.token, data.userId);
      //TODO: Check which user type has logged in
      history.push('/welcome-farmer');
    } catch (e) {}
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center">
      <Card>
        <CardContent>
          <Typography>Create your account</Typography>
          <div className={classes.button}>
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              onChange={changeHandler}
            />
            <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              onChange={changeHandler}
            />
          </div>
          <div>
            <TextField
              id="email"
              label="Email"
              name="email"
              onChange={changeHandler}
            />
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              name="password"
              onChange={changeHandler}
            />
          </div>
        </CardContent>
        <CardActions>
          <div className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              onClick={registrationHandler}>
              Register
            </Button>
            <Button variant="contained" onClick={() => history.goBack()}>
              Cancel
            </Button>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
};
