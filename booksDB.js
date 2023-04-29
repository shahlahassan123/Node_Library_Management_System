const mongoose = require('mongoose');
const credentials = require('./credentials.js');
// const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;


let booksSchema = new Schema({
	author : String,
    country : String,
	imageLink : String,
    language : String,
    link : String,
    pages: Number,
    title : String,
    year : Number
}, {
	collection: 'books'
});


module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("BooksModel", 
							booksSchema);
		};
		return model;
	}
};


