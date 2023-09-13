const { Router } = require('express')
const image_controller = require('../../controllers/imageController')

const router = Router()

router.get('/', image_controller.AllImages)
router.get('/:id', image_controller.ImageById)
router.post('/', image_controller.createImage)
router.put('/:id', image_controller.UpdateImage)
router.delete('/:id', image_controller.DeleteImage)

module.exports = router