const booksDB = require('../../booksDB.js');
const Books = booksDB.getModel();

module.exports = async (req , res , next) => {
   //DELETING THE BOOK DOCUMENT
    
    let id = req.body.id; //accessing the id of the edited book
    
   
    Books.findById(id,function(err,book){
        if(err){
            console.log("Error is ", err);
        }
        if(!book){  
            res.render('404'); //if there is no book, display 404 page
        }
        
        let resultdata = {
            id : book._id,
            title : book.title,
            author : book.author,
            language : book.language
        }

        book.remove(function(err){  //deleting the record in the collection
            if(err){
                console.log("Error is ", err)
            }
            // res.redirect('/books');
            
    })

    //SENDING RESPONSE IN JSON, XML AND HTML FORMAT
    res.format({

        'application/json': function() {
            res.json({
                status: "Delete successful",
                data: resultdata
            });
        },

        'application/xml': function() {
            let resultXml = 
                '<?xml version="1.0"?>\n' +
                     '<book id="' + resultdata.id + '">\n' + 
                    '   <title>' + resultdata.title + '</title>\n' + 
                    '   <author>' + resultdata.author + '</author>\n' + 	
                    '   <language>' + resultdata.language + '</language>\n' + 				 
                    '</book>\n'
                ;
                        
            res.type('application/xml');
            res.send(resultXml);
        },

        'text/html': function() {
            res.redirect('/books');
        }
    });
    
 })
}