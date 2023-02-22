const { Router } = require("express");
const { validateLoginToken } = require("../utils/JWT");

const router = new Router();

const {
  postLogin,
  postRegister,
  getProfile,
  confirmAccount,
  forgotPassword,
  resetPassword,
  resetPassPost,
} = require("../controllers/auth");

router.route("/login").get(validateLoginToken, getProfile).post(postLogin);
router.post("/register", postRegister);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id", resetPassPost);
router.get("/reset-password/:id/:token", resetPassword);
router.get("/confirm/:token", confirmAccount);

module.exports = router;
