import React from 'react';
import {
  formatMoney,
  slugify,
  titleIfy,
  getAmountHumanReadable,
  getTrimmedString,
  getKiloPrice,
} from '../utils/helpers';
import { AddToCart } from './AddToCart';

const ListItem = ({
  product,
  addToCart,
  removeFromCart,
  cart,
  className = '',
  isSmall = false,
  isInSlider = false,
}) => {
  const {
    name = 'Apples',
    subtitle = 'Green Gala',
    pricePerUnit,
    orderUnit,
    totalUnitsCount,
  } = product;
  const unitHumanReadable = getAmountHumanReadable({
    unitAmount: 1,
    orderUnit,
  });
  const width = 9;
  const classes = !isInSlider
    ? {
        0: 'relative shadow md:no-shadow md:border md:rounded text-left flex md:block',
        1: `blendContainer border-r border-${
          product.color || 'orange'
        }-100 md:border-none relative md:rounded-t w-32 h-32 md:w-auto h-auto flex-grow-0`,
        2: 'md:px-3 md:pt-4 md:mb-3 md:text-l text-sm font-semibold block capitalize',
        3: 'h-5 block text-xs italic font-light text-gray-600 m-0 p-0',
      }
    : {
        0: 'relative no-shadow border rounded text-left block',
        1: 'blendContainer border-none relative rounded-t w-auto h-auto flex-grow-0',
        2: 'itemTitle md:px-3 md:mt-4 md:mb-3 md:text-l text-sm font-semibold block capitalize',
        3: 'h-5 hidden md:block text-xs italic font-light text-gray-600 m-0 p-0',
      };
  return (
    <div className={`${classes[0]} ${className}`}>
      <div
        className={`${classes[1]} ${
          isSmall ? 'md:h-60' : 'md:h-72'
        } flex justify-center items-center bg-${product.color || 'orange'}-100`}>
        <div
          className={`flex justify-center items-center overflow-hidden p-0 m-0 w-32 h-32 md:w-full md:h-full`}>
          <a href={`#/product/${slugify(name)}`}>
            <img
              alt={name}
              src="https://cairofresh.com/downloads/orange.jpg"
              className={`md:w-${
                width || 11
              }/12 scale-100 transition-transform ${
                width <= 7
                  ? 'bottom-0 absolute left-0 md:static'
                  : 'relative w-full'
              } z-10 duration-200 ease-in-out transform hover:scale-110 max-w-full blendImage p-0 m-0 max-h-full mx-auto`}
            />
          </a>
        </div>
        <AddToCart
          isMinimal
          item={product}
          className="hidden md:flex absolute z-10 shadow-inner -bottom-1 right-0 mr-2 mb-0 p-0 text-xl md:text-sm leading-8 md:leading-none ml-3 md:left-auto md:ml-0"
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      </div>
      <div className="flex-grow p-3 md:p-0">
        <span className={classes[2]}>
          <a
            href={`#/product/${slugify(name)}`}
            className="flex justify-between">
            <span>{titleIfy(name.toLowerCase())}</span>{' '}
            {!name.includes('Basket') && !name.includes('Bundle') ? (
              <span className="text-right ml-1" style={{ direction: 'rtl' }}>
                {product.arabic_title}
              </span>
            ) : null}
          </a>
        </span>
        <div className="md:text-left md:px-3 md:pb-3 md:flex">
          <p className="text-l font-semibold mb-0 p-0 mx-0 flex-grow">
            <span className="text-right text-sm text-gray-600 m-0 p-0">
              {formatMoney(pricePerUnit)}
            </span>
            <span className="block text-sm text-gray-700 font-light">
              {unitHumanReadable}
              <span className="block md:inline-block text-teal-500 text-xs text-gray-700 font-light capitalize ml-1">
                {subtitle}
              </span>
            </span>
          </p>
          <div className="md:hidden">
            <AddToCart
              hideComboBoxes
              item={product}
              className="shadow-inner text-sm font-light h-auto mt-2 md:mt-0 w-full md:w-auto"
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
            />
          </div>
          <p className="hidden md:block text-sm text-right text-gray-700 font-light mb-0">
            <span className="hidden h-5 text-xs text-orange-600 font-semibold">
              {totalUnitsCount < 10
                ? `${getAmountHumanReadable(
                    { orderUnit, unitAmount: 1 },
                    totalUnitsCount
                  )}
              in stock`
                : ''}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
