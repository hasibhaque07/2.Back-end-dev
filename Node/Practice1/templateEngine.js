const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.route('/about/mission')
    .get((req, res) => {
        res.render('pages/about');
    })
    .post((req, res) => {
        res.send('home post');
    })
    .put((req, res) => {
        res.send('home put');
    });

app.listen(3001, () => {
    console.log('listening on port 3000');
});
