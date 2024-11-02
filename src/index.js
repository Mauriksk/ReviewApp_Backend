const express = require("express")
const app = express()
const { getRestaurants } = require("./requests/getRestaurants")

app.listen(3000, async () => {
    const restaurants = await getRestaurants("Lepzig", )
    console.log("running 3000 port", restaurants)
})

app.get("/api/restaurants", async (req, res) => {
    const restaurants = await getRestaurants("Lepzig", 20)
    res.send(restaurants)
})


