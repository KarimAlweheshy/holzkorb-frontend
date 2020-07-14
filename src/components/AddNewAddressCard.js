import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 16,
        justifyContent: 'center'
    },
});

//TODO show chosen address differently
export const AddNewAddressCard = (address) => {
    const classes = useStyles();
    const auth = useAuth(AuthContext)
    const {request} = useHttp()
    const [form, setForm] = useState({
        streetName: '', houseNumber: '', town: '', postalCode: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const addAddressHandler = async () => {
        try {
            const id = auth.userId
            console.log({...form})
            const data = await request('https://holzkorb.herokuapp.com/auth/addAddress', 'POST', {"id": id, "address":{...form}}, {
                    Authorization: `Bearer ${auth.token}`
                }
            )
            console.log(data)
        } catch (e) {

        }
    }

    if (address) {
        return (
            <Grid item component={Card} className={classes.root}>
                <CardContent>
                    <div>
                        <TextField required name="streetName" label="Street" onChange={changeHandler}/>
                    </div>
                    <div>
                        <TextField required name="houseNumber" label="House number" onChange={changeHandler}/>
                    </div>
                    <div>
                        <TextField required name="town" label="Town" onChange={changeHandler}/>
                    </div>
                    <div>
                        <TextField required name="postalCode" label="Postal code" onChange={changeHandler}/>
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="large" onClick={addAddressHandler}>add new</Button>
                </CardActions>
            </Grid>
        );
    }
    return (
        <h1>Empty</h1>
    )
}