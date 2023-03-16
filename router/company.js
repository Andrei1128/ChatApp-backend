const router = require("express").Router();

const { get, getOne, add, update, remove } = require("../controller/company");
const { companyValidator } = require("../middleware/validators");

router.get("/:id", getOne);
router.get("/", get);
router.post("/", companyValidator, add);
router.put("/:id", companyValidator, update);
router.delete("/:id", remove);

module.exports = router;
