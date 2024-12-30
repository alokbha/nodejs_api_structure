const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mainRoutes = require('./src/Routes/mainRoutes')

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', mainRoutes);
const port = process.env.PORT;
app.listen(port,() => console.log(`Connected to port ${port}`));