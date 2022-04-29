const cheerio = require('cheerio')
const axios = require('axios')
const express = require('express')
const { response } = require('express')
const { append } = require('express/lib/response')
const portNum = 5550

const webscrape = express()
const cors = require('cors')
webscrape.use(cors())

const scrapeURL = 'https://www.cisa.gov/uscert/ncas/current-activity'

webscrape.get('/', function (req, res) {
    res.json("This is my webscraper")

})

webscrape.get('/results', function (req, res) {
    axios(scrapeURL)
    .then(response => {
        const markup = response.data
        const querySelector = cheerio.load(markup)
        const lastestVulns = []


        querySelector('.views-row', markup).each(function() {
            const title = querySelector(this).find(".entry-title").text()
            const date = querySelector(this).find(".entry-date").text()
            const desc = querySelector(this).find(".field-content").find("p").text()
            const link = querySelector(this).find(".field-content").find("a").attr("href")

            lastestVulns.push({
                title,
                date,
                desc,
                link

            })
        })
        res.json(lastestVulns)
    }).catch(err => console.log(err))

})


    

webscrape.listen(portNum, () => console.log('backend server is on port ' + portNum))