const express = require('express');
const cors = require('cors');
const { connection } = require('./lib/db');

const authRoutes = require('./routes/auth');
const materialRoutes = require('./routes/material');
const reservationRoutes = require('./routes/reservation');

require('./models/user');
require('./models/material');
require('./models/reservation');
require('./models/usageLog');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => res.send('API running'));

connection.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server started on port 3000'));
});