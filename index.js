const express = require("express")
const cors = require("cors")
const { db } = require("./utils/index")
const app = express()
require("dotenv").config()
const authMidleware = require("./midleware/checklogin.jwt")
//routes
const authRoutes = require("./routes/auth.routes")
const vechicalRoutes = require("./routes/vehical.route")
const serviceRoutes = require("./routes/service.route")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send({ msg: "hello world" }).status(200)
})

app.use("/api/auth", authRoutes)
app.use("/api/vehicals", authMidleware, vechicalRoutes)
app.use("/api/services", authMidleware, serviceRoutes)

db.$connect()
  .then(() => {
    app.listen(8080, () => {
      console.log("listing on port 8080")
    })
  })
  .catch((reason) => {
    console.log("Error db connect Reason:- " + reason)
  })
