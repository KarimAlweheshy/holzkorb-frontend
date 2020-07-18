import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useAuth} from "../hooks/auth.hook";

const ProductForm = ({
  match: {
    params: { productId },
  },
  history,
}) => {
  useEffect(() => window.localStorage.setItem('isLoading', 0), []);
  const { token } = useContext(AuthContext);
  const isCreate = productId === 'create';
  const [productToEdit, setProductToEdit] = useState({});
  const auth = useAuth()

  const initialState = {
    name: '',
    subtitle: '',
    description: '',
  };
  const [name, setName] = useState(
    isCreate ? initialState.name : productToEdit.name
  );
  const [subtitle, setSubtitle] = useState(
    isCreate ? initialState.subtitle : productToEdit.subtitle
  );
  const [description, setDescription] = useState(
    isCreate ? initialState.description : productToEdit.description
  );
  useEffect(() => {
    !isCreate &&
      fetch(`https://holzkorb-backend.herokuapp.com/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((product) => {
          setName(product.name);
          setSubtitle(product.subtitle);
          setDescription(product.description);
        });
  }, [productId, isCreate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://holzkorb-backend.herokuapp.com/products${
        !isCreate ? `/${productId}` : ''
      }`,
      {
        method: isCreate ? 'POST' : 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          subtitle: subtitle,
          description: description,
          ownerId: auth.userId,
        }),
      }
    )
      .then((res) => {
        window.localStorage.setItem('isLoading', 1);
        history.push('/manage-product');
      })
      .catch((e) => console.error(e));
  };
  return (
    <main className="product-form">
      <div className="container mx-auto px-4 sm:px-8 rounded overflow-hidden shadow-lg mt-12 py-8 border lg:w-3/5 w-full">
        <h2 className="text-2xl font-semibold leading-tight mb-8 text-green-600">
          {isCreate
            ? 'Create new Product Item'
            : `Edit Product for ${productId}`}
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-stock">
                Product Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-stock"
                type="text"
                placeholder="ex. Apples"
                required
                value={name}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-min-order">
                Product Subtitle
              </label>
              <input
                onChange={(e) => setSubtitle(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-min-order"
                type="text"
                placeholder="ex. ~ Green Gala (6 Apples/KG)"
                required
                value={subtitle}
              />
            </div>
            <div className="w-full px-3 my-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-price">
                Product Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-price"
                placeholder="Write something to explain to your user what is special about your product"
                required
                value={description}
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
export default ProductForm;
