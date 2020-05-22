const express = require('express');
const router = express.Router();
const { UserService } = require('../../services/user-service');
const { errorResponse } = require('../../utils/utils');

const mapping = 'user';

router.post(`/${mapping}/login`, async (req, res) => {
  const data = req.body;
  try {
    const message = await new UserService().login(data);
    res.send(message);
  } catch (error) {
    errorResponse(res, error);
  }
});

router.post(`/${mapping}/signup`, async (req, res) => {
  const data = req.body;
  try {
    const message = await new UserService().signup(data);
    res.send(message);
  } catch (error) {
    errorResponse(res, error);
  }
});

module.exports = router;