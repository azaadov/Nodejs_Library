const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(el => el.message);
        return res.status(400).json({ msg: errors });
    }

    res.status(err.status || 500).json({
        msg: err.message || "Serverda kutilmagan xatolik yuz berdi"
    });
};

module.exports = errorHandler;
