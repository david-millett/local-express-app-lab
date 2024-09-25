const express = require('express')
const morgan = require('morgan')

//Variables

const app = express()
const port = 3000

//Dummy database

const nintendoSeries = [
    { id: 1, title: 'pokemon', genre: 'rpg', character: 'pikachu' },
    { id: 2, title: 'super mario', genre: 'platformer', character: 'mario' },
    { id: 3, title: 'the legend of zelda', genre: 'action-adventure', character: 'link' },
]

//Middleware

app.use(express.json())

app.use(morgan('dev'))

//Index route

app.get('/nintendo-series', (req, res) => {
    try {
        return res.send(nintendoSeries)
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Show route

app.get('/nintendo-series/:seriesId', (req, res) => {
    try {
        const seriesId = Number(req.params.seriesId)
        const foundSeries = nintendoSeries.find(series => {
            return series.id === seriesId
        })
        if (foundSeries) {
            res.send(foundSeries)
        } else {
            return res.status(404).send('Series not found')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Create route

app.post('/nintendo-series', (req, res) => {
    try {
        req.body.id = nintendoSeries.length + 1
        nintendoSeries.push(req.body)
        return res.status(201).send(req.body)
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Delete route

app.delete('/nintendo-series/:seriesId', (req, res) => {
    try {
        const seriesId = Number(req.params.seriesId)
        nintendoSeries.forEach((series, index) => {
            if (series.id === seriesId) {
                nintendoSeries.splice(index, 1)
            }
        })
        return res.status(204).send('This entry has been successfully removed')
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Update route

app.put('/nintendo-series/:seriesId', (req, res) => {
    try {
        const seriesId = Number(req.params.seriesId)
        nintendoSeries.forEach((series, index) => {
            if (series.id === seriesId) {
                nintendoSeries.splice(index, 1, req.body)
            }
        })
        return res.status(201).send('This entry has been udpated')
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//404 handlers

app.use('*', (req, res) => {
    return res.status(404).send('Resource not found')
})

//Express server

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
