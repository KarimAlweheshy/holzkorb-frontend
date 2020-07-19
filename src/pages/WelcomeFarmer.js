import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import EditIcon from '@material-ui/icons/Edit';
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import {DropzoneDialog} from "material-ui-dropzone";
import CardActions from "@material-ui/core/CardActions";

const WelcomeFarmer = () => {
    const [farmer, setFarmer] = useState({})
    const [edit, setEdit] = useState(false)
    const {token} = useContext(AuthContext)
    const {loading, request} = useHttp()
    const [numProducts, setNumProducts] = useState(0)
    const [imgSrc, setImgSrc] = useState(require("../assets/img/anonymous_avatar.png"))
    const [open, setOpen] = useState(false)

    const fetchFarmer = useCallback(async () => {
        try {
            const fetched = await request('/farmer/me', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setFarmer(fetched)
            const products = await request('/products', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setNumProducts(products.length)
            setImgSrc(fetched.imageUrl)
        } catch (e) {
        }
    }, [token, request])

    const handleEdit = () => {
        setEdit(true)
    }

    const changeImageHandler = () => {
        if (edit) {
            setOpen(true)
        }
    }

    const updateFarmer = event => {
        setFarmer({...farmer, [event.target.name]: event.target.value})
    }

    const handleSave = async () => {
        try {
            const fetched = await request('/farmer/update', 'POST', {...farmer, imageUrl: imgSrc}, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {

        }
        setEdit(false)
    }

    const handleSaveImage = async (files) => {
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

        setOpen(false)
    }

    useEffect(() => {
        fetchFarmer()
    }, [fetchFarmer])

    if (loading) {
        return <Loader/>
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <main className="profile-page">
            <section className="relative block" style={{height: '500px'}}>
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1545300329-e785e923ed45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80')",
                    }}>
          <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                    style={{height: '70px', transform: 'translateZ(0)'}}>
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0">
                        <polygon
                            className="text-gray-300 fill-current"
                            points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section className="relative py-16 bg-gray-300">
                <div className="container mx-auto px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={imgSrc}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                            style={{maxWidth: '150px'}}
                                            onClick={changeImageHandler}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="pt-6 px-3 mt-24 sm:mt-0">
                                        <div className="lg:mr-4 text-right mb-4">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        220 KM
                      </span>
                                            <span className="text-sm text-gray-500">
                        <i className="fa fa-globe mr-2 text-lg text-gray-500"></i>{' '}
                                                away from you
                      </span>
                                        </div>
                                        <Link to="/manage-inventory">
                                            <button
                                                className="bg-blue-400 active:bg-blue-600 focus:bg-blue-600 hover:bg-blue-500 uppercase text-blue-800 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 flex items-center ml-auto"
                                                type="button"
                                                style={{transition: 'all .15s ease'}}>
                                                <i className="fa fa-unlock-alt mr-2 text-lg text-currentColor"></i>{' '}
                                                Manage Inventory
                                            </button>
                                        </Link>
                                        <Link to="/manage-product">
                                            <button
                                                className="bg-blue-400 active:bg-blue-600 focus:bg-blue-600 hover:bg-blue-500 uppercase text-blue-800 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 flex items-center ml-auto"
                                                type="button"
                                                style={{transition: 'all .15s ease'}}>
                                                <i className="fa fa-unlock-alt mr-2 text-lg text-currentColor"></i>{' '}
                                                Manage Products Master Data
                                            </button>
                                        </Link>

                                        <div className='text-right'>
                                            {!edit && <EditIcon color="action" onClick={handleEdit}/>}
                                            {edit && <SaveIcon color="action" onClick={handleSave}/>}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-start py-4 lg:pt-4">
                                        <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        {numProducts}
                      </span>
                                            <span className="text-sm text-gray-500">Products</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        89
                      </span>
                                            <span className="text-sm text-gray-500">Orders</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                {!edit && <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                    Welcome, {farmer.firstName} {farmer.lastName}
                                </h3>}
                                {edit &&
                                <div>
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                        Welcome,
                                    </h3>
                                    <div>
                                        <TextField
                                            name="firstName"
                                            label="first name"
                                            defaultValue={farmer.firstName}
                                            onChange={updateFarmer}/>
                                    </div>
                                    <div>
                                        <TextField
                                            name="lastName"
                                            label="last name"
                                            defaultValue={farmer.lastName}
                                            onChange={updateFarmer}/>
                                    </div>
                                </div>
                                }
                                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                    <i className="fa fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{' '}
                                    Liverpool, UK
                                </div>
                                <div className="mb-2 text-gray-700 mt-10">
                                    <i className="fa fa-pagelines mr-2 text-lg text-green-500"></i>
                                    Fresh Lefy Greens directly from the farm
                                </div>
                                <div className="mb-2 text-gray-700">
                                    <i className="fa fa-leaf mr-2 text-lg text-green-500"></i>
                                    Our mission is to deliver high-speed products to you in EU
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                                            {!edit &&
                                            <pre>{farmer.story}</pre>
                                            }
                                            {edit &&
                                            <TextField
                                                name="story"
                                                label="your story"
                                                fullWidth
                                                multiline
                                                autoFocus
                                                variant="outlined"
                                                defaultValue={farmer.story}
                                                onChange={updateFarmer}/>
                                            }
                                        </p>
                                        <a
                                            className="font-normal text-pink-500"
                                            onClick={(e) => e.preventDefault()}>
                                            Show more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DropzoneDialog
                    open={open}
                    onSave={handleSaveImage}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={handleClose}
                />
            </section>
        </main>
    );
};
export default WelcomeFarmer;
