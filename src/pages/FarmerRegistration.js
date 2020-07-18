import {useHttp} from "../hooks/http.hook";
import Grid from "@material-ui/core/Grid";
import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    story: {
        display: 'flex',
        margin: theme.spacing(1)
    }
}));
export const FarmerRegistration = () => {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const history = useHistory()
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', password: '', story: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const {request} = useHttp()
    const handleOnClick = async () => {
        try {
            const data = await request('https://holzkorb-backend.herokuapp.com/farmer/register', 'POST', {...form})

            const token = data.token
            const data_id = await request('https://holzkorb-backend.herokuapp.com/farmer/me', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(data_id)
            const id = data_id._id
            auth.login(token, id, "farmer")
            history.push("/welcome-farmer")
        } catch (e) {
            console.log("login error: " + e.message)
        }
    }
    return (
        <Grid container>
            <Grid item xs={2}/>
            <Grid item xs={8}>
                <Card>
                    <form className={classes.root}>
                        <div>
                            <TextField
                                className={classes.margin}
                                variant="outlined"
                                required
                                id="firstName"
                                name="firstName"
                                label="first name"
                                onChange={changeHandler}
                            />
                            <TextField
                                className={classes.margin}
                                variant="outlined"
                                required
                                id="lastName"
                                name="lastName"
                                label="last name"
                                onChange={changeHandler}
                            />

                        </div>
                        <div>

                            <TextField
                                className={classes.margin}
                                variant="outlined"
                                required
                                id="email"
                                name="email"
                                label="email"
                                onChange={changeHandler}
                            />
                            <TextField
                                className={classes.margin}
                                type="password"
                                variant="outlined"
                                required
                                id="password"
                                name="password"
                                label="password"
                                onChange={changeHandler}
                            />

                        </div>
                        <div>
                            <TextField
                                className={classes.story}
                                variant="outlined"
                                required
                                multiline
                                id="story"
                                name="story"
                                label="story"
                                changeHandler
                                onChange={changeHandler}
                            />
                        </div>
                    </form>
                    <Button
                        className={classes.margin}
                        onClick={handleOnClick}
                        variant='outlined'
                    >
                        save
                    </Button>
                </Card>
            </Grid>

            <Grid item xs={2}/>
        </Grid>
    )
}