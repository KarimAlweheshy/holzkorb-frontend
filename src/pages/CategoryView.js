import React, { useState, useEffect } from 'react';
// import { useFlexSearch } from "react-use-flexsearch"
import { Formik, Form, Field } from 'formik';
//import { SiteContext, ContextProviderComponent } from "../context/mainContext"
import ListItem from '../components/ListItem';
import { titleIfy } from '../utils/helpers';
import CartLink from '../components/CartLink';
//import SearchBar from '../components/SearchBar';

const CategoryView = ({ title, cart, addToCart, removeFromCart }) => {
  //const [offset, setOffset] = useState(1);
  const [query, setQuery] = useState('');
  /*const results = useFlexSearch(query, index, JSON.parse(store), {
    encode: false,
    rtl: true,
    split: /\s+/,
    tokenize: 'forward',
  });*/
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    fetch('https://holzkorb-backend.herokuapp.com/inventory/all')
      .then((res) => res.json())
      .then((inventory) => {
        console.log(inventory, 'heyyy');
        setFilteredItems(inventory.map((i) => ({ ...i.inventoryItem, ...i.product })));
      });
  }, []);
  return (
    <div className="lg:px-2 pb-4 flex justify-center max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center w-full">
        <div className="max-c_large:w-c_large flex flex-col max-w-full w-full">
          <div className="px-4 lg:pt-10 lg:pb-8 pb-4 lg:flex justify-between">
            <h1 className="md:text-5xl font-light mb-0">{titleIfy(title)}</h1>
            <div className="w-full lg:w-64 lg:ml-2 mt-4">
              <Formik
                initialValues={{ query: '' }}
                onSubmit={(values, { setSubmitting }) => {
                  setQuery(
                    values.query.slice(-1) === 's'
                      ? values.query.slice(0, -1)
                      : values.query
                  );
                  setSubmitting(false);
                }}>
                <Form className="mb-0">
                  <Field
                    className="w-full text-sm shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:shadow-outline"
                    name="query"
                    type="search"
                    placeholder="Filter by product name, farm, description..."
                  />
                </Form>
              </Formik>
            </div>
          </div>
          {/*<span
            className={
              query.length && !filteredItems.length ? 'block mx-4' : 'hidden'
            }>
            <span className="block mb-4">
              Sorry, No results found for <strong>{query}</strong>.
            </span>
            <span className="block p-3 has-transitions bg-orange-500 items-center text-orange-100">
              Do you want to recommend us a product ?<br />
              Please drop us an email to{' '}
              <a href="mailto:hello@cairofresh.com">hello@cairofresh.com</a> and
              we will get in touch with the producer/farm
            </span>
        </span>*/}
          <div className="md:px-4 w-full grid md:grid-cols-2 md:gap-8 gap-3 sm:grid-cols-1 lg:grid-cols-3 small:user-select-none">
            {filteredItems.map((item, i) => (
              <ListItem
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
                key={`product_${i}`}
                product={item}
              />
            ))}
          </div>
        </div>
      </div>
      <CartLink cart={cart} />
    </div>
  );
};

export default CategoryView;
