const express = require('express');

const app = express();
const admin = express(); //here admin is sub app

admin.get('/dashboard', (req, res) => {
    console.log(admin.mountpath);
    res.send('welcome to admin dashboard');
});
app.get('/', (req, res) => {
    res.send('welcome to application homepage');
});

app.use('/admin', admin);

app.listen(3000, () => {
    console.log('listening on port 3000');
});
