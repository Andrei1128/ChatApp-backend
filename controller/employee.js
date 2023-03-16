const employeeModel = require("../model/employee");
const companyModel = require("../model/company");

const get = async (req, res) => {
  try {
    const companyFound = await companyModel
      .findById(req.params.id)
      .populate("employee");
    res.json(companyFound.employees);
  } catch (e) {
    res.status(400).send("Company not found!");
  }
};

const getOne = async (req, res) => {
  try {
    res.json(await employeeModel.findById(req.params.empId));
  } catch (e) {
    res.status(400).send("Employee not found!");
  }
};

const add = async (req, res) => {
  const companyFound = await companyModel.findById(req.params.id);
  const newEmployee = await employeeModel.create(req.body);
  companyFound.employees.push(newEmployee);
  await companyFound.save();
  res.json(newEmployee);
  try {
  } catch (e) {
    res.status(400).send("Company not found!");
  }
};

const update = async (req, res) => {
  try {
    await employeeModel.findByIdAndUpdate(req.params.empId, req.body);
    res.status(200).send("Succesfully modified!");
  } catch (e) {
    res.status(400).send("Employee not found!");
  }
};

const remove = async (req, res) => {
  try {
    await employeeModel.findByIdAndRemove(req.params.empId);
    res.status(200).send("Succesfully deleted!");
  } catch (e) {
    res.status(400).send("Employee not found!");
  }
};

module.exports = { get, getOne, add, update, remove };
