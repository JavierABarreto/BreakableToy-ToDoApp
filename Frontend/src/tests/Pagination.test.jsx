import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Pagination } from '../components/TodosTable/Pagination';
import { store } from '../redux/store'


describe('Pagination Component', () => {
  it('renders pagination component', () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    expect(screen.getByText(/«/i)).toBeVisible();
    expect(screen.getByText(/»/i)).toBeVisible();
  });

  it('disables previous button and next button since it is on first page', () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );
  });
});