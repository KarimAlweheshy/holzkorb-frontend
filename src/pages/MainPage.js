import React, {useContext} from 'react'
import Carousel from "react-material-ui-carousel";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop:20
    },
    media: {
        height: 720,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

function Item(props) {
    const classes = useStyles();
    const handleClick = () => {
        console.log("CLICK")
    }
    return (
        <Grid>
            <Card>
                <CardMedia
                    className={classes.media}
                    component="img"
                    image={props.props}
                    title="me"
                    onClick={handleClick}
                >

                </CardMedia>
            </Card>
        </Grid>
    )
}

export const MainPage = () => {
    const classes = useStyles();
    function importAll(r) {
        return r.keys().map(r);
    }
    var listOfImages = importAll(require.context('../assets/img/main-page', false, /\.(png|jpe?g|svg)$/));
    return (
        <Grid className={classes.root} container>
            <Grid item xs={2}/>
            <Grid item xs={8}>
                <Carousel>
                    {
                        listOfImages.map((src) => <Item props={src}/>)
                    }
                </Carousel>
            </Grid>
            <Grid item xs={2}/>
        </Grid>
    )
}