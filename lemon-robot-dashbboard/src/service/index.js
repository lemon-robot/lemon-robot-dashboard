import Vue from 'vue'
import Vuex from 'vuex'

import global from './global'
import login from './login'
import main from './main'

Vue.use(Vuex)

let result = {}

function findStoreModule (tree) {
  Object.keys(tree).forEach(function (key) {
    if (tree[key].hasOwnProperty('state')) {
      result['x' + (Math.random() + '').split('.')[1]] = tree[key]
    } else {
      findStoreModule(tree[key])
    }
  })
}

findStoreModule({
  global,
  login,
  main
})

console.log(result)

export default new Vuex.Store({
  modules: result
})
