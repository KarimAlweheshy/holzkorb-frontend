import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Grid from "@material-ui/core/Grid";
import {AddressCard} from "../components/AddressCard";
import {AddNewAddressCard} from "../components/AddNewAddressCard";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {ItemCard} from "../components/ItemCard";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import {uniq} from "autoprefixer";

const useStyles = makeStyles((theme) => ({
    filters: {
        margin: 16,
        padding: 16
    },
    select: {
        // padding: 4
        // minWidth: "inherit"
    }
}));

export const SearchPage = () => {
    const classes = useStyles()
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [items, setItems] = useState([])
    const [order, setOrder] = useState('date')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000000)
    const [names, setNames] = useState([])
    const [selected, setSelected] = useState([])

    const orderOptions = [
        {
            value: 'date',
            label: 'recent first'
        },
        {
            value: 'lowPrice',
            label: 'low price first'
        },
        {
            value: 'highPrice',
            label: 'high price first'
        }
    ]

    const unique = (list) => {
        let sorted = list.sort()
        let uniq = []
        for (let i = 0; i < sorted.length - 1; i++) {
            console.log(sorted[i])
            if (sorted[i] !== sorted[i + 1])  {
                uniq.push(sorted[i])
            }
        }
        uniq.push(sorted[sorted.length - 1])
        return uniq
    }
    const fetchItems = useCallback(async () => {
        try {
            const data = await request('/inventory/all', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setItems(data)
            setNames(unique(data.map(item => item.name ? item.name : "no name")))
            setSelected(unique(data.map(item => item.name ? item.name : "no name")))
            // console.log(data.map(item => item.name ? item.name : "no name"))
        } catch (e) {

        }
    }, [request, auth, items])


    const sortByDate = (a, b) => {
        return Date.parse(a.startDate) - Date.parse(b.startDate)
    }

    const sortByHighPrice = (a, b) => {
        return b.pricePerUnit - a.pricePerUnit
    }

    const sortByLowPrice = (a, b) => {
        return a.pricePerUnit - b.pricePerUnit
    }

    const getItemCard = item => {
        return (
            <Grid className={classes.root}>
                <ItemCard {...item}/>
            </Grid>
        )
    }

    const handleNewOrder = event => {
        setOrder(event.target.value)
    }
    useEffect(() => {
        fetchItems()
        setItems(items.sort(sortByHighPrice))
    }, [])

    const updateMaxPrice = (event) => {
        setMaxPrice(event.target.value)
    }

    const updateMinPrice = (event) => {
        setMinPrice(event.target.value)
        console.log(event.target.value)
    }

    const handleCheckChange = (event) => {
        if (event.target.checked) {
            console.log(selected)
            setSelected(selected.concat(event.target.name))
            console.log(selected)
        } else {
            console.log(event.target.name)
            setSelected(selected.filter(item => item !== event.target.name))
            console.log(selected)
        }
    }

    const getCheckBox = (item) => {
        return (
            <FormControlLabel
                // labelPlacement="start"
                label={item}
                control={<Checkbox checked={selected.indexOf(item) > -1} name={item} onChange={handleCheckChange}/>}
                />
        )
    }

    const handleFilter = (item) => {
        // console.log(item.name)
        // console.log(selected)
        return item.pricePerUnit > minPrice && item.pricePerUnit < maxPrice && selected.indexOf(item.name) > -1
    }

    return (
        <Grid container spacing={2} alignItems="stretch" aria-orientation="horizontal" className={classes.test}>
            <Grid item xs={2}>
                <Card className={classes.filters}>
                    <Typography component="h2">
                        Price
                    </Typography>
                    <div component="h2">
                        {/*<TextField size="2"/>*/}
                        <input size="2" placeholder="from" onChange={updateMinPrice}/>
                        <input size="2" placeholder="to" onChange={updateMaxPrice}/>
                    </div>
                    <Typography component="h2">
                        Order
                    </Typography>

                    <TextField className={classes.select} select selectedIndex={orderOptions}
                               onChange={handleNewOrder}
                               defaultValue={"date"}

                               component="h2"
                    >
                        {orderOptions.map(option =>
                            <MenuItem value={option.value}>
                                {option.label}
                            </MenuItem>
                        )}
                    </TextField>
                    <FormGroup >
                        {names.map(name => getCheckBox(name))}
                    </FormGroup>
                </Card>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={8}>
                <Grid container>
                    {items.length > 0 &&
                    order === 'date' &&
                    items.filter(item => handleFilter(item)).sort(sortByDate).map(item => getItemCard(item))
                    }
                    {items.length > 0 &&
                    order === 'lowPrice' &&
                    items.filter(item => item.pricePerUnit > minPrice && item.pricePerUnit < maxPrice).sort(sortByLowPrice).map(item => getItemCard(item))
                    }
                    {items.length > 0 &&
                    order === 'highPrice' &&
                    items.filter(item => item.pricePerUnit > minPrice && item.pricePerUnit < maxPrice).sort(sortByHighPrice).map(item => getItemCard(item))
                    }
                </Grid>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    )
}