const BooksDB = require('../../booksDB.js');
const Books = BooksDB.getModel();
const bookUsersDB = require('../../bookUsersDB.js');
const BookUsers = bookUsersDB.getModel(); 



module.exports = async(req,res,next)=>{
    //RENDERING ADD USER VIEW
    
    let booksNotAvailable = await BookUsers.find({});

    let booksNotAvailableData = booksNotAvailable.map(book=>{
        return book.booksBorrowed;
    })

    let bookData = await Books.find({'title': {$nin:booksNotAvailableData} }); //filthering out the books that is already borrowed by the users
   

    let bookResults = bookData.map(book=>{
        return {
            title : book.title,
        }
    }) 

   
    res.render('addBookUserView', {title : "Add User", dropdown : bookResults})

}