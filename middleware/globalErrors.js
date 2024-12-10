export const globalError=(err, req, res, next) => {
    let statuscode=err.code||500
  res.status(statuscode).json({ message: "error",statuscode ,message:err.message });
}