const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
	try {
		const mongoURI =
			process.env.MONGO_URI || "mongodb://localhost:27017/wordle-game";

		const conn = await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
		return conn;
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
