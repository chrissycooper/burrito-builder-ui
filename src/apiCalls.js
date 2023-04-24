const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

const postNewOrder = (newOrder) => {
  const {name, ingredients} = newOrder
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify({name: name, ingredients: ingredients}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if(!response.ok){
        throw new Error();
      }
      return response.json()
    })
}

export {getOrders, postNewOrder}