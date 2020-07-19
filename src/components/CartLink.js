import React from 'react';

class CartLink extends React.Component {
  render() {
    const {
      context: { numberOfItemsInCart } = { numberOfItemsInCart: 0 },
      isCheckout = false,
    } = this.props;
    return (
      <div
        className={`${
          !isCheckout ? 'md:fixed' : 'md:absolute'
        } md:z-30 md:top-0 md:mt-12 md:mt-8 md:flex md:justify-center md:max-w-screen-xl md:mx-auto md:w-full`}>
        <div className="c_large:w-c_large md:w-full md:max-w-full md:large md:px-0 md:w-screen">
          <a
            href="/cart"
            id="cartOverlay"
            className={`${
              !isCheckout ? 'bg-white' : 'text-sm -mr-2'
            } px-3 py-1 md:py-2 md:pl-2 md:pr-1 ${
              parseInt(numberOfItemsInCart) > 0 ? 'mt-4' : 'mt-2'
            } rounded text-center hover:bg-green-100 fixed z-30 top-0 right-0 md:absolute md:-mt-10`}>
            {parseInt(numberOfItemsInCart) > 0 ? (
              <span className="inline-block w-6 h-6 text-md font-light border-white text-center whitespace-no-wrap font-bold leading-normal text-green-600 text-shadow">
                {numberOfItemsInCart}
              </span>
            ) : null}
            <svg
              className={`fill-current w-8 h-6 ${
                parseInt(numberOfItemsInCart) > 0
                  ? 'text-green-600 -ml-1'
                  : 'text-green-300'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M4 2h16l-3 9H4a1 1 0 1 0 0 2h13v2H4a3 3 0 0 1 0-6h.33L3 5 2 2H0V0h3a1 1 0 0 1 1 1v1zm1 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
          </a>
        </div>
      </div>
    );
  }
}

export default CartLink;
