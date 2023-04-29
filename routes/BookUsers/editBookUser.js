const bookUsersDB = require('../../bookUsersDB.js');
const BookUsers = bookUsersDB.getModel(); 

const BooksDB = require('../../booksDB.js');
const Books = BooksDB.getModel();

module.exports = async(req,res,next)=>{
    //RENDERING EDIT BOOK VIEW

    let id = req.params.id;
    id = id.substring(1,id.length) //removing the colon
   

    //To get the dropdown values for Book Borrowed field
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


    BookUsers.findById(id,function(err,book){ //finding the book for editing
        if(err){
            console.log("Error is ", err);
        }
        if(!book){ //When there is no book of given id
            res.render('errorView')
        }
        
         //Checking if expected Return Date has value or not
         if(book.expectedReturnDate ===undefined){
            var expectDate = book.expectedReturnDate;
        }else{
            var expectDate = book.formatDate('expectedReturnDate');
        }
         //Checking if Issue Date has value or not
        if(book.issuedDate ===undefined){
            var issueDate = book.issuedDate;
        }else{
            var issueDate = book.formatDate('issuedDate');
        }

         //Checking if Actual Return Date has value or not
         if(book.actualReturnDate ===undefined){
            var returnDate = book.actualReturnDate;
        }else{
            var returnDate = book.formatDate('actualReturnDate');
        }

        let resultdata = {
            id : book._id,
            fullName : book.fullName,
            email : book.email,
            idType : book.idType,
            booksBorrowed : book.booksBorrowed,
            issuedDate : issueDate,
            expectedReturnDate: expectDate,
            actualReturnDate : returnDate,
            isFined : book.isFined,
            fineAmount : book.fineAmount
        }

        //SENDING RESPONSE IN JSON, XML AND HTML FORMAT
        res.format({

            'application/json': function() {
                res.json(resultdata);
            },
    
            'application/xml': function() {
                let resultXml = 
                    '<?xml version="1.0"?>\n' +
                    '<book id="' + resultdata.id + '">\n' + 
                    '   <fullName>' + resultdata.fullName + '</fullName>\n' + 
                    '   <email>' + resultdata.email + '</email>\n' + 	
                    '   <idType>' + resultdata.idType + '</idType>\n' + 	
                    '   <booksBorrowed>' + resultdata.booksBorrowed + '</booksBorrowed>\n' + 	
                    '   <issuedDate>' + resultdata.issuedDate + '</issuedDate>\n' + 	
                    '   <expectedReturnDate>' + resultdata.expectedReturnDate + '</expectedReturnDate>\n' + 	
                    '   <actualReturnDate>' + resultdata.actualReturnDate + '</actualReturnDate>\n' + 	
                    '   <isFined>' + resultdata.isFined + '</isFined>\n' + 	
                    '   <fineAmount>' + resultdata.fineAmount + '</fineAmount>\n' + 				 
                    '</book>\n'
                    ;
                            
                res.type('application/xml');
                res.send(resultXml);
            },
    
            'text/html': function() {
                res.render('editBookUserView',{title : "Edit User", data : resultdata,  dropdown : bookResults})
            }
        });

    }) 
}