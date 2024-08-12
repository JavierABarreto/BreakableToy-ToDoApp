import { render, screen} from '@testing-library/react'
import main from '../main'
import { expect, it } from 'vitest'

it("should work", () => {
  render(<main />)

  const btn = screen.findByText(/New To Do/i)
  expect(btn).toBeVisible();
})