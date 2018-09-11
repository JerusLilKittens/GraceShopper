const {db, Product} = require('./server/db')
const {green, red} = require('chalk')

const products = [{

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
