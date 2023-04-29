const BooksDB = require('./booksDB.js');
const Books = BooksDB.getModel();

(async() => {
   

    //GETTING THE BOOKS DATA FROM COLLECTION
	let currentBooks = await Books.find({});

	console.log(currentBooks);

	process.exit();


})();