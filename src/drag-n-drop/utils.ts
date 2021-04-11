import { expect } from 'chai'

interface Move<T> {
  from: number
  to: number
  source: T[]
}

export function move<T>({ from, to, source }: Move<T>): T[] {
  const cpy = [...source]
  const elToMove = cpy[from]
  cpy.splice(to + 1, 0, elToMove)
  cpy.splice(from, 1)
  return cpy
}

// describe('move', () => {
//   it('insertAt', () => {
//     const els: string[] = ['2', '1', '3']
//     const actual = move({ from: 0, to: 1, source: els })
//     console.log({ actual })
//     expect(actual).to.have.ordered.members(['1', '2', '3'])
//   })
// })