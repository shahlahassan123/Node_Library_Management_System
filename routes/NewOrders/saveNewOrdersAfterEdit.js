const newOrdersDB = require('../../newOrdersDB.js');
const Orders = newOrdersDB.getModel(); 

module.exports = async (req , res , next) => {
// SAVING THE EDITED ORDER DOCUMENT

    
    let id = req.body.id; //accessing the id of the edited book
    
   
    Orders.findById(id,function(err,book){
        if(err){
            console.log("Error is ", err);
        }
        if(!book){  //if there is no book, display 404 page
            res.render('404');
        }
        
        if(req.body.ftitle != undefined || req.body.ftitle != null){
            book.title = req.body.ftitle;}
        if(req.body.fauthor != undefined || req.body.fauthor != null){
            book.author = req.body.fauthor;}
        if(req.body.flanguage != undefined || req.body.flanguage != null){
            book.language = req.body.flanguage;}

            if(req.body.fexpectedDeliveryDate != undefined || req.body.fexpectedDeliveryDate != null){
                book.expectedDeliveryDate= req.body.fexpectedDeliveryDate;}
            if(req.body.fpaymentType != undefined || req.body.fpaymentType != null){
                book.paymentType = req.body.fpaymentType;}
            if(req.body.famountPaid != undefined || req.body.famountPaid != null){
                book.amountPaid = req.body.famountPaid;}
            if(req.body.fisdeliveryComplete != undefined || req.body.fisdeliveryComplete != null){
                book.isdeliveryComplete = req.body.fisdeliveryComplete;}


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
                    data: book
                });
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
        });


        
    })
    
 };