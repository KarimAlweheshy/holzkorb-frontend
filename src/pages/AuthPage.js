import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import {useHttp} from "../hooks/http.hook";
import {useHistory} from 'react-router-dom'
import {useAuth} from "../hooks/auth.hook";

const useStyles = makeStyles((theme) => ({
    button: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))

export const AuthPage = () => {
    const { login}= useAuth()
    const history = useHistory()
    const classes = useStyles()
    const {request} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data_token = await request('https://holzkorb-backend.herokuapp.com/auth/login', 'POST', {...form})
            const token = data_token.token
            const data_id = await request('https://holzkorb-backend.herokuapp.com/auth/me', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            const id = data_id._id
            login(token, id)
            history.push("/search")
        } catch (e) {
            console.log("login error: " + e.message)
        }
    }

    return (
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center">
            <Card>
                <CardContent>
                    <Typography>
                        Sign in to your account
                    </Typography>
                    <div>
                        <TextField id="email" label="Email" name="email" onChange={changeHandler}/>
                    </div>
                    <div>
                        <TextField id="password" label="Password" name="password" onChange={changeHandler}/>
                    </div>

                </CardContent>
                <CardActions>
                    <div className={classes.button}>
                        <Button variant="contained" color="primary" onClick={loginHandler}>Sign in</Button>
                        <Button variant="contained" onClick={()=> history.push('/registration')}>Sign up</Button>
                    </div>
                </CardActions>
            </Card>
        </Grid>
    )
}