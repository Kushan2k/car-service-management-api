const Router = require("express").Router()
var easyinvoice = require("easyinvoice")
const { db } = require("../utils/index")
require("dotenv").config()
const fs = require("fs")
const path = require("path")

Router.get("/:item_id", async (req, res) => {
  const { item_id } = req.params

  if (!item_id) {
    res.send({ msg: "item id is required!" }).status(400)
    return
  }

  try {
    const product = await db.product.findUnique({
      where: {
        id: item_id,
      },
    })

    res.send(product).status(200)
  } catch (error) {
    res.send({ msg: "error", error: error }).status(500)
  }
})

Router.get("", async (req, res) => {
  const products = await db.product.findMany({
    orderBy: {
      created_at: "desc",
    },
  })

  // console.log(req.hostname, req.baseUrl)

  res.send(products).status(200)
})

Router.post("/create-order", async (req, res) => {
  const { user_id, product_id, qty, total } = req.body

  if (!user_id || !product_id || !qty || !total) {
    res.send({ msg: "all fields are required!" }).status(400)
    return
  }

  try {
    const product = await db.product.findUnique({
      where: {
        id: product_id,
      },
    })

    if (product.qty < qty) {
      res.send("quantity not available!").status(404)
      return
    }

    const order = await db.order.create({
      data: {
        qty,
        total,
        product_id,
        user_id,
      },
      select: {
        created_at: true,
        id: true,
        qty: true,
        total: true,

        user: true,
      },
    })

    await db.product.update({
      where: {
        id: product_id,
      },
      data: {
        qty: product.qty - parseInt(qty),
      },
    })

    var data = {
      apiKey: process.env.API_KEY, // Please register to receive a production apiKey: https://app.budgetinvoice.com/register
      mode: "development", // Production or development, defaults to production
      // images: {
      //   // The logo on top of your invoice
      //   logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
      //   // The invoice background
      //   background: "https://public.budgetinvoice.com/img/watermark-draft.jpg",
      // },
      // Your own data

      sender: {
        company: "Auto Care PVT LTD",
        address: "Colombo 04",
        zip: "12800",
        city: "Colombo",
        country: "Sri Lanka",
        // custom1: "custom value 1",
        // custom2: "custom value 2",
        // custom3: "custom value 3"
      },
      // Your recipient

      // country: user.address?.split(",")[3],
      //   city: user.address?.split(",")[1],
      //   street: user.address?.split(",")[0],
      //   zip: parseInt(user.address?.split(",")[4]),
      //   state: user.address?.split(",")[2]
      client: {
        company: order.user.first_name + " " + order.user.last_name,
        address: order.user.address,
        zip: order.user.address?.split(",")[4].toString(),
        city: order.user.address?.split(",")[1],
        country: order.user.address?.split(",")[3],
        // custom1: "custom value 1",
        // custom2: "custom value 2",
        // custom3: "custom value 3"
      },
      information: {
        // Invoice number
        number: order.id.slice(0, 7),
        // Invoice data
        date: order.created_at.toUTCString(),
        // Invoice due date
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: [
        {
          quantity: order.qty,
          description: product.name,
          taxRate: 0,
          price: order.total.toFixed(2).toString(),
        },
      ],
      // The message you would like to display on the bottom of your invoice
      bottomNotice: "Cash on Delivary!.",
      // Settings to customize your invoice
      settings: {
        currency: "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // locale: "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // marginTop: 25, // Defaults to '25'
        // marginRight: 25, // Defaults to '25'
        // marginLeft: 25, // Defaults to '25'
        // marginBottom: 25, // Defaults to '25'
        // format: "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // height: "1000px", // allowed units: mm, cm, in, px
        // width: "500px", // allowed units: mm, cm, in, px
        // orientation: "landscape" // portrait or landscape, defaults to portrait
      },
    }

    // console.log(data)

    // const invoice = await IN.createInvoice(data)
    const invoice = await easyinvoice.createInvoice(data)
    const filename = `${order.id.slice(0, 10)}-invoice.pdf`
    fs.writeFileSync(path.join("public", filename), invoice.pdf, "base64")

    const filelocation = `${process.env.SERVER_URL}/${filename}`

    res.setHeader("Content-Type", "application/json")

    //
    res.send(filelocation).status(201)
  } catch (error) {
    console.log(error)
    res.send({ msg: "order placing failed!", error: error }).status(500)
  }
})

Router.post("", async (req, res) => {
  const { name, description, price, imageUrl, qty } = req.body

  if (!name || !description || !price || !imageUrl || !qty) {
    res.send({ msg: "all fileds are required" }).status(400)
    return
  }
  try {
    const newproduct = await db.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        img: imageUrl,
        qty: qty,
      },
    })

    res.send({ newproduct }).status(201)
  } catch (er) {
    res.send({ msg: "error", error: er }).status(500)
  }
})

Router.delete("/:item_id", async (req, res) => {
  const { item_id } = req.params

  if (!item_id) {
    res.send({ msg: "all fileds are required" }).status(400)
    return
  }

  try {
    await db.product.delete({
      where: {
        id: item_id,
      },
    })
    res.send({ msg: "deleted!" }).status(201)
  } catch (er) {
    console.log(er)
    res.send({ msg: "error", error: er }).status(500)
  }
})

Router.put("/:item_id", async (req, res) => {
  const { item_id } = req.params

  if (!item_id) {
    res.send({ msg: "all fileds are required" }).status(400)
    return
  }

  const { name, description, price, imageUrl, qty } = req.body

  if (!name || !description || !price || !imageUrl || !qty) {
    res.send({ msg: "all fileds are required" }).status(400)
    return
  }

  try {
    const product = await db.product.update({
      where: {
        id: item_id,
      },
      data: {
        name: name,
        description: description,
        price: price,
        img: imageUrl,
        qty: qty,
      },
    })

    res.send(product).status(201)
  } catch (error) {
    console.log(er)
    res.send({ msg: "error", error: er }).status(500)
  }
})

module.exports = Router
