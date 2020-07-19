import React, { useEffect, useState } from 'react';
import Button from './Button';
import { getAmountHumanReadable, formatMoney } from '../utils/helpers';

export const AddToCart = ({
  showViewCart,
  item,
  context,
  className = 'w-1/2',
  isMinimal = false,
  hideComboBoxes = false,
  addToCart,
  removeFromCart,
  cart = [],
  isUpsellProduct = false,
  isFromCheckout = false,
}) => {
  const getItemFromCart = context
    ? context.getItemFromCart
    : (id) => cart.find((i) => i.id === id);
  const numberOfItemsInCart = context
    ? context.numberOfItemsInCart
    : cart.length;
  const itemInCart = getItemFromCart(item.id);
  const [frequency, setFrequency] = useState(
    itemInCart ? itemInCart.frequency : 'One-Time'
  );
  const [material, setMaterial] = useState(
    itemInCart && !itemInCart.isBagNotBasket ? 'Basket' : 'Bag'
  );
  const enrichItem = (item) => ({
    ...item,
    frequency,
    isBagNotBasket: material === 'Bag',
  });

  const MIN_QTY = 1;
  const addItemToCart = (item, qty) => {
    context
      ? context.addToCart(enrichItem(item), qty)
      : addToCart(enrichItem(item), qty);
    if (!itemInCart && showViewCart) {
      window.location.href = '/cart';
    }
  };
  useEffect(() => {
    if (itemInCart) {
      addItemToCart({ ...itemInCart }, itemInCart.qty);
    }
  }, [material, frequency]);
  const removeItemFromCart = (item) =>
    removeFromCart ? removeFromCart(item) : context.removeFromCart(item);
  const MAX_QTY = item.totalUnitsCount;
  const totalAmount = getAmountHumanReadable(
    item,
    itemInCart ? itemInCart.qty : MIN_QTY
  );
  return (
    <>
      {!itemInCart ? (
        <Button
          alt="Add to Cart"
          title={
            isMinimal ? (
              <svg
                className="fill-current text-white w-4 h-4 mt-1 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M4 2h16l-3 9H4a1 1 0 1 0 0 2h13v2H4a3 3 0 0 1 0-6h.33L3 5 2 2H0V0h3a1 1 0 0 1 1 1v1zm1 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              </svg>
            ) : isUpsellProduct && !isFromCheckout ? (
              `Redeem Offer`
            ) : isUpsellProduct && isFromCheckout ? (
              `Add ${item.name.replace('(On Sale)', '')} & Continue`
            ) : (
              'Add to cart'
            )
          }
          subtitle={!isMinimal && !isUpsellProduct && totalAmount}
          onClick={(e) => {
            e.preventDefault();
            addItemToCart(item, MIN_QTY);
            return false;
          }}
          className={
            isMinimal
              ? `${className} lg:text-lg text-4xl shadow rounded-full lg:w-10 lg:h-10 w-16 h-16 shadow text-center p-2 my-0`
              : `${className} leading-10 m-0 px-3 md:p-3`
          }
        />
      ) : (
        <div className={`flex leading-10 ${className}`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              itemInCart.qty > MIN_QTY
                ? addItemToCart(item, +itemInCart.qty - 1)
                : removeItemFromCart(item);
              return false;
            }}
            className={`text-white bg-secondary w-1/4 hover:bg-green-600 focus:bg-green-700 focus:outline-none hover:shadow font-bold md:py-2 px-4 rounded-l ${
              !itemInCart.qty && 'opacity-50'
            }`}>
            {itemInCart.qty !== 1 ? '-' : 'x'}
          </button>
          <span
            onClick={(e) => {
              e.preventDefault();
              itemInCart.qty < MAX_QTY &&
                addItemToCart(item, +itemInCart.qty + 1);
            }}
            className={`text-white flex-grow whitespace-no-wrap text-center bg-secondary font-bold px-2 md:p-3 cursor-pointer`}>
            {!isMinimal && (
              <span className="font-normal hidden md:inline-block">Added:</span>
            )}{' '}
            {totalAmount}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              itemInCart.qty < MAX_QTY &&
                addItemToCart(item, +itemInCart.qty + 1);
            }}
            className={`text-white bg-secondary w-1/4 hover:bg-green-600 focus:bg-green-700 focus:outline-none hover:shadow font-bold md:py-2 px-3 rounded-r ${
              itemInCart.qty === MAX_QTY && 'opacity-50'
            }`}>
            +
          </button>
        </div>
      )}
      {showViewCart ? (
        <a
          href="/cart"
          className={`text-xl leading-6 lg:text-sm mt-3 block text-gray-500 ${
            numberOfItemsInCart && itemInCart ? 'opacity-100' : 'opacity-0'
          }`}>
          View Cart
        </a>
      ) : null}
    </>
  );
};

export default AddToCart;
