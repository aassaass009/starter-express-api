const {Router} = require('express')
const slider_controller = require('../../controllers/SliderController')

const router = Router()

router.get('/',slider_controller.AllSliderImages)
router.get('/:id',slider_controller.SliderImageById)
router.post('/',slider_controller.createSliderImage)
router.put('/:id',slider_controller.UpdateSliderImage)
router.delete('/:id',slider_controller.DeleteSliderImage)

module.exports = router