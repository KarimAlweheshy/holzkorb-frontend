import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
})

export const PersonalInfo = (user) => {
    const classes = useStyles()
    console.log(user)
    return (<Grid item component={Card} className={classes.root}>
            <Typography>{user.firstName}</Typography>
            <Typography>{user.lastName}</Typography>
            <Typography>{user.email}</Typography>
        </Grid>
    )
}