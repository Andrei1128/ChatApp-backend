const router = require("express").Router();

const { get, getOne, add, update, remove } = require("../controller/employee");
const { employeeValidator } = require("../middleware/validators");

router.get("/:id/employee", get);
router.get("/:id/employee/:empId", getOne);
router.post("/:id/employee", employeeValidator, add);
router.put("/:id/employee/:empId", employeeValidator, update);
router.delete("/:id/employee/:empId", remove);

module.exports = router;
