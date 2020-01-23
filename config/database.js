const mongoose = require('mongoose');

mongoose.connect(process.env.DATEBASE_URL,
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const db = mongoose.connection;

db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
    })
    