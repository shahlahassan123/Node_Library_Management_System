const newOrdersDB = require('../../newOrdersDB.js');
const Orders = newOrdersDB.getModel(); 
const booksDB = require("../../booksDB.js");
const Books = booksDB.getModel();

module.exports = async (req,res,next)=>{
    //DISPLAYING BOOKS
    let datas = await Orders.find({});

    let results = datas.map(book=>{
       
        return {
            id : book._id,
            title : book.title,
            author : book.author,
            language : book.language,
            expectedDeliveryDate : book.formatDate('expectedDeliveryDate'),
            paymentType : book.paymentType,
            amountPaid : book.amountPaid,
            isdeliveryComplete: book.isdeliveryComplete
        }
    }) 


//SENDING RESPONSE IN JSON, XML AND HTML FORMAT
    res.format({

		'application/json': function() {
			res.json(datas);
		},

		'application/xml': function() {
			let resultXml = 
				'<?xml version="1.0"?>\n' +
                results.map(book=>{
                    return '<book>\n' + 
                    '   <title>' + book.title + '</title>\n' + 
                    '   <author>' + book.author + '</author>\n' + 	
                    '   <language>' + book.language + '</language>\n' +
                    '   <expectedDeliveryDate>' + book.expectedDeliveryDate + '</expectedDeliveryDate>\n' +
                    '   <paymentType>' + book.paymentType + '</paymentType>\n' +
                    '   <amountPaid>'  + book.amountPaid + '</amountPaid>\n' +
                    '   <isdeliveryComplete>' + book.isdeliveryComplete + '</isdeliveryComplete>\n' +
                    '</book>\n'
                });			
			res.type('application/xml');
			res.send(resultXml);
		},

		'text/html': function() {
			res.render('displayNewOrders',{ title : "List of  New Orders", data : results 
})

		}
	});
}