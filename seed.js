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
    price: 875,
    stock: 5,
    imageUrl: '/laser-pointer.jpg'
  },
  {
    name: 'Kitty Litter',
    description: 'Just your average clumping kitty litter.',
    price: 1345,
    stock: 10,
    imageUrl: '/light-litter.JPG'
  },
  {
    name: 'Fish Kick Toy',
    description:
      'A fish-shaped kick toy for your cat to practice disembowelment.',
    price: 567,
    stock: 8,
    imageUrl: '/kick-fish.png'
  },
  {
    name: 'Flower Drinking Fountain',
    description:
      'A drinking fountain in the shape of a flower so your cat can drink fresh water in style.',
    price: 2894,
    stock: 25,
    imageUrl: '/flower-fountain.jpeg'
  },
  {
    name: 'Cat Tunnel',
    description: 'The perfect place for your cat to hide and play in!',
    price: 2113,
    stock: 12,
    imageUrl: '/cat-tunnel.jpg'
  },
  {
    name: 'Cat Tunnel Expansion',
    description: 'Attach this to your Cat Tunnel for even more fun!',
    price: 1099,
    stock: 0,
    imageUrl: '/tunnel-expansion.jpg'
  },
  {
    name: 'Litter Fortress',
    description:
      'The most secure litter box there is. Will keep litter from being thrown all over your floor.',
    price: 1452,
    stock: 4,
    imageUrl: '/litter-fortress.jpg'
  },
  {
    name: 'Fluffy bed',
    description: 'A lovely fluffy bed for your favorite fluffy friend.',
    price: 2696,
    stock: 17,
    imageUrl: '/fluffy-bed.jpg'
  },
  {
    name: 'Scratching post',
    description: 'A nice scratching post for kitty to keep her claws sharp.',
    price: 1595,
    stock: 21,
    imageUrl: '/scratching-post.jpg'
  },
  {
    name: 'Water bowl',
    description: "Just a plain water bowl that your cat probably won't use.",
    price: 255,
    stock: 10,
    imageUrl: '/water-bowl.jpeg'
  },
  {
    name: 'Medicinal Grade Catnip',
    description: 'The best catnip on the market. Always fresh, never dried.',
    price: 3599,
    stock: 21,
    imageUrl: '/catnip.jpg'
  },
  {
    name: 'Backpack Carrier',
    description: 'A comfy backpack carrier so your cat can see the world.',
    price: 3595,
    stock: 21,
    imageUrl: '/backpack.jpg'
  },
  {
    name: 'Cardboard Scratcher',
    description: 'Corrugated cardboard for your cat to scratch on.',
    price: 1172,
    stock: 21,
    imageUrl: '/cardboard-scratcher.jpg'
  },
  {
    name: 'Bowl Bed',
    description: 'A comfy bowl-shaped cat bed.',
    price: 1172,
    stock: 21,
    imageUrl: '/bowl-bed.jpg'
  },
  {
    name: 'Braided Bed',
    description: 'The coziest, softest, hand-braided cat bed.',
    price: 1172,
    stock: 21,
    imageUrl: '/braid-bed.jpg'
  },
  {
    name: 'Cat Pod Bed',
    description: 'A little pod bed for your cat to feel snug during catnaps.',
    price: 1172,
    stock: 21,
    imageUrl: '/pod-bed.jpeg'
  }
]

const orders = [
  {
    billingInfo: '1 Hacker Way',
    shippingInfo: "Sear's Tower, Chicago",
    totalAmount: 399,
    status: 'created',
    userId: 2
  },
  {
    billingInfo: '5 Hacker Way',
    shippingInfo: '405 W Superior, Chicago',
    totalAmount: 2399,
    status: 'completed',
    userId: 1
  },
  {
    billingInfo: '2 Hacker Way',
    shippingInfo: '305 W Huron, Chicago',
    totalAmount: 499,
    status: 'processing',
    userId: 1
  },
  {
    billingInfo: '23 Hacker Way',
    shippingInfo: '35 W Huron, Chicago',
    totalAmount: 4499,
    status: 'cancelled',
    userId: 3
  },
  {
    billingInfo: '2 Hacker Way',
    shippingInfo: '305 W Huron, Chicago',
    totalAmount: 599,
    status: 'processing',
    userId: 1
  }
]

