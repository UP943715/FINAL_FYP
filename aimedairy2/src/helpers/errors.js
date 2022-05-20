// 40*

const BadRequest = (res, message) => {
  return res.status(400).send({ messages: [{ message }] });
};

const UnauthorizedRequest = (res, message) => {
  return res.status(401).send({ messages: [{ message }] });
};

//50*

const ServerError = (res, message) => {
  return res.status(500).send({ messages: [{ message }] });
};

//General Error
const GenerateError = (res, err) => {
  return res
    .status(500)
    .send(err.message ? { messages: [{ message: err.message }] } : err);
};

module.exports = {
  ServerError,
  BadRequest,
  UnauthorizedRequest,
  GenerateError,
};
