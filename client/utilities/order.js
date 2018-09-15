

function getOrderTable(productData, items) {
  if(productData === undefined || items === undefined) {
    let preRender = [{id: 'na', name: 'not available', quantity: 'na', price: 'na'}]
    return preRender
  }
  const result = []
  for (let i=0; i<items.length; i++) {
    let itemObj = {}
    itemObj.id = items[i].lineItemProductId
    itemObj.productName = getProductName(productData, items[i].lineItemProductId)
    itemObj.quantity = items[i].quantity
    itemObj.price = items[i].price
    result.push(itemObj)
  }
  return result
}


function getProductName(productData, itemNum) {
  for(let j=0; j<productData.length; j++) {
    if (productData[j].id == itemNum) {
      return productData[j].name
    }
  }
  return "Description not available"
}

export default getOrderTable
