module.exports = (req, res, next) => {
    res.header('Cache-Control', 'public, max-age=10')
    res.removeHeader('Pragma');
    next();
}