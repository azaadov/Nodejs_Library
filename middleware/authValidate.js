const { AuthValidate, loginValidate, emailVerifyValidate, resendCodeValidate, forgotPasswordValidate, changePasswordValidate } = require("../validation/auth.validate")

const registerValidate = (req, res, next) => {
  const { error } = AuthValidate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details.map(e => e.message)
    });
  }
  next();
};

const loginValidateMiddleware = (req, res, next) => {
  const { error } = loginValidate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details.map(e => e.message)
    });
  }
  next();
};

const emailVerifyValidateMiddleware = (req, res, next) => {
  const { error } = emailVerifyValidate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details.map(e => e.message)
    });
  }
  next();
};

const resendCodeValidateMiddleware = (req, res, next) => {
  const { error } = resendCodeValidate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details.map(e => e.message)
    });
  }
  next();
};

const forgotPasswordValidateMiddleware = (req, res, next) => {
  const { error } = forgotPasswordValidate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details.map(e => e.message)
    });
  }
  next();
};

const changePasswordValidateMiddleware = (req, res, next) => {
  const { error } = changePasswordValidate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details.map(e => e.message)
    });
  }
  next();
};

module.exports = {
  registerValidate,
  loginValidateMiddleware,
  emailVerifyValidateMiddleware,
  resendCodeValidateMiddleware,
  forgotPasswordValidateMiddleware,
  changePasswordValidateMiddleware
}
