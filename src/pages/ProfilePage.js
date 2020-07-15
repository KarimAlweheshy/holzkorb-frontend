import Grid from "@material-ui/core/Grid";
import {PersonalInfo} from "../components/PersonalInfo";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AddressCard} from "../components/AddressCard";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import {AddNewAddressCard} from "../components/AddNewAddressCard";

export const ProfilePage = () => {

    const [user, setUser] = useState({})
    const {token} = useContext(AuthContext)
    const {loading, request} = useHttp()

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request('https://holzkorb-backend.herokuapp.com/auth/me', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
            console.log(user)
        } catch (e) {
        }
    }, [token, request, user])

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

    return (<Grid>
        <Grid item>
            {user && <PersonalInfo {...user}/>}
        </Grid>
        <Grid container spacing={2} alignItems="stretch">
            {user.addresses && user.addresses.map(addressItem => getAddressCard(addressItem.address))}
            <AddNewAddressCard/>
        </Grid>
    </Grid>)
}