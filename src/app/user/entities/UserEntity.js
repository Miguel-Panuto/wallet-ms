module.exports = (user) => ({
  _userId: user._id || null,
  name: user.name || null,
  document: user.document || null,
});
