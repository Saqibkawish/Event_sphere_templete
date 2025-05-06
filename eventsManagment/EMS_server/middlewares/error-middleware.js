const errorMiddleware = (err, req, res, next) => {
  // res.status(err.status || 500).json({
  //   message: err.message,
  //   error: err,
  // });
  const status = err.status || 500;
  const message = err.message || "Backend Error";
  const extraDetails = err.extraDetails || "Error from Backend";
  return res.status(status).json({message, extraDetails});
}

module.exports = errorMiddleware;