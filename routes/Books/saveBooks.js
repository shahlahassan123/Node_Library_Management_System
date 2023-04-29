const booksDB = require("../../booksDB.js");
const Books = booksDB.getModel();

module.exports = async (req , res , next) => {
    //SAVING THE NEWLY ADDED BOOK
    
    let data = req.body;
    
    let ftitle = data.ftitle; 
    let fauthor = data.fauthor; 
    let flanguage = data.flanguage;
    
    let book = new Books({   //creating a new book document
      title : ftitle,
      author : fauthor,
      language : flanguage
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
          status : "Added successfully",
          data: data
        });
    },

    'application/xml': function() {
        let resultXml = 
            '<?xml version="1.0"?>\n' +
                 '<book>\n' + 
                '   <title>' + data.ftitle + '</title>\n' + 
                '   <author>' + data.fauthor + '</author>\n' + 	
                '   <language>' + data.flanguage + '</language>\n' + 				 
                '</book>\n'
            ;
                    
        res.type('application/xml');
        res.send(resultXml);
    },

    'text/html': function() {
      res.redirect('/books');
    }
});

   
  };