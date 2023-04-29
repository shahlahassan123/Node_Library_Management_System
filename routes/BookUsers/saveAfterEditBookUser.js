const bookUsersDB = require('../../bookUsersDB.js');
const BookUsers = bookUsersDB.getModel(); 

module.exports = async (req , res , next) => {
    //SAVING THE EDITED BOOK AND USER DETAILS
    
    let id = req.body.id; //accessing the id of the edited book
    
   let data = req.body;
   
    BookUsers.findById(id,function(err,book){
        if(err){
            console.log("Error is ", err);
        }
        if(!book){  //if there is no book, display 404 page
            res.render('404');
        }
       
        //Checking if the expected return date has value or not
        if(req.body.fExpectedReturnDate ===undefined || req.body.fExpectedReturnDate ==''){
            var expectDate = undefined;
        }else{
            var expectDate = req.body.fExpectedReturnDate ;
        }
        //Checking if the expected return date has value or not
        if(req.body.fIssuedDate ===undefined || req.body.fIssuedDate ==''){
            var issueDate = undefined;
        }else{
            var issueDate = req.body.fIssuedDate ;
        }

        //Checking if the expected return date has value or not
        if(req.body.fActualReturnDate ===undefined || req.body.fActualReturnDate ==''){
            var actualDate = undefined;
        }else{
            var actualDate = req.body.fActualReturnDate ;
        }

        if(req.body.fname !==undefined || req.body.fname !=null){
            book.fullName = req.body.fname
        }
        if(req.body.femail !==undefined || req.body.femail !=null){
            book.email = req.body.femail
        }
        if(req.body.fid !==undefined || req.body.fid !=null){
            book.idType = req.body.fid
        }
        if(req.body.fbooks !==undefined || req.body.fbooks !=null){
            book.booksBorrowed = req.body.fbooks
        }
        if(req.body.fisFined !==undefined || req.body.fisFined !=null){
            book.isFined = req.body.fisFined
        }
        if(req.body.ffineAmount !==undefined || req.body.ffineAmount !=null){
            book.fineAmount = req.body.ffineAmount
        }
       

        if(req.body.fIssuedDate !==undefined || req.body.fIssuedDate !=null){
            book.issuedDate = issueDate
        }

        if(req.body.fExpectedReturnDate !==undefined || req.body.fExpectedReturnDate !=null){
            book.expectedReturnDate = expectDate
        }

        if(req.body.fActualReturnDate !==undefined || req.body.fActualReturnDate !=null){
            book.actualReturnDate = actualDate
        }




        book._id = req.body.id,


        book.save(function(err){ //updating the book document in the collection
            if(err){
                console.log("Error is ", err)
            }
            
        })

        //SENDING RESPONSE IN JSON, XML AND HTML FORMAT
        res.format({

            'application/json': function() {
                res.json({
                    status: "Edit Successful",
                    data: data
                });
            },
    
            'application/xml': function() {
                let resultXml = 
                    '<?xml version="1.0"?>\n' +
                    '<book id="' + data.id + '">\n' + 
                    '   <fullName>' + data.fname + '</fullName>\n' + 
                    '   <email>' + data.femail + '</email>\n' + 	
                    '   <idType>' + data.fidType + '</idType>\n' + 	
                    '   <booksBorrowed>' + data.fbooks + '</booksBorrowed>\n' + 	
                    '   <issuedDate>' + data.fissuedDate + '</issuedDate>\n' + 	
                    '   <expectedReturnDate>' + data.fexpectedReturnDate + '</expectedReturnDate>\n' + 	
                    '   <actualReturnDate>' + data.factualReturnDate + '</actualReturnDate>\n' + 	
                    '   <isFined>' + data.fisFined + '</isFined>\n' + 	
                    '   <fineAmount>' + data.ffineAmount + '</fineAmount>\n' + 				 
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