import React from 'react';
import {Switch, Route, Redirect, Router} from 'react-router-dom';
import {SearchPage} from './pages/SearchPage';
import {AuthPage} from './pages/AuthPage';
import {RegistrationPage} from './pages/RegistrationPage';
import {RegistrationOkPage} from './pages/RegistrationOkPage';
import WelcomeFarmer from './pages/WelcomeFarmer';
import ManageInventory from './pages/ManageInventory';
import InventoryForm from './pages/InventoryForm';
import {ProfilePage} from './pages/ProfilePage';
import history from './history';
import ProductForm from './pages/ProductForm';
import ManageProduct from './pages/ManageProduct';
import {MainPage} from "./pages/MainPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile" exact component={ProfilePage}/>
                <Route path="/search" exact component={SearchPage}/>
                <Route path="/registrationOk" exact component={RegistrationOkPage}/>
                <Route path="/welcome-farmer" exact component={WelcomeFarmer}/>
                <Route path="/manage-inventory" exact component={ManageInventory}/>
                <Route path="/inventory/:inventoryId" exact component={InventoryForm}/>
                <Route path="/manage-product" exact component={ManageProduct}/>
                <Route path="/product/:productId" exact component={ProductForm}/>
                <Redirect to="/"/>
            </Switch>
        );
    }

    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Route path="/auth" exact>
                    <AuthPage/>
                </Route>
                <Route path="/registration">
                    <RegistrationPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </Router>
    );
};
