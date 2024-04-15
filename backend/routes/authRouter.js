const router = require('express').Router();
const jwt = require('jsonwebtoken');
const generateJWTToken = require('../services/signToken');
const bcrypt = require('bcrypt');

const QuestionUserSchema = require('../models/UserModel');

router.post('/register', async(req, res) => {
  const {firstName,lastName,email,password} = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.json({msg: 'All fields is required'})
    return
  }

  const existsUser = await QuestionUserSchema.findOne({email});
  if (existsUser) {
    res.json({msg: 'Email Allready Exists'})
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await QuestionUserSchema.create({
    ...req.body,
    password: hashedPassword
  });

  const token = generateJWTToken(data._id);
  res.json({data,token, statusCode:200})
})

router.post('/login', async(req, res) => {
  const {email,password} = req.body;
  if (!email || !password) {
    res.status(200).json({msg: 'All fields is required',statusCode:201})
    return
  }

  const data = await QuestionUserSchema.findOne({email});
  if (!data) {
    res.status(200).json({msg: 'User Not Found', statusCode:201})
    return
  }

  const comPass = await bcrypt.compare(password, data.password);
  if (!comPass) {
    res.status(200).json({msg: 'Password Wrong', statusCode:201})
    return
  }

  const token = generateJWTToken(data._id);
  res.status(200).json({data,token, statusCode:200})
})

module.exports = router
