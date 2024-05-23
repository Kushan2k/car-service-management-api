const { db } = require("./index")

const vehicleParts = [
  {
    name: "Engine",
    description:
      "The heart of the vehicle, responsible for converting fuel into power.",
    price: 2500000.0,
    img: "https://thumbs.dreamstime.com/b/car-engine-isolated-white-background-41884084.jpg",
    qty: 10,
  },
  {
    name: "Transmission",
    description:
      "Transfers engine power to the wheels, allowing for gear changes.",
    price: 180000.0,
    img: "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3RyYW5zbWlzc2lvbi1tb2RlbC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQwMH19fQ==",
    qty: 10,
  },
  {
    name: "Wheels",
    description:
      "Circular components that support the vehicle and allow it to roll.",
    price: 15000.0, // Assuming 4 wheels
    img: "https://files.ekmcdn.com/1a00e1/images/image-wheels-3-piece-billet-60-5810-p.jpg?w=1000&h=1000&v=20f6665d-deff-4165-9d9d-8d9edfcfe15d",
    qty: 10,
  },
  {
    name: "Tires",
    description:
      "Rubber coverings on the wheels that provide grip and absorb road shocks.4 packge",
    price: 10000.0, // Assuming 4 tires
    img: "https://static8.depositphotos.com/1000291/917/i/450/depositphotos_9171295-stock-photo-stack-of-four-car-wheel.jpg",
    qty: 10,
  },
  {
    name: "Brakes",
    description:
      "System that slows down or stops the vehicle by applying friction to the wheels.",
    price: 8000.0,
    img: "https://azproperformance.com/cdn/shop/products/LSM-8898-Kit-16_2000x.png?v=1575432126",
    qty: 10,
  },
  {
    name: "Battery",
    description:
      "Provides electrical power to start the engine and power various accessories.",
    price: 12000.0,
    img: "https://www.shutterstock.com/image-photo/car-battery-isolated-on-white-600nw-613722470.jpg",
    qty: 10,
  },
  {
    name: "Airbags",
    description:
      "Inflatable cushions that deploy in a crash to protect occupants.",
    price: 30000, // Assuming 2 airbags (driver & passenger)
    img: "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcms%2Farticles%2F2023%2F10%2F2875149%2Fl0f4sve8_car_625x300_10_April_22_ae00485be1.webp&w=640&q=75",
    qty: 10,
  },
  {
    name: "Steering wheel",
    description: "Controls the direction of the vehicle.",
    price: 20000.0,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJTgiK4xQfexpaN7oUJRcdblXyKFA5xcc9wfMT9qyJYw&s",
    qty: 10,
  },
  {
    name: "Dashboard",
    description: "Houses gauges and controls for the vehicle. full kit",
    price: 150000.0,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFaWZAgcwq6rRlx_vbCxp1rwaIX5iANo1Ni2W3jFXfA&s",
    qty: 10,
  },
  {
    name: "Seats",
    description: "Provides seating for passengers. per seat",
    price: 10000.0,
    img: "https://cdn.pixabay.com/photo/2015/12/19/10/27/seat-cushion-1099616_640.jpg",
    qty: 10,
    // Replace with actual number of seats
  },
  {
    name: "Seat belts",
    description: "Restraint system for occupants in case of a crash.",
    price: 5000.0,
    img: "https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-driver-seat-belt-in-flat-style-on-white-background-png-image_4933593.png",
    qty: 10,
    // Replace with actual number of belts
  },
  {
    name: "Air conditioning system",
    description: "Cools and dehumidifies the cabin.",
    price: 80000.0,
    img: "https://media.istockphoto.com/id/1318239818/photo/car-air-conditioning-system-air-condition-switched-on-maximum-cooling-mode.jpg?s=612x612&w=0&k=20&c=dB32-WZ1q-rzDbZgR1fv1nW8YTsE0V_zAWeUJdh-IrE=",
    qty: 10,
  },
  {
    name: "Infotainment system",
    description: "Provides audio, navigation, and communication features.",
    price: 50000.0,
    img: "https://www.cnet.com/a/img/resize/f03c59837eededf7233257069c5d3bc2f17b0e01/hub/2018/06/11/2cc2ff8d-b0fb-41a1-8edc-df69d7e6cee6/infotainment-ogi.jpg?auto=webp&fit=crop&height=900&width=1200",
    qty: 10,
  },
  // Exterior Parts
  {
    name: "Headlights",
    description: "Provide illumination for night driving.",
    price: 10000.0,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7A2OWnemnZ9xQt7Qe5YuJQGkKgJreRMOUzqFFLGET9g&s",
    qty: 10,
  },
  {
    name: "Taillights",
    description: "Signal braking and indicate the rear of the vehicle.",
    price: 5000.0,
    img: "https://img.freepik.com/free-photo/rear-light-modern-black-automobile_23-2147962994.jpg",
    qty: 10,
  },
  {
    name: "Windshield",
    description:
      "Transparent panel at the front that provides a view for the driver.",
    price: 30000.0,
    img: "https://www.shutterstock.com/image-photo/car-windshield-brushes-concept-cleaning-600nw-2059122509.jpg",
    qty: 10,
  },
  {
    name: "Side windows",
    description:
      "Transparent panels on the sides that allow light and provide a view for occupants.",
    price: 15000.0,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpLKrUFzYdW5Tay2iuoaS8BSxwnQLlLZVIYkH3pw-0w&s",
    qty: 20,
    // Replace with actual number of windows
  },
  {
    name: "Mirrors",
    description: "Provide the driver with a view of the rear and blind spots.",
    price: 7500.0,
    img: "https://dr282zn36sxxg.cloudfront.net/datastreams/f-d%3A0b122be3203151576726a095ed4a053a2a8d0487b1d04174977df855%2BIMAGE_THUMB_POSTCARD_TINY%2BIMAGE_THUMB_POSTCARD_TINY.1",
    qty: 16,
  },
  {
    name: "Bumpers",
    description: "Absorb impact in low-speed collisions.",
    price: 20000.0,
    img: "https://media.istockphoto.com/id/472463980/photo/three-different-car-bumpers-stacked.jpg?s=612x612&w=0&k=20&c=yLe9YIsk4sPTJtNzJSDJT65Ox8h2jrPCWNcDvDTwshg=",
    qty: 10,
  },
]

async function main() {
  await db.product.createMany({
    data: vehicleParts,
  })
}

main()
  .then((res) => console.log("Seeding done!"))
  .catch((er) => console.log(er))
