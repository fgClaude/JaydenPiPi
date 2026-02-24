const express = require("express")
const app = express()

app.use(express.json())

const AUTH_KEY = "Tuff123"
const AUTH_HEADER = "JayJay"
const CLEAN_INTERVAL = 10 * 60 * 1000

let entries = []

setInterval(() => {
    entries = []
}, CLEAN_INTERVAL)

app.get("/latest", (req, res) => {
    res.json(entries)
})

app.post("/ski_", (req, res) => {
    if (req.headers[AUTH_HEADER.toLowerCase()] !== AUTH_KEY) {
        return res.status(401).json({ error: "unauthorized" })
    }

    const { players, jobid, timestamp, value, brainrot } = req.body

    if (!players || !jobid || !timestamp || value === undefined || !brainrot) {
        return res.status(400).json({ error: "missing fields" })
    }

    entries.push({ players, jobid, timestamp, value, brainrot })

    res.json({ ok: true })
})

module.exports = app
