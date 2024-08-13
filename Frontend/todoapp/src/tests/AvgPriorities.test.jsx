import { cleanup, fireEvent, render, screen} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import '@testing-library/jest-dom'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { Stats } from '../components/Stats'
import { getAvg } from './testFunctions'

describe("ToDo tests", () => {
  afterEach(() => {
    cleanup()
  })

  const data = {
    avgPriorityAll: '--:-- ----',
    priorities: {
      avgPriorityLow: '--:-- ----',
      avgPriorityMedium: '--:-- ----',
      avgPriorityHigh: '--:-- ----'
    }
  }

  const todos = [
    {
      id: "id1",
      text: "TODO TASK 1",
      dueDate: 0,
      status: true,
      doneDate: 1723665820,
      priority: "High",
      creationDate: 1723665620
    },
    {
      id: "id2",
      text: "TODO TASK 2",
      dueDate: 0,
      status: true,
      doneDate: 1723665700,
      priority: "High",
      creationDate: 1723665600
    },
    {
      id: "id3",
      text: "TODO TASK 3",
      dueDate: 0,
      status: true,
      doneDate: 1723665640,
      priority: "Medium",
      creationDate: 1723665620
    },
    {
      id: "id4",
      text: "TODO TASK 4",
      dueDate: 0,
      status: true,
      doneDate: 1723665620,
      priority: "Medium",
      creationDate: 1723665600
    },
    {
      id: "id5",
      text: "TODO TASK 5",
      dueDate: 0,
      status: true,
      doneDate: 1723665920,
      priority: "Low",
      creationDate: 1723665620
    },
    {
      id: "id6",
      text: "TODO TASK 6",
      dueDate: 0,
      status: true,
      doneDate: 1723665800,
      priority: "Low",
      creationDate: 1723665600
    }
  ]

  it("Get AVG of ToDos with priority low", async () => {
    const avgByLow = getAvg(todos, "Low")
    data.priorities.avgPriorityLow = avgByLow

    render(
      <Provider store={store} >
        <Stats avgPriorityAl={data.avgPriorityAll} priorities={data.priorities} />
      </Provider>
    )

    expect(screen.getByText(/Average time to finish by priority:/i)).toBeVisible()
    expect(screen.getByText(/Low: 4 Minutes/i)).toBeVisible()
  })

  it("Get AVG of ToDos with priority Medium", async () => {
    const avgByMedium = getAvg(todos, "Medium")
    data.priorities.avgPriorityMedium = avgByMedium

    render(
      <Provider store={store} >
        <Stats avgPriorityAl={data.avgPriorityAll} priorities={data.priorities} />
      </Provider>
    )

    expect(screen.getByText(/Average time to finish by priority:/i)).toBeVisible()
    expect(screen.getByText(/Medium: 20 Seconds/i)).toBeVisible()
  })

  it("Get AVG of ToDos with priority High", async () => {
    const avgByHigh = getAvg(todos, "High")
    data.priorities.avgPriorityHigh = avgByHigh

    render(
      <Provider store={store} >
        <Stats avgPriorityAl={data.avgPriorityAll} priorities={data.priorities} />
      </Provider>
    )

    expect(screen.getByText(/Average time to finish by priority:/i)).toBeVisible()
    expect(screen.getByText(/High: 2 Minutes/i)).toBeVisible()
  })

  it("Get AVG of all ToDos", async () => {
    const avg = getAvg(todos, "default")
    data.avgPriorityAll = avg

    render(
      <Provider store={store} >
        <Stats avgPriorityAll={data.avgPriorityAll} priorities={data.priorities} />
      </Provider>
    )

    expect(screen.getByText(/Average time to fiinsh tasks:/i)).toBeVisible()
    expect(screen.getByText(/Avg: 2 Minutes/i)).toBeDefined();
  })
})