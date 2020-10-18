module.exports = {
  lintOnSave: false,
  devServer: {
    // I forgot why I turned this one, but if I turn it on Firebase Auth
    // no longer works due to invalid SSL cert. ugh...
    https:false
  }
};
