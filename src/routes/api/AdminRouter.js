const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  viewProfile,
  signUp,
  login
} = require("../../controllers/AdminController");

router.get("/view_profile", checkToken, viewProfile);
router.post("/sign_up", signUp);
router.post("/login", login);

module.exports = router;