const lineItems = [
  {
    quantity: 2,
    price: 399,
    lineItemProductId: 1,
    lineItemOrderId: 2
  },
  {
    quantity: 2,
    price: 399,
    lineItemProductId: 3,
    lineItemOrderId: 2
  },
  {
    quantity: 2,
    price: 399,
    lineItemProductId: 1,
    lineItemOrderId: 1
  },
  {
    quantity: 1,
    price: 699,
    lineItemProductId: 3,
    lineItemOrderId: 3
  },
  {
    quantity: 2,
    price: 399,
    lineItemProductId: 4,
    lineItemOrderId: 3
  },
  {
    quantity: 2,
    price: 399,
    lineItemProductId: 2,
    lineItemOrderId: 4
  },
  {
    quantity: 1,
    price: 4499,
    lineItemProductId: 5,
    lineItemOrderId: 5
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
  },{
    rating: 1,
    text: 'My cat refuses to touch this! Horrible.',
    productId: 2
  },{
    rating: 3,
    text: "It's just okay.",
    productId: 3
  },{
    rating: 2,
    text: 'It has a weird smell.',
    productId: 2
  },{
    rating: 4,
    text: "Solid product. Would recommend to a friend's cat.",
    productId: 3
  },{
    rating: 4,
    text: "Solid product. Would recommend to a friend's cat.",
    productId: 5
  },{
    rating: 2,
    text: "Who came up with this? They should be fired.",
    productId: 14
  },{
    rating: 5,
    text: "Who came up with this? They should get an award.",
    productId: 15
  },{
    rating: 5,
    text: "My cat uses this all the time!",
    productId: 15
  },{
    rating: 5,
    text: "My cat uses this all the time!",
    productId: 13
  },{
    rating: 5,
    text: "My cat uses this all the time!",
    productId: 8
  },{
    rating: 5,
    text: "This really works!",
    productId: 7
  }
]

const users = [
  {
    firstName: 'Rajiv',
    lastName: 'Bhatia',
    email: 'rb@mail.com',
    password: '123456',
    isAdmin: false,
    address: '405 W Superior',
    city: 'Chicago',
    state: 'IL'
  },
  {
    firstName: 'Eric',
    lastName: 'Guo',
    email: 'eguo@mail.com',
    password: '123456',
    isAdmin: false,
    address: '233 S Wacker Drive',
    city: 'Chicago',
    state: 'IL'
  },
  {
    firstName: 'Mickey',
    lastName: 'Mouse',
    email: 'mickey@mail.com',
    password: '123456',
    isAdmin: false,
    address: '1 Happiest Place',
    city: 'Orlando',
    state: 'FL'
  },
  {
    firstName: 'Steve',
    lastName: 'Jobs',
    email: 'Steve@me.com',
    password: 'Apple',
    isAdmin: true,
    address: '1 Infinite Loop',
    city: 'Cupertino',
    state: 'CA'
  }
]

const categories = [
  {
    name: 'litter' // 1
  },{
    name: 'bowls' // 2
  },{
    name: 'furniture' // 3
  },{
    name: 'toys' // 4
  },{
    name: 'beds' // 5
  },{
    name: 'accessories' // 6
  }
]

const productCats = [
  {
    productId: 1,
    categoryId: 4
  },{
    productId: 2,
    categoryId: 4
  },{
    productId: 3,
    categoryId: 1
  },{
    productId: 4,
    categoryId: 2
  },{
    productId: 4,
    categoryId: 3
  },{
    productId: 5,
    categoryId: 4
  },{
    productId: 5,
    categoryId: 3
  },{
    productId: 6,
    categoryId: 4
  },{
    productId: 6,
    categoryId: 3
  },{
    productId: 7,
    categoryId: 1
  },{
    productId: 7,
    categoryId: 3
  },{
    productId: 8,
    categoryId: 3
  },{
    productId: 8,
    categoryId: 5
  },{
    productId: 9,
    categoryId: 4
  },{
    productId: 9,
    categoryId: 3
  },{
    productId: 10,
    categoryId: 2
  },{
    productId: 11,
    categoryId: 4
  },{
    productId: 12,
    categoryId: 6
  },{
    productId: 13,
    categoryId: 4
  },{
    productId: 13,
    categoryId: 3
  },{
    productId: 14,
    categoryId: 3
  },{
    productId: 14,
    categoryId: 5
  },{
    productId: 15,
    categoryId: 3
  },{
    productId: 15,
    categoryId: 5
  },{
    productId: 16,
    categoryId: 3
  },{
    productId: 16,
    categoryId: 5
  }
]

const seed = async () => {
  await db.sync({force: true})
  await Promise.all(categories.map(category => Category.create(category)))
  await Promise.all(products.map(product => Product.create(product)))
  await Promise.all(users.map(user => User.create(user)))
  await Promise.all(orders.map(order => Order.create(order)))
  await Promise.all(lineItems.map(lineItem => LineItem.create(lineItem)))
  await Promise.all(reviews.map(review => Review.create(review)))
  await Promise.all(productCats.map(prodCat => ProdCat.create(prodCat)))
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
