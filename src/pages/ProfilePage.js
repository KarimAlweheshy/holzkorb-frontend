import Grid from "@material-ui/core/Grid";
import {PersonalInfo} from "../components/PersonalInfo";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AddressCard} from "../components/AddressCard";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import {AddNewAddressCard} from "../components/AddNewAddressCard";
import {OrderCard} from "../components/OrderCard";

export const ProfilePage = () => {

    const [user, setUser] = useState({})
    const {token} = useContext(AuthContext)
    const {loading, request} = useHttp()

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request('/auth/me', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
            console.log(user)
        } catch (e) {
        }
    }, [token, request])

    const getAddressCard = address => {
        return (
            <Grid item sx={12} display='flex'>
                <AddressCard {...address}/>
            </Grid>
        )
    }

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    if (loading) {
        return <Loader/>
    }

    return (<Grid container>
        <Grid item xs={1}/>
        <Grid container xs={10} >
            <Grid container xs={12} md={4} spacing={2} aria-orientation={"vertical"}>
                <Grid item>
                    {user && <PersonalInfo {...user}/>}
                </Grid>
            </Grid>
            <Grid container xs={12} md={4} spacing={2} alignItems="stretch" aria-orientation={"vertical"}>
                {user.addresses && user.addresses.map(addressItem => getAddressCard(addressItem.address))}
                <AddNewAddressCard/>
            </Grid>
            <Grid container xs={12} md={4} alignItems="stretch" aria-orientation={"vertical"}>
                <OrderCard/>
            </Grid>
        </Grid>
        <Grid item xs={1}/>
    </Grid>)
}