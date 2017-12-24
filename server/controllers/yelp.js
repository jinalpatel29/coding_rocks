const yelp = require('yelp-fusion');
const config = require('../config/config.json');
const apiKey = config.yelp.Key;
const client = yelp.client(apiKey);
module.exports = {
    searchOne: function (req, res) {
        client.search(req.body).then(response => {
            var diceRoll=Math.floor(Math.random()*response.jsonBody.businesses.length);
            const firstResult = response.jsonBody.businesses[diceRoll];
            const prettyJson = JSON.stringify(firstResult, null, 4);
            console.log(prettyJson);
            res.json(firstResult);
        }).catch(e => {
            console.log(e);
        })
    }
}