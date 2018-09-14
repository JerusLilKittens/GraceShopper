const {expect} = require('chai')
const {db} = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  before(() => {
    return db.sync({force: true})
  })

  const fullText =
    'The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family.'

  let product
  beforeEach(() => {
    product = Product.build({
      name: 'Catnip',
      description: fullText,
      price: 42.13,
      stock: 3
    })
  })

  afterEach(() => {
    return Product.truncate({cascade: true})
  })

  describe('attributes definition', () => {
    it('includes `name`, `description`, `price` and `stock`', async () => {
      const savedProduct = await product.save()
      expect(savedProduct.name).to.equal('Catnip')
      expect(savedProduct.description).to.equal(fullText)
      expect(savedProduct.price).to.equal(42.13)
      expect(savedProduct.stock).to.equal(3)
    })
  })

  it('required `description`', async () => {
    product.description = null
    let result, error
    try {
      result = await product.validate()
    } catch (err) {
      error = err
    }

    if (result) throw Error('validation should fail when content is null')

    expect(error).to.be.an.instanceOf(Error)
  })

  it('requires `name` in a more strict way', async () => {
    product.name = ''

    let result, error
    try {
      result = await product.validate()
    } catch (err) {
      error = err
    }

    if (result) throw Error('validation should fail when name is empty')

    expect(error).to.be.an.instanceOf(Error)
    expect(error.message).to.contain('Validation error')
  })

  it('can handle long `description`', async () => {
    let articleContent =
      'WALL-E (stylized with an interpunct as WALL·E) is a 2008 American computer-animated science-fiction comedy film produced by Pixar Animation Studios and released by Walt Disney Pictures. Directed by Andrew Stanton, the story follows a robot named WALL-E, who is designed to clean up an abandoned, waste-covered Earth far in the future. He falls in love with another robot named EVE, who also has a programmed task, and follows her into outer space on an adventure that changes the destiny of both his kind and humanity. Both robots exhibit an appearance of free will and emotions similar to humans, which develop further as the film progresses.'

    const result = await Product.create({
      name: 'Laser Pointer',
      description: articleContent,
      price: 66.13,
      stock: 2
    })

    expect(result).to.be.an('object')
    expect(result.name).to.equal('Laser Pointer')
    expect(result.description).to.equal(articleContent)
    expect(result.price).to.equal(66.13)
    expect(result.stock).to.equal(2)
  })
}) // end describe('Product model')
