const Router = require("express").Router()
const { db } = require("../utils/index")

Router.get("", async (req, res) => {
  //authoprizatino header required!
  const id = req.query.id

  // console.log(req.query)

  if (!id || id == "undefined") {
    res.status(401)
    return
  }
  const vehicals = await db.vehicle.findMany({
    where: {
      user: {
        id: id,
      },
    },
    orderBy: {
      created_at: "desc",
    },
  })

  res.status(200).send(vehicals)
})

Router.post("", async (req, res) => {
  const data = req.body

  if (!data.model || !data.year || !data.type || !data.number) {
    res.status(400).send({ msg: "All the fileds are required!" })
    return
  }

  const car = await db.vehicle.findUnique({
    where: {
      number: data.number,
    },
  })

  if (car) {
    res.status(201).send({ msg: "already registerd!" })
    return
  }

  const newcar = {
    type: data.type,
    model: data.model,
    year: parseInt(data.year),
    number: data.number,
    owner_id: data.userid,
  }

  await db.vehicle.create({
    data: newcar,
  })

  res.status(201).send({ msg: "Creted!" })
})

module.exports = Router
