const e = require("express");
const { database } = require("../config/db");
const employeesCollection = database.collection("employees");

const addData = async (req, res) => {
  const data = req.body;
  const result = await employeesCollection.insertMany(data);
  res.send({ msg: "successfully added", data: result });
};

const fetchData = async (req, res) => {
  const data = await employeesCollection.find().toArray();
  res.send({ msg: "data read successfully", result: data });
};

const salary = async (req, res) => {
  const data = await employeesCollection
    .find({ salary: { $gt: "30000" } })
    .toArray();
  res.send({ msg: "data read successfully", result: data });
};

const experience = async (req, res) => {
  const data = await employeesCollection
    .find({ overallExp: { $gt: "2" } })
    .toArray();
  res.send({ msg: "data read successfully", result: data });
};

const graduationAndExperience = async (req, res) => {
  const data = await employeesCollection
    .find({ yearGrad: { $gt: "2015" }, overallExp: { $gt: "1" } })
    .toArray();
  res.send({ msg: "data read successfully", result: data });
};

const updateSalary = async (req, res) => {
  let updatedSalary = await employeesCollection.updateMany(
    { salary: { $gt: "30000" } },
    { $set: { salary: "48888" } }
  );
  res.send({ msg: "update successfully", result: updatedSalary });
};

const deleteLastCompany = async (req, res) => {
  const deletedData = await employeesCollection.deleteMany({ lastCompany: "Y" });
  res.send({ msg: "deleted successfully" });
};

module.exports = {
  addData,
  fetchData,
  salary,
  experience,
  graduationAndExperience,
  updateSalary,
  deleteLastCompany,
};