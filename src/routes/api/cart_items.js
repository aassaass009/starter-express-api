const { Router } = require('express')
const cart_items_controller = require('../../controllers/cart_items')
const { checkToken } = require("../../auth/token_validation");

const router = Router()

router.post('/create', cart_items_controller.Create_cart_item)
router.post('/', cart_items_controller.Read_cart_items)
router.get('/:id', cart_items_controller.Read_cart_item)
router.delete('/:id', cart_items_controller.Delete_cart_item)
router.put('/:id', cart_items_controller.Update_cart_item)
router.put('/plus/:id', cart_items_controller.add_one_quantity)
router.put('/minus/:id', cart_items_controller.remove_one_quantity)

module.exports = router