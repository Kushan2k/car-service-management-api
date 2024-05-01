const express = require("express")
const { db } = require("../utils/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const Router = express.Router()

const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
}

Router.get("/", (req, res) => {
  res.send({ auth: "welcome" }).status(200)
})

Router.post("/register", async (req, res) => {
  const data = req.body

  console.log(data)

  if (!data.email || !data.password || !data.first_name || !data.last_name) {
    console.log("fileds required!")
    res.send({ msg: "all the fileds is required!" }).status(401)
    return
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (existingUser) {
    console.log("user found!")
    res.status(403).send({ msg: "user already registerd!" })
    return
  }

  data.password = await bcrypt.hash(data.password, 10)

  const user = await db.user.create({
    data: {
      role: ROLES.USER,
      ...data,
    },
  })

  res.status(201).send({ msg: "user registerd!", user })
})

//admin registration
Router.post("/register/admin", async (req, res) => {
  const data = req.body

  console.log(data)

  if (data.secrent != process.env.ADMIN_KEY) {
    res.send({ msg: "un authorized!" }).status(402)
    return
  }

  if (!data.username || !data.password) {
    res.send({ msg: "all the fileds is required!" }).status(401)
    return
  }

  const existingUser = await db.admin.findUnique({
    where: {
      username: data.username,
    },
  })

  if (existingUser) {
    console.log("user found!")
    res.status(403).send({ msg: "user already registerd!" })
    return
  }

  data.password = await bcrypt.hash(data.password, 10)

  const user = await db.admin.create({
    data: {
      ...data,
    },
  })

  res.status(201).send({ msg: "admin registerd!", user })
})

Router.post("/login", async (req, res) => {
  const data = req.body

  console.log(data)

  if (!data.email || !data.password) {
    res.status(403).send({ msg: "input required!" })
    return
  }

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    res.status(404).send({ msg: "Not found!" })
    return
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password)

  if (!passwordMatch) {
    res.status(401).send({ msg: "unauthorized! password miss match" })
    return
  }

  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
      id: user.id,
    },
    process.env.JWT_SECRET,
    { algorithm: "HS256" }
  )

  const responseuser = {
    email: user.email,
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    address: user.address,
    role: user.role,
    contact: user.contact_no,
  }

  res.status(200).send({ token, responseuser })
})

Router.patch("/users/:id", async (req, res) => {
  const data = req.body

  console.log(data)
  const id = req.params.id

  if (!id) {
    res.status(404).send({ msg: "id required" })
    return
  }

  const user = await db.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    res.status(404).send({ msg: "id required" })
    return
  }

  try {
    const updateduser = await db.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })
    res.status(201).send({ user: updateduser })
  } catch (er) {
    res.status(500).send(er)
  }
})

module.exports = Router
