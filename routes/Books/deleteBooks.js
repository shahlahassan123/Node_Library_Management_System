const BooksDB = require('../../booksDB.js');
const Books = BooksDB.getModel();

module.exports = async(req,res,next)=>{
//RENDERING THE DELETE BOOK VIEW
    let id = req.params.id;
    id = id.substring(1,id.length) //removing the colon
    

    Books.findById(id,function(err,book){
        if(err){
            console.log("Error is ", err);
        }
        if(!book){ //When there is no book of given id
            res.render('errorView')
        }
        
        let resultdata = {
            id : book._id,
            title : book.title,
            author : book.author,
            language : book.language
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
                        '   <title>' + resultdata.title + '</title>\n' + 
                        '   <author>' + resultdata.author + '</author>\n' + 	
                        '   <language>' + resultdata.language + '</language>\n' + 				 
                        '</book>\n'
                    ;
                            
                res.type('application/xml');
                res.send(resultXml);
            },
    
            'text/html': function() {
                res.render('deleteBookView',{title : "Delete Book", data : {
                        id : book._id,
                        title : book.title,
                        author : book.author,
                        language : book.language
                    }})
            }
        });
    }) 
}