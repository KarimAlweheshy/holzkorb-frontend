import React, {useCallback, useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 16,
        marginLeft: 16

        // display: "flex",
        // direction: 'column'
        // flexDirection: "column",
        // justifyContent: "space-between"
    },
    content: {
        display: 'flex'
    },
    details: {
        display: 'flex',
        // flexDirection: 'column',
    },
    actions: {
        direction: 'column'

    },
    cardMedia: {
        width: "auto"
    }
});

//TODO show chosen address differently
export const ItemCard = (item) => {
    console.log(item)
    const classes = useStyles();
    const {request} = useHttp()
    const [product, setProduct] = useState(null)
    const [imgSrc, setImgSrc] = useState(require('../assets/img/egyptian-farmer.jpg'))
    const auth = useContext(AuthContext)

    const fetchProduct = useCallback(async () => {
        try {
            const product_data = await request(`/products/${item.productId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setProduct(product_data)
            if (product_data.imgSrc) {
                setImgSrc(product_data.imgSrc)
            }
        } catch (e) {

        }
    })

    useEffect(() => {
        fetchProduct()
    }, [])
    if (item) {
        return (
            <Card className={classes.root}>
                <div className={classes.content}>
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    src={imgSrc}
                    // onClick={changeImageHandler}
                />
                <CardContent>
                    <Typography variant="h4" component="h2">
                        {item.name}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        {product && product.subtitle}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {item.pricePerUnit}€ per kg
                    </Typography>
                    <Typography className={classes.pos} variant="h8" color="textSecondary">
                        available from {item.startDate.substr(0,10)}
                    </Typography>

                </CardContent>
                </div>

                <CardActions>
                    <Button>add</Button>
                    <Button>more from farmer</Button>
                </CardActions>
            </Card>
        );
    }
    return (
        <h1>Empty</h1>
    )
}