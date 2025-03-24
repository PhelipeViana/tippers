const express = require("express");
const {
  create,
  getAll,
  getId,
  update,
  remove,
} = require("../controllers/noteController");

const router = express.Router();

router.route("/note/create").post(create);

router.route("/note").get(getAll);

router.route("/note/:id").get(getId);

router.route("/note/:id").patch(update);

router.route("/note/:id").delete(remove);
module.exports = router;
