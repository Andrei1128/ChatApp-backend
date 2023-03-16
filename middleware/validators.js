const companyValidator = (req, res, next) => {
  const company = req.body;
  if (company.name) next();
  else res.status(400).send("Invalid credentials!");
};
const employeeValidator = (req, res, next) => {
  const employee = req.body;
  if (employee.firstName && employee.lastName && employee.salary) next();
  else res.status(400).send("Invalid credentials!");
};

module.exports = { companyValidator, employeeValidator };
