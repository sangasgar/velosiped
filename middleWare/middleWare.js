const checkSession = (req, res, next) => {
  if (req.session.id) {
    res.locals.user = {
      email: req.session.email,
      id: req.session.id,
      ids: req.session.ids,
      name: req.session.name,
    };
    return next();
  }
  return next();
};
module.exports = checkSession;
