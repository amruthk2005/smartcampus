const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // prefer an environment variable, but fall back to the service name used in docker-compose
        const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/smartcampus';
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
