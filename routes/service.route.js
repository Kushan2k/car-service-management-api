const Router = require("express").Router()
const { db } = require("../utils/index")

Router.get("", async (req, res) => {
  const servicesall = await db.service.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
      vehical: true,
    },
  })
  res.send(servicesall).status(200)
})

Router.get("/:id", async (req, res) => {
  const { id } = req.params

  if (!id) {
    res.send({ msg: "unauthorized!" }).status(400)
    return
  }

  const serives = await db.service.findMany({
    where: {
      user_id: id,
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
      vehical: true,
    },
  })

  res.send(serives).status(200)
})

Router.patch("/update", async (req, res) => {
  const { sid, status, total } = req.body
  // console.log(sid)
  if (!sid) {
    res.send({ msg: "unauthorized!" }).status(400)
    return
  }

  const service = await db.service.update({
    where: {
      id: sid,
    },
    data: {
      status: status,
      total: parseInt(total),
    },
  })

  res.send(service).status(201)
})

Router.post("", async (req, res) => {
  const data = req.body

  if (!data.type || !data.user_id || !data.vehical_id) {
    res.send({ msg: "all fileds are required!" }).status(400)
    return
  }

  try {
    await db.service.create({
      data: {
        ...data,
      },
    })
    res.send({ msg: "Created" }).status(201)
  } catch (error) {
    res.send({ msg: "failed!" }).status(500)
  }
})

module.exports = Router
