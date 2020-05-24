const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline.bold)
    } catch (err) {
        console.error(`Error: ${err.message}`.red)
        process.exit(1)
    }
}

module.exports = connectDB