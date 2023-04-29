const newOrdersDB = require('../../newOrdersDB.js');
const Orders = newOrdersDB.getModel(); 

module.exports = async (req , res , next) => {
 //DELETING THE ORDER DOCUMENT
   
    let id = req.body.id; //accessing the id of the edited book
   
   
    Orders.findById(id,function(err,book){
        if(err){
            console.log("Error is ", err);
        }
        if(!book){  
            res.render('404'); //if there is no book, display 404 page
        }
        
        
        let resultdata = {
            id : id,
            title : book.title,
            author : book.author,
            language : book.language,
            expectedDeliveryDate:book.expectedDeliveryDate,
            paymentType: book.paymentType,
            amountPaid : book.amountPaid,
            isdeliveryComplete: book.isdeliveryComplete
        }

        book.remove(function(err){  //deleting the record in the collection
            if(err){
                console.log("Error is ", err)
            }
            // res.redirect('/newOrders');
            
    })

    //SENDING RESPONSE IN JSON, XML AND HTML FORMAT
    res.format({
        'application/json': function() {
            res.json({
                status : 'Success',
                data: resultdata
              })
        },
        'application/xml': function() {
            let resultXml = 
            '<?xml version="1.0"?>\n' +
            '<book id="' + book._id + '">\n' + 
            '   <title>' + book.title + '</title>\n' + 
            '   <author>' + book.author + '</author>\n' + 	
            '   <language>' + book.language + '</language>\n' +
            '   <expectedDeliveryDate>' + book.expectedDeliveryDate + '</expectedDeliveryDate>\n' +
            '   <paymentType>' + book.paymentType + '</paymentType>\n' +
            '   <amountPaid>'  + book.amountPaid + '</amountPaid>\n' +
            '   <isdeliveryComplete>' + book.isdeliveryComplete + '</isdeliveryComplete>\n' +
            '</book>\n'
                ;
                        
            res.type('application/xml');
            res.send(resultXml);
        },
        'text/html': function() {
            res.redirect('/newOrders');
        }
    
    })
    
 })

  

}