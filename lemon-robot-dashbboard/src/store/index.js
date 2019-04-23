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
  main
})

export default result
