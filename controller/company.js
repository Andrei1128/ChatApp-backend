const companyModel = require("../model/company");

const get = async (req, res) => {
  res.json(await companyModel.find({}).populate("employee"));
};
const getOne = async (req, res) => {
  try {
    res.json(await companyModel.findById(req.params.id).populate("employee"));
  } catch (e) {
    res.status(400).send("Company not found!");
  }
};
const add = async (req, res) => {
  const newCompany = await companyModel.create(req.body);
  res.json(newCompany);
};
const update = async (req, res) => {
  try {
    await companyModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("Succesfully modified!");
  } catch (e) {
    res.status(400).send("Company not found!");
  }
};
const remove = async (req, res) => {
  try {
    await companyModel.findByIdAndRemove(req.params.id);
    res.status(200).send("Succesfully deleted!");
  } catch (e) {
    res.status(400).send("Company not found!");
  }
};

module.exports = { get, getOne, add, update, remove };
