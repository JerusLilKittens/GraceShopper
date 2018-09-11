const {db, Product, Order, User, Review} = require('./server/db')
const {green, red} = require('chalk')

const products = [{
  name: 'Laser Pointer',
  description: 'Every cat\'s favorite toy! This laser pointer will entertain your cat for hours.',
  price: 8.75
}, {
  name: 'Kitty Litter',
  description: 'Just your average clumping kitty litter.',
  price: 13.45
}, {
  name: 'Fish Kick Toy',
  description: 'A fish-shaped kick toy for your cat to practice disembowelment.',
  price: 5.60
}, {
  name: 'Flower Drinking Fountain',
  description: 'A drinking fountain in the shape of a flower so your cat can drink fresh water in style.',
  price: 28.90
}, {
  name: 'Cat Tunnel',
  description: 'The perfect place for your cat to hide and play in!',
  price: 21.10
}, {
  name: 'Cat Tunnel Expansion',
  description: 'Attach this to your Cat Tunnel for even more fun!',
  price: 10.99
}, {
  name: 'Litter Fortress',
  description: 'The most secure litter box there is. Will keep litter from being thrown all over your floor.',
  price: 14.50
}, {
  name: 'Fluffy bed',
  description: 'A lovely fluffy bed for your favorite fluffy friend.',
  price: 26.90
}, {
  name: 'Scratching post',
  description: 'A nice scratching post for kitty to keep her claws sharp.',
  price: 15.90
}, {
  name: 'Water bowl',
  description: 'Just a plain water bowl that your cat probably won\'t use.',
  price: 2.50
}]

const orders = [{
  products: [{1: {quantity: 2, price: 3}}, {2: {quantity: 1, price: 1.15}}],
  billingInfo: '1 Hacker Way',
  shippingInfo: 'Sear\'s Tower, Chicago',
  totalAmount: 3.99,
  userId: 5
  },{
  products: [{3: {quantity: 1, price: 2.15}}, {5: {quantity: 5, price: 7.15}}],
  billingInfo: '5 Hacker Way',
  shippingInfo: '405 W Superior, Chicago',
  totalAmount: 23.99,
  userId: 2
  },{
  products: [{4: {quantity: 3, price: 2.65}}],
  billingInfo: '2 Hacker Way',
  shippingInfo: '305 W Huron, Chicago',
  totalAmount: 4.99,
  userId: 6
  }]

const reviews = [{
  rating: 5,
  text: 'This is a great product! My cat totally loves it.'
}, {
  rating: 1,
  text: 'My cat refuses to touch this! Horrible.'
}, {
  rating: 3,
  text: 'It\'s just okay.'
}, {
  rating: 2,
  text: 'It has a weird smell.'
}, {
  rating: 4,
  text: 'Solid product. Would recommend to a friend\'s cat.'
}]

const users = [{
  firstName: 'Rajiv',
  lastName: 'Bhatia',
  email: 'rb@mail.com',
  password: '123456',
  isAdmin: false,
  streetNameNumber: '405 W Superior',
  city: 'Chicago',
  state: 'IL'
},{
  firstName: 'Eric',
  lastName: 'Guo',
  email: 'eguo@mail.com',
  password: '123456',
  isAdmin: false,
  streetNameNumber: '233 S Wacker Drive',
  city: 'Chicago',
  state: 'IL'
},{
  firstName: 'Mickey',
  lastName: 'Mouse',
  email: 'mickey@mail.com',
  password: '123456',
  isAdmin: false,
  streetNameNumber: '1 Happiest Place',
  city: 'Orlando',
  state: 'FL'
},{
  firstName: 'Steve',
  lastName: 'Jobs',
  email: 'Steve@me.com',
  password: 'Apple',
  isAdmin: false,
  streetNameNumber: '1 Infinite Loop',
  city: 'Cupertino',
  state: 'CA'
}]


const seed = async () => {
  await db.sync({force: true})
  await Promise.all(products.map(product => Product.create(product)))
  await Promise.all(orders.map(order => Order.create(order)))
  // await Promise.all(users.map(user => User.create(user)))
  await Promise.all(reviews.map(review => Review.create(review)))
  console.log(green('Seeding success!'))
}

seed()
  .catch(err => {
    console.error(red('Oh no! Something went wrong!'))
    console.error(err)
  }).then(() => {
    db.close()
  })
