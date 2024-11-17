const express = require("express")
const app = express()
const { getPlaces } = require("./requests/getPlaces")
const cors = require('cors');



app.listen(3000, async () => {
    console.log("running 3000 port")
})


app.use(cors());

app.get("/api/places", async (req, res) => {
    const place = req.query.place || "Berlin";
    const type = req.query.type || "tourist_attraction"
    const places = await getPlaces(place, 20, type)
    res.send(places)
})


