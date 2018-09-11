const {db, Product} = require('./server/db')
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

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(products.map(product => Product.create(product)))
  console.log(green('Seeding success!'))
}

seed()
  .catch(err => {
    console.error(red('Oh no! Something went wrong!'))
    console.error(err)
  }).then(() => {
    db.close()
  })
