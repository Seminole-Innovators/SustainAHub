const express = require('express');
const app = express(); 
const path = require('path');

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});