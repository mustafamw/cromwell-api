const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const errorResponse = (res, error) => {
    res.statusCode = error.code;
    res.send({
      message: error.message
    });
};

module.exports = { capitalize, errorResponse };