const booksDB = require('../../booksDB.js');
const Books = booksDB.getModel();
const bookUsersDB = require('../../bookUsersDB.js');
const BookUsers = bookUsersDB.getModel(); 
const newOrdersDB = require('../../newOrdersDB.js');
const Orders = newOrdersDB.getModel(); 

module.exports = async (req,res,next)=>{
    //DISPLAYING LIST OF BOOKS

    let booksNotAvailable = await BookUsers.find({});
    console.log(booksNotAvailable)
   

    // current day and time
    const currentDate = new Date();
    const currentTime = currentDate.getTime();


 // filthering out the books that is already borrowed by the users and  the actual return date is greater than current date. These books will not be displayed under Books sectiom
    let filterBooks = booksNotAvailable.filter(book => {
        let d =  new Date(book.actualReturnDate);
       return  d.getTime() > currentTime
}).map(ele =>  ele.booksBorrowed);




    let bookData = await Books.find({'title': {$nin:filterBooks} }); //filthering out the books  by $nin operator
    let bookResults = bookData.map(book=>{
        return {
            id : book._id,
            title : book.title,
            author : book.author,
            language : book.language
        }
    }) 

//SENDING RESPONSE IN JSON, XML AND HTML FORMAT
    res.format({

		'application/json': function() {
			res.json(bookData);   //JSON
		},

		'application/xml': function() {
			let resultXml = 
				'<?xml version="1.0"?>\n' +
                bookData.map(book=>{     //XML
                    return '<book>\n' + 
                    '   <title>' + book.title + '</title>\n' + 
                    '   <author>' + book.author + '</author>\n' + 	
                    '   <language>' + book.language + '</language>\n' + 				 
                    '</book>\n'
                });
						
			res.type('application/xml');
			res.send(resultXml);
		},

		'text/html': function() {
			res.render('displayBooksView',{ title : "List of Books", data : bookResults })

		}
	});
}