const jwt = require("jsonwebtoken")
const { db } = require("../utils/index")
require("dotenv").config()

module.exports = (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization

  if (!header) {
    res.status(400).send({ msg: "unauthorized!" })
    return
  }

  const token = header.split("Bearer ")[1]

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    {
      algorithms: "HS256",
    },
    (er, decoded) => {
      if (er) {
        res.status(401).send({ msg: er })
        return
      }

      req.user = decoded
      next()
    }
  )
}
