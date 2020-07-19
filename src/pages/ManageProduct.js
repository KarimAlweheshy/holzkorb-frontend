import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

const ManageProduct = () => {
  const [product, setProduct] = useState([]);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (
      window.localStorage.getItem('isLoading') &&
      parseInt(window.localStorage.getItem('isLoading')) === 1
    ) {
      window.localStorage.setItem('isLoading', 0);
      toast('Successufly updated your product', {});
    }
    (() =>
      fetch('https://holzkorb-backend.herokuapp.com/products', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((product) => product.length && setProduct(product)))();
  }, []);
  return (
    <main className="manage-product">
      <ToastContainer />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight">
              Product Items
            </h2>
            <Link to="/product/create">
              <button
                className="bg-blue-400 active:bg-blue-600 focus:bg-blue-600 hover:bg-blue-500 uppercase text-blue-800 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 flex items-center ml-auto"
                type="button"
                style={{ transition: 'all .15s ease' }}>
                <i className="fa fa-plus-circle mr-2 text-lg text-currentColor"></i>{' '}
                Create Product
              </button>
            </Link>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
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
              <div className="relative">
                <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
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
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500">
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subtitle
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Orders Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item) => (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src="https://cairofresh.com/downloads/orange.jpg"
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <Link
                              to={`/product/${item._id}`}
                              className="text-blue-500 hover:text-blue-700 underline hover:no-underline whitespace-no-wrap">
                              {item.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.subtitle}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          className="chart"
                          height="20"
                          width="100"
                          aria-labelledby="title"
                          style={{ transform: 'scaleX(2)' }}
                          role="img">
                          <title id="title">
                            A bart chart showing information
                          </title>
                          <g className="bar" transform="translate(0,0)">
                            <rect height="10" y="10" width="10"></rect>
                          </g>
                          <g className="bar" transform="translate(10,0)">
                            <rect height="6" y="14" width="10"></rect>
                          </g>
                          <g className="bar" transform="translate(20,0)">
                            <rect height="20" width="10"></rect>
                          </g>
                          <g className="bar" transform="translate(30,0)">
                            <rect height="20" y="10" width="10"></rect>
                          </g>
                          <g className="bar" transform="translate(40,0)">
                            <rect height="9" y="11" width="10"></rect>
                          </g>
                          <g className="bar" transform="translate(50,0)">
                            <rect height="10" y="10" width="10"></rect>
                          </g>
                          <g className="bar" transform="translate(60,0)">
                            <rect height="17" y="3" width="10"></rect>
                          </g>
                          <g className="bar" transform="translate(70,0)">
                            <rect height="18" y="2" width="10"></rect>
                          </g>
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ManageProduct;
