const {Router} = require('express')
const wish_items_controller = require('../../controllers/wish_items')

const router = Router()

router.post('/create',wish_items_controller.Create_wish_item)
router.post('/',wish_items_controller.Read_wish_items)
router.get('/:id', wish_items_controller.Read_wish_item)
router.delete('/:id',wish_items_controller.Delete_wish_item)
router.put('/:id',wish_items_controller.Update_wish_item)

module.exports = router