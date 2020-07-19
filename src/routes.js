import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { AuthPage } from './pages/AuthPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RegistrationOkPage } from './pages/RegistrationOkPage';
import WelcomeFarmer from './pages/WelcomeFarmer';
import ManageInventory from './pages/ManageInventory';
import InventoryForm from './pages/InventoryForm';
import { ProfilePage } from './pages/ProfilePage';
import history from './history';
import ProductForm from './pages/ProductForm';
import ManageProduct from './pages/ManageProduct';
import { MainPage } from './pages/MainPage';
import { FarmerRegistration } from './pages/FarmerRegistration';
import CategoryView from './pages/CategoryView';
import {FarmerAuthPage} from './pages/FarmerAuthPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/registrationOk" exact component={RegistrationOkPage} />
        <Route path="/welcome-farmer" exact component={WelcomeFarmer} />
        <Route path="/manage-inventory" exact component={ManageInventory} />
        <Route path="/inventory/:inventoryId" exact component={InventoryForm} />
        <Route path="/manage-product" exact component={ManageProduct} />
        <Route path="/product/:productId" exact component={ProductForm} />
        <Route path="/shop" exact>
          <CategoryView
            title="All Products"
            addToCart={() => console.log('add to cart')}
            cart={[]}
            removeFromCart={() => console.log('remove from cart')}
          />
        </Route>
        <Route path="/login" exact component={AuthPage} />
        <Route path="/registration" exact>
          <RegistrationPage />
        </Route>
        <Route path="/farmer-registration" exact>
          <FarmerRegistration />
        </Route>
        <Redirect to="/welcome-farmer" />
      </Switch>
    );
  }

  return (
    <Router history={history}>
      <Switch>
          <Route path="/" exact component={<MainPage/>}/>
          <Route path="/auth" exact component={<AuthPage/>}/>
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/registrationOk" exact component={RegistrationOkPage} />
        <Route path="/welcome-farmer" exact component={WelcomeFarmer} />
        <Route path="/manage-inventory" exact component={ManageInventory} />
        <Route path="/inventory/:inventoryId" exact component={InventoryForm} />
        <Route path="/manage-product" exact component={ManageProduct} />
        <Route path="/product/:productId" exact component={ProductForm} />
        <Route path="/shop" exact>
          <CategoryView
            title="All Products"
            addToCart={() => console.log('add to cart')}
            cart={[]}
            removeFromCart={() => console.log('remove from cart')}
          />
        </Route>
        <Route path="/registration" exact>
          <RegistrationPage />
        </Route>
        <Route path="/farmer-registration" exact>
          <FarmerRegistration />
        </Route>

        <Redirect to="/shop" />
      </Switch>
    </Router>
  );
};
