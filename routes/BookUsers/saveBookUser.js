const bookUsersDB = require('../../bookUsersDB.js');
const BookUsers = bookUsersDB.getModel(); 

module.exports = async (req , res , next) => {
    //SAVING THE NEWLY ADDED USER DETAILS
    
    let data = req.body;
   
    if(data.fname){
        var fullName = data.fname;
    }
    if(data.femail){
        var email = data.femail;
    }
    if(data.fid){
        var idType = data.fid;
    }
    if(data.fbooks){
        var booksBorrowed = data.fbooks;
    }
    if(data.fIssuedDate){
        var issuedDate = data.fIssuedDate;
    }
    if(data.fExpectedReturnDate){
        var expectedReturnDate = data.fExpectedReturnDate;
    }
    if(data.fActualReturnDate){
        var actualReturnDate = data.fActualReturnDate;
    }else{
        var actualReturnDate =undefined;
    }

    if(data.fisFined){
        var isFined = data.fisFined;
    }
    if(data.ffineAmount){
        var fineAmount = data.ffineAmount;
    }


 
    let book = new BookUsers({   //creating a new book document
        fullName : fullName,
        email : email,
        idType : idType,
        booksBorrowed : booksBorrowed,
        issuedDate : issuedDate,
        expectedReturnDate: expectedReturnDate,
        actualReturnDate :actualReturnDate,
        isFined : isFined,
        fineAmount : fineAmount
    })
    
    book.save(function(err){ //adding the new book in the collection
    if(err){
      console.log("Error is ",err)
    }
  })
  
  //SENDING RESPONSE IN JSON, XML AND HTML FORMAT
  res.format({

    'application/json': function() {
        res.json({
            status: "New Data created successfully",
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

   
  };