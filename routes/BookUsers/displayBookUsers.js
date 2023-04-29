const bookUsersDB = require('../../bookUsersDB.js');
const BookUsers = bookUsersDB.getModel(); 

module.exports = async (req,res,next)=>{
    //DISPLAYING USERS

    let datas = await BookUsers.find({});

    let results = datas.map(book=>{
       
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

        return {
            id : book._id,
            fullName : book.fullName,
            email : book.email,
            idType : book.idType,
            booksBorrowed : book.booksBorrowed,
            issuedDate : issueDate ,
            expectedReturnDate: expectDate,
            actualReturnDate :returnDate,
            isFined : book.isFined,
            fineAmount : book.fineAmount
        }
    }) 

//SENDING RESPONSE IN JSON, XML AND HTML FORMAT
    res.format({

        'text/html': function() {
			res.render('displayBookUsersView',{ title : "List of Users" , data : results })

		},

		'application/json': function() {
			res.json(datas);
		},

		'application/xml': function() {
			let resultXml = 
				'<?xml version="1.0"?>\n' +
                datas.map(ele=>{
                    return '<book>\n' + 
                    '   <fullName>' + ele.fullName + '</fullName>\n' + 
                    '   <email>' + ele.email + '</email>\n' + 	
                    '   <idType>' + ele.idType + '</idType>\n' + 	
                    '   <booksBorrowed>' + ele.booksBorrowed + '</booksBorrowed>\n' + 	
                    '   <issuedDate>' + ele.issuedDate + '</issuedDate>\n' + 	
                    '   <expectedReturnDate>' + ele.expectedReturnDate + '</expectedReturnDate>\n' + 	
                    '   <actualReturnDate>' + ele.actualReturnDate + '</actualReturnDate>\n' + 	
                    '   <isFined>' + ele.isFined + '</isFined>\n' + 	
                    '   <fineAmount>' + ele.fineAmount + '</fineAmount>\n' + 				 
                    '</book>\n'
                });
						
			res.type('application/xml');
			res.send(resultXml);
		},

		
	});
}