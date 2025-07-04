const { BookValidate } = require("../validation/book.validate");


module.exports = function (req, res, next) {
    const { error } = BookValidate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details.map(e => e.message)
      });
    }
    next();
  };