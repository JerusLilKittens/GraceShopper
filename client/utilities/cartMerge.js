export function mergeCarts(oldCart = [], savedCart = []) {
  let mergedCart = []
  let savedCartIds = []
  let oldCartIds = []
  let savedCartQuantity = {}
  for (let j = 0; j < savedCart.length; j++) {
    savedCartIds.push(savedCart[j].id)
    savedCartQuantity[savedCart[j].id] = savedCart[j].cartItem.quantity
  }
  for (let m = 0; m < oldCart.length; m++) {
    oldCartIds.push(oldCart[m].id)
  }
  for (let i = 0; i < oldCart.length; i++) {
    if (savedCartIds.indexOf(oldCart[i].id) === -1) {
      mergedCart.push(oldCart[i])
    } else {
      let oldQuantity = oldCart[i].cartItem.quantity
      let savedQuantity = savedCartQuantity[oldCart[i].id]
      let newQuantity =
        savedQuantity > oldQuantity ? savedQuantity : oldQuantity
      oldCart[i].cartItem.quantity = newQuantity
      mergedCart.push(oldCart[i])
    }
  }
  for (let l = 0; l < savedCart.length; l++) {
    if (oldCartIds.indexOf(savedCart[l].id) === -1) {
      mergedCart.push(savedCart[l])
    }
  }
  console.log(oldCart, savedCart)
  console.log(mergedCart, "inside mergedCart++++++++++++")
  return mergedCart
}
