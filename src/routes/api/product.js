const {Router} = require('express')
const product_controller = require('../../controllers/product')

const router = Router()

router.get('/',product_controller.AllProducts)
router.get('/category/:category',product_controller.getbycat)
router.get('/id/:id',product_controller.getProduct)
router.post('/',product_controller.CreateProduct)
router.post('/search',product_controller.SearchByName)
router.put('/:id',product_controller.UpdateProduct)
router.delete('/:id',product_controller.DeleteProduct)
router.post('/cart',product_controller.cart)

module.exports = router