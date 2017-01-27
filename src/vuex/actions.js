import { CHANGE_TITLE, POPULATE_SHOPPING_LISTS } from './mutation_types'
import axios from 'axios'
import getters from './getters'

export default {
  changeTitle: (store, data) => {
    store.commit(CHANGE_TITLE, data)
    store.dispatch('updateList', data.id)
  },
  populateShoppingLists: ({ commit }) => {
    return axios.get('http://localhost:3000/shoppinglists')
      .then(res => {
        commit(POPULATE_SHOPPING_LISTS, res.data)
      })
  },
  updateList: (store, id) => {
    let shoppingList = getters.getListById(store.state, id)
    return axios.put(`http://localhost:3000/shoppinglists/${id}`, shoppingList)
  },
  createShoppingList: (store, shoppinglist) => {
    return axios.post('http://localhost:3000/shoppinglists', shoppinglist)
      .then(res => {
        store.dispatch('populateShoppingLists')
      })
  },
  deleteShoppingList: (store, id) => {
    return axios.delete(`http://localhost:3000/shoppinglists/${id}`)
      .then(res => {
        store.dispatch('populateShoppingLists')
      })
  }
}
