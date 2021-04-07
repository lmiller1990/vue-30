import { mount } from '@cypress/vue'
import KButton from './k-button.vue'
import '../index.css'

describe('KButton', () => {
  it('renders', () => {
    mount(KButton, {
      slots: {
        default: 'KButton'
      }
    })
  })

  it('custom bg color and weight', () => {
    const onClick = cy.stub()
    mount(KButton, {
      props: {
        bg: 'red',
        weight: 200,
        onClick
      },
      slots: {
        default: 'KButton'
      }
    })

    cy.get('button').should('have.class', 'bg-red-200')
    cy.get('button').trigger('click').then(() => {
      expect(onClick).to.have.been.called
    })
  })

  it.only('disabled', () => {
    mount(KButton, {
      props: {
        bg: 'red',
        weight: 200,
        disabled: true
      },
      slots: {
        default: 'KButton'
      }
    })

    // cy.get('button').should('have.class', 'opacity')
  })
})