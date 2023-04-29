const bookUsersDB = require('../../bookUsersDB.js');
const BookUsers = bookUsersDB.getModel(); 
module.exports = async (req , res , next) => {
   //DELETING THE USER DETAILS
    
    let id = req.body.id; //accessing the id of the edited book
    
   
    BookUsers.findById(id,function(err,book){
        if(err){
            console.log("Error is ", err);
        }
        if(!book){  
            res.render('404'); //if there is no book, display 404 page
        }
        
        let resultdata = {
            id : book._id,
            fullName : book.fullName,
            email : book.email,
            idType : book.idType,
            booksBorrowed : book.booksBorrowed,
            issuedDate : book.formatDate('issuedDate'),
            expectedReturnDate: book.formatDate('expectedReturnDate'),
            actualReturnDate :book.formatDate('actualReturnDate'),
            isFined : book.isFined,
            fineAmount : book.fineAmount
        }


        book.remove(function(err){  //deleting the record in the collection
            if(err){
                console.log("Error is ", err)
            }
           
            
    })

    //SENDING RESPONSE IN JSON, XML AND HTML FORMAT
    res.format({

        'application/json': function() {
            res.json({
                status: "Delete Successfull",
                data: resultdata
            });
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
            res.redirect('/bookUsers');
        }
    });
    
 })
}