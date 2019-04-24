import global from './global'
import login from './login'
import main from './main'

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

export default result
