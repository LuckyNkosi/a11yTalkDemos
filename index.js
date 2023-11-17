const express = require('express');
const cors = require('cors');
const pa11y = require('pa11y');
const baseSites = require('./baseSites.json');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
// Array of sites to test
const sites = baseSites;
app.use(express.static('public'));

app.get('/testSite', async (req, res) => {
    console.log('test called');
    const url = req.query.url;
    const result = await pa11y(url);
    res.json(result);
});



app.get('sitesTested', (req, res) => {
    res.json(sites);
});

app.post('/addSite', (req, res) => {
    sites.push(req.query.url);
    res.json(sites);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
