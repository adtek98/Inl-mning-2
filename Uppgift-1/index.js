const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/index.html');
})

app.listen(3000);
console.log('Servern körs på localhost:3000');

app.post('/form', (req, res) => {
    let message = req.body.message;
    fs.appendFile('Guestbook.txt', message);
    res.send(message);
});


