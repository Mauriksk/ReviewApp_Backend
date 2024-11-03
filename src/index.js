const express = require("express")
const app = express()
const { getRestaurants } = require("./requests/getRestaurants")
const cors = require('cors');

app.listen(3000, async () => {
    console.log("running 3000 port")
})

app.use(cors());

app.get("/api/restaurants", async (req, res) => {
    const restaurants = await getRestaurants("Lepzig", 20)
    res.send(restaurants)
})


