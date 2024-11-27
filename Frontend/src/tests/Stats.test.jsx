import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Stats } from '../components/Stats';
import { store } from '../redux/store'

const mockData = {
  avgPriorityAll: 70,
  priorities: {
    avgPriorityLow: 90,
    avgPriorityMedium: 90,
    avgPriorityHigh: 30
  }
}

describe('Stats Component', () => {
  it('renders stats component', () => {
    render(
      <Provider store={store}>
        <Stats avgPriorityAll={mockData.avgPriorityAll} priorities={mockData.priorities} />
      </Provider>
    );

    expect(screen.getByText(/Low/i)).toBeVisible();
    expect(screen.getByText(/Medium/i)).toBeVisible();
    expect(screen.getByText(/High/i)).toBeVisible();
    expect(screen.getByText(/Avg/i)).toBeVisible();
  });

  it('displays correct stats values', () => {
    render(
      <Provider store={store}>
        <Stats avgPriorityAll={mockData.avgPriorityAll} priorities={mockData.priorities} />
      </Provider>
    );

    expect(screen.getByText(/Avg: 01:10 minutes/i)).toBeVisible();
    expect(screen.getByText(/Low: 01:30 minutes/i)).toBeVisible();
    expect(screen.getByText(/Medium: 01:30 minutes/i)).toBeVisible();
    expect(screen.getByText(/High: 00:30 minutes/i)).toBeVisible();
  });
});