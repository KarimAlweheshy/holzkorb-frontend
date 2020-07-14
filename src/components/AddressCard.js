import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

//TODO show chosen address differently
export const AddressCard = (address) => {
    const classes = useStyles();

    if (address) {
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {address.streetName} {address.houseNumber}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {address.postalCode} {address.town}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">set as default</Button>
                    <Button size="small">delete</Button>
                </CardActions>
            </Card>
        );
    }
    return (
        <h1>Empty</h1>
    )
}