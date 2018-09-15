const {
  db,
  Product,
  Order,
  User,
  Review,
  Category,
  ProdCat,
  LineItem,
  CartItem,
  Cart
} = require('./server/db/index')

const {green, red} = require('chalk')

const products = [
  {
    name: 'Laser Pointer',
    description:
      "Every cat's favorite toy! This laser pointer will entertain your cat for hours.",
    price: 8.75,
    stock: 5
  },
  {
    name: 'Kitty Litter',
    description: 'Just your average clumping kitty litter.',
    price: 13.45,
    stock: 10
  },
  {
    name: 'Fish Kick Toy',
    description:
      'A fish-shaped kick toy for your cat to practice disembowelment.',
    price: 5.6,
    stock: 8
  },
  {
    name: 'Flower Drinking Fountain',
    description:
      'A drinking fountain in the shape of a flower so your cat can drink fresh water in style.',
    price: 28.9,
    stock: 25
  },
  {
    name: 'Cat Tunnel',
    description: 'The perfect place for your cat to hide and play in!',
    price: 21.1,
    stock: 12
  },
  {
    name: 'Cat Tunnel Expansion',
    description: 'Attach this to your Cat Tunnel for even more fun!',
    price: 10.99,
    stock: 0
  },
  {
    name: 'Litter Fortress',
    description:
      'The most secure litter box there is. Will keep litter from being thrown all over your floor.',
    price: 14.5,
    stock: 4
  },
  {
    name: 'Fluffy bed',
    description: 'A lovely fluffy bed for your favorite fluffy friend.',
    price: 26.9,
    stock: 17
  },
  {
    name: 'Scratching post',
    description: 'A nice scratching post for kitty to keep her claws sharp.',
    price: 15.9,
    stock: 21
  },
  {
    name: 'Water bowl',
    description: "Just a plain water bowl that your cat probably won't use.",
    price: 2.5,
    stock: 10
  }
]

const orders = [
  {
    billingInfo: '1 Hacker Way',
    shippingInfo: "Sear's Tower, Chicago",
    totalAmount: 3.99
  },
  {
    billingInfo: '5 Hacker Way',
    shippingInfo: '405 W Superior, Chicago',
    totalAmount: 23.99
  },
  {
    billingInfo: '2 Hacker Way',
    shippingInfo: '305 W Huron, Chicago',
    totalAmount: 4.99
  }
]

const lineItems = [
  {
    quantity: 2,
    price: 3.99,
    lineItemProductId: 1,
    lineItemOrderId: 2
  },
  {
    quantity: 2,
    price: 3.99,
    lineItemProductId: 3,
    lineItemOrderId: 2
  },
  {
    quantity: 2,
    price: 3.99,
    lineItemProductId: 1,
    lineItemOrderId: 1
  }
]

const cartItems = [
  {
    quantity: 2,
    productId: 1,
    cartId: 1
  },
  {
    quantity: 5,
    productId: 2,
    cartId: 1
  },
  {
    quantity: 1,
    productId: 4,
    cartId: 1
  },
  {
    quantity: 2,
    productId: 1,
    cartId: 2
  },
  {
    quantity: 2,
    productId: 1,
    cartId: 3
  },
  {
    quantity: 2,
    productId: 1,
    cartId: 4
  }
]

const carts = [
  {
    userId: 1,
    sessionId: 1
  },
  {
    userId: 2,
    sessionId: 2
  },
  {
    userId: 4,
    sessionId: 3
  },
  {
    sessionId: 4
  }
]

const reviews = [
  {
    rating: 5,
    text: 'This is a great product! My cat totally loves it.',
    productId: 1
  },
  {
    rating: 1,
    text: 'My cat refuses to touch this! Horrible.',
    productId: 2
  },
  {
    rating: 3,
    text: "It's just okay.",
    productId: 3
  },
  {
    rating: 2,
    text: 'It has a weird smell.',
    productId: 2
  },
  {
    rating: 4,
    text: "Solid product. Would recommend to a friend's cat.",
    productId: 3
  }
]

const users = [
  {
    firstName: 'Rajiv',
    lastName: 'Bhatia',
    email: 'rb@mail.com',
    password: '123456',
    isAdmin: false,
    streetNameNumber: '405 W Superior',
    city: 'Chicago',
    state: 'IL'
  },
  {
    firstName: 'Eric',
    lastName: 'Guo',
    email: 'eguo@mail.com',
    password: '123456',
    isAdmin: false,
    streetNameNumber: '233 S Wacker Drive',
    city: 'Chicago',
    state: 'IL'
  },
  {
    firstName: 'Mickey',
    lastName: 'Mouse',
    email: 'mickey@mail.com',
    password: '123456',
    isAdmin: false,
    streetNameNumber: '1 Happiest Place',
    city: 'Orlando',
    state: 'FL'
  },
  {
    firstName: 'Steve',
    lastName: 'Jobs',
    email: 'Steve@me.com',
    password: 'Apple',
    isAdmin: false,
    streetNameNumber: '1 Infinite Loop',
    city: 'Cupertino',
    state: 'CA'
  }
]

const categories = [
  {
    name: 'litter' // 1
  },
  {
    name: 'bowls' // 2
  },
  {
    name: 'furniture' // 3
  },
  {
    name: 'toys' // 4
  }
]

const seed = async () => {
  await db.sync({force: true})
  await Promise.all(categories.map(category => Category.create(category)))
  await Promise.all(products.map(product => Product.create(product)))
  await Promise.all(orders.map(order => Order.create(order)))
  await Promise.all(lineItems.map(lineItem => LineItem.create(lineItem)))
  await Promise.all(users.map(user => User.create(user)))
  await Promise.all(reviews.map(review => Review.create(review)))
  await ProdCat.create({
    productId: 1,
    categoryId: 4
  })
  await ProdCat.create({
    productId: 2,
    categoryId: 1
  })
  await ProdCat.create({
    productId: 3,
    categoryId: 4
  })
  await ProdCat.create({
    productId: 4,
    categoryId: 2
  })
  await ProdCat.create({
    productId: 5,
    categoryId: 4
  })
  await ProdCat.create({
    productId: 6,
    categoryId: 4
  })
  await ProdCat.create({
    productId: 7,
    categoryId: 1
  })
  await ProdCat.create({
    productId: 8,
    categoryId: 3
  })
  await ProdCat.create({
    productId: 9,
    categoryId: 4
  })
  await ProdCat.create({
    productId: 10,
    categoryId: 2
  })
  await ProdCat.create({
    productId: 10,
    categoryId: 1
  })
  await Promise.all(carts.map(cart => Cart.create(cart)))
  await Promise.all(cartItems.map(cartItem => CartItem.create(cartItem)))

  console.log(green('Seeding success!'))
}

seed()
  .catch(err => {
    console.error(red('Oh no! Something went wrong!'))
    console.error(err)
  })
  .then(() => {
    db.close()
  })
