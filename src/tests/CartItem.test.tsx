import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import CartItem from '../components/cart/cartItem';
import productReducer, { addToCart, removeFromCart } from '../redux/slices/productSlice';
import {  configureStore } from '@reduxjs/toolkit';
import { Cart, Category } from '../types/ProductTypes';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));


const mockDispatch = jest.fn();

const store = configureStore({
  reducer: {
    products: productReducer, 
  },
});

describe('CartItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    jest.requireMock('react-redux').useDispatch.mockReturnValue(mockDispatch);
  });

  const mockCategory: Category = {
    id: '1',
    name: 'Mock Category',
    image: 'category_image.jpg'
  };


  const item: Cart = {
    id: '1',
    title: 'Mock Item',
    description: 'This is a mock item',
    price: 10,
    images: ['image1.jpg', 'image2.jpg'],
    category: mockCategory,
    amount: 2 
  };

  test('renders cart item correctly', () => {
    render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );

    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(`Price: $${item.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Subtotal: $${(item.amount * item.price).toFixed(2)}`)).toBeInTheDocument();
  });

  test('dispatches addToCart action when "+" button is clicked', () => {
    render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );

    fireEvent.click(screen.getByText('+'));
    expect(mockDispatch).toHaveBeenCalledWith(addToCart(item));
  });

  test('dispatches removeFromCart action when "-" button is clicked', () => {
    render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );

    fireEvent.click(screen.getByText('-'));
    expect(mockDispatch).toHaveBeenCalledWith(removeFromCart(item.id));
  });
});



