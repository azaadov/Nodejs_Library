const { AuthValidate } = require("../validation/auth.validate")


module.exports = function (req, res, next) {
    const { error } = AuthValidate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details.map(e => e.message)
      });
    }
    next();
  };