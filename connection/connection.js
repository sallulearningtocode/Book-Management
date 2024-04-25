const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Book",).then(() => { console.log("Connected to The Database"); })