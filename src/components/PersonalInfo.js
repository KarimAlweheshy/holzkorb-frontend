import Grid from "@material-ui/core/Grid";
import React, {useCallback, useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/AuthContext";
import {DropzoneDialog} from "material-ui-dropzone";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    info: {
        flexDirection: 'column',
        margin: 16
    },
    cardMedia: {
        maxHeight: 274,
        maxWidth: 274,
        borderRadius: '100%',
        margin: '28px'
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        width: 200,
    },
})

export const PersonalInfo = (user) => {
    const classes = useStyles()
    const {request} = useHttp()
    const auth = useAuth(AuthContext)
    const [form, setForm] = useState({
        firstName: '', lastName: ''
    })
    const [imgSrc, setImgSrc] = useState(require("../assets/img/anonymous_avatar.png"))
    const [isChanged, setIsChanged] = useState(false)
    const [open, setOpen] = useState(false)

    const changeImageHandler = () => {
        setOpen(true)
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
        setIsChanged(true)
    }

    const saveUserDataHandler = async () => {
        try {

            const id = auth.userId
            // console.log("id", auth.)
            if (imgSrc != user.profileImageUrl) {
                const data = await request('/auth/updateProfileImage', 'POST', {"id": id, "url": imgSrc}, {
                    Authorization: `Bearer ${auth.token}`
                })
            }
            const firstName = form.firstName === '' ? user.firstName : form.firstName
            const lastName = form.lastName === '' ? user.lastName : form.lastName

            const data = await request('/auth/updateProfileInfo', 'POST', {
                "id": id,
                'firstName': firstName,
                'lastName': lastName
            }, {
                Authorization: `Bearer ${auth.token}`
            })
            setIsChanged(false)
        } catch (e) {
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = async (files) => {
        //Saving files to state for further use and closing Modal.
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'holzkorb')
        // setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/ddeooakzt/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImgSrc(file.secure_url)
        setIsChanged(true)

        setOpen(false)
    }

    const fetchUserInfo = useCallback(async () => {
        if (user.profileImageUrl) {
            setImgSrc(user.profileImageUrl)
        }
        // setForm({"firstName": user.firstName, "lastName": user.lastName})
    })

    useEffect(() => {
        fetchUserInfo()
    },)

    return (
        <Grid item component={Card} className={classes.root}>
            <CardMedia
                className={classes.cardMedia}
                component="img"
                src={imgSrc}
                onClick={changeImageHandler}
            />
            <CardContent className={classes.info}>
                <Typography variant={"subtitle1"}>first name</Typography>
                <input id="firstName" name="firstName" defaultValue={user.firstName} onChange={changeHandler}/>
                <Typography variant={"subtitle1"}>last name</Typography>
                <input id="lastName" name="lastName" defaultValue={user.lastName} onChange={changeHandler}/>
            </CardContent>
            <CardActions>
                {isChanged &&
                <Button
                    variant={"contained"}
                    size="large"
                    onClick={saveUserDataHandler}
                    color={"primary"}>
                    save
                </Button>
                }
                <DropzoneDialog
                    open={open}
                    onSave={handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={handleClose}
                />
            </CardActions>
        </Grid>
    )
}