const express = require('express');
const cors = require('cors');
const { connection } = require('./lib/db');


const authRoutes = require('./routes/auth');
const materialRoutes = require('./routes/material');
const reservationRoutes = require('./routes/reservation');


const User = require('./models/user');
const Material = require('./models/material');
const Reservation = require('./models/reservation');
const UsageLog = require('./models/usageLog');


Material.hasMany(Reservation);
Reservation.belongsTo(Material);

User.hasMany(Reservation, { foreignKey: 'clientName' });
Reservation.belongsTo(User, { foreignKey: 'clientName' });

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => res.send('API running'));


const startServer = async () => {
    try {
        
        await connection.sync(); 
        
        console.log('✅ Database synced & Associations OK');
        app.listen(3000, () => console.log('🚀 Server started on port 3000'));
    } catch (error) {
        console.error('❌ Erreur au démarrage :', error);
    }
};

startServer();