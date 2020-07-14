import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";


const InventoryForm = ({
  match: {
    params: { inventoryId },
  },
  history
}) => {
  useEffect(() => window.localStorage.setItem('isLoading', 0), [])
  const {token} = useContext(AuthContext)
  const isCreate = inventoryId === 'create';
  const [productToEdit, setProductToEdit] = useState({})
  
  const initialState = {
    productId: '',
    totalUnitsCount: '',
    pricePerUnit: '',
    minUnitsPerOrder: '',
    startDate: null,
    endDate: null,
  }
  const [product, setProduct] = useState(isCreate ? initialState.product : productToEdit.productId);
  const [stock, setStock] = useState(isCreate ? initialState.stock : productToEdit.totalUnitsCount);
  const [price, setPrice] = useState(isCreate ? initialState.price : productToEdit.pricePerUnit);
  const [minOrder, setMinOrder] = useState(isCreate ? initialState.minOrder : productToEdit.minUnitsPerOrder);
  const [startDate, setFromDate] = useState(isCreate ? initialState.startDate : productToEdit.startDate);
  const [endDate, setToDate] = useState(isCreate ? initialState.endDate : productToEdit.endDate);
  useEffect(() => fetch(`https://holzkorb-backend.herokuapp.com/inventory/${inventoryId}`).then(res => res.json()).then(inventory => {
    setProduct(inventory.productId)
    setStock(inventory.totalUnitsCount)
    setPrice(inventory.pricePerUnit)
    setMinOrder(inventory.minUnitsPerOrder)
    setFromDate(inventory.startDate)
    setToDate(inventory.endDate)
  }), [inventoryId])
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://holzkorb-backend.herokuapp.com/inventory${!isCreate && `/${inventoryId}`}`, {
      method: isCreate ? 'POST' : 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,                                    
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        totalUnitsCount: stock,
        pricePerUnit: price,
        minUnitsPerOrder: minOrder,
        startDate,
        endDate,
        orderUnit: 'KG',
      }),
    }).then(res => {
      window.localStorage.setItem('isLoading', 1)
      history.push('/manage-inventory')
    }).catch((e) => console.error(e));
  };
  return (
    <main className="inventory-form">
      <div className="container mx-auto px-4 sm:px-8 rounded overflow-hidden shadow-lg mt-12 py-8 border lg:w-3/5 w-full">
        <h2 className="text-2xl font-semibold leading-tight mb-8 text-green-600">
          {isCreate
            ? 'Create new Inventory Item'
            : `Edit Inventory for ${inventoryId}`}
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password">
                Product
              </label>
              <div className="relative w-full md:w-1/2">
                <select
                  onChange={(e) => setProduct(e.target.value)}
                  required
                  value={product}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Choose a product</option>
                  <option value="1">Valencia Orange</option>
                  <option value="2">Moroccan Olives</option>
                  <option value="3">Strawberries</option>
                  <option value="4">Pomengrate</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-xs italic mt-2">
                Wanna leave some notes here for the user ?
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-stock">
                Available Amount (in Kilograms)
              </label>
              <input
                onChange={(e) => setStock(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-stock"
                type="number"
                placeholder="500"
                min="1"
                required
                value={stock}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-min-order">
                Min. Order (in Kilograms)
              </label>
              <input
                onChange={(e) => setMinOrder(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-min-order"
                type="number"
                placeholder="10"
                min="1"
                required
                value={minOrder}
              />
              {/*<p className="text-red-500 text-xs italic">
                Please fill out this field.
          </p>*/}
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-price">
                Price in Euros
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-price"
                type="number"
                step=".01"
                min="1"
                placeholder="4.50"
                required
                value={price}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-from-date">
                Available From
              </label>
              <input
                onChange={(e) => setFromDate(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-from-date"
                type="date"
                required
                value={startDate}
                placeholder="20-06-2020"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-from-date">
                Available To (optional)
              </label>
              <input
                onChange={(e) => setToDate(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-from-date"
                type="date"
                value={endDate}
                placeholder="20-09-2020"
              />
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-400 text-white text-2xl font-bold py-6 px-24 border-b-4 border-green-700 hover:border-green-500 rounded">
            {isCreate ? 'Save & Create' : 'Save & Update'}
          </button>
        </form>
      </div>
    </main>
  );
};
export default InventoryForm;
