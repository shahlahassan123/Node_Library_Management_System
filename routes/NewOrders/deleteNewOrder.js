const newOrdersDB = require('../../newOrdersDB.js');
const Orders = newOrdersDB.getModel(); 

module.exports = async(req,res,next)=>{
  //RENDERING THE DELETE ORDER VIEW
  
    let id = req.params.id;
    id = id.substring(1,id.length) //removing the colon
   

    Orders.findById(id,function(err,book){
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
            language : book.language,
            expectedDeliveryDate : book.formatDate('expectedDeliveryDate'),
            paymentType : book.paymentType,
            amountPaid : book.amountPaid,
            isdeliveryComplete: book.isdeliveryComplete
        }

        //SENDING RESPONSE IN JSON, XML AND HTML FORMAT
        res.format({

            'application/json': function() {
                res.json(resultdata);
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
                res.render('deleteNewOrdersView',{title : "Delete Order", data : resultdata})
            }
        });
    }) 
}