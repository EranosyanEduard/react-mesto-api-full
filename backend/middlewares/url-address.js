function checkUrlAddress(req, res, next) {
  const origin = req.get('origin');
  const urlAddressPattern = /^https?:\/{2}(w{3}\.)?mesto\.ered\.students\.nomoreparties\.co$/;
  if (urlAddressPattern.test(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
}

module.exports = checkUrlAddress;
