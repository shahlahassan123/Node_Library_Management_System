const newOrdersDB = require('../../newOrdersDB.js');
const Orders = newOrdersDB.getModel(); 

module.exports = async (req , res , next) => {
 //SAVING THE NEWLY ADDED BOOK
   
    let data = req.body;
    
    ftitle = req.body.ftitle;
    fauthor = req.body.fauthor;
    flanguage = req.body.flanguage;
    fexpectedDeliveryDate= req.body.fexpectedDeliveryDate;
    fpaymentType= req.body.fpaymentType;
    famountPaid = req.body.famountPaid;
    fisdeliveryComplete= req.body.fisdeliveryComplete;

    let book = new Orders({   //creating a new book document
      title : ftitle,
      author : fauthor,
      language : flanguage,
      expectedDeliveryDate : fexpectedDeliveryDate,
      paymentType : fpaymentType,
      amountPaid: famountPaid,
      isdeliveryComplete : fisdeliveryComplete

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
          status: "Added successfully",
          data : data
        });
    },

    'application/xml': function() {
        let resultXml = 
            '<?xml version="1.0"?>\n' +
            '<book id=>\n' + 
            '   <title>' + data.ftitle + '</title>\n' + 
            '   <author>' + data.fauthor + '</author>\n' + 	
            '   <language>' + data.flanguage + '</language>\n' +
            '   <expectedDeliveryDate>' + data.fexpectedDeliveryDate + '</expectedDeliveryDate>\n' +
            '   <paymentType>' + data.fpaymentType + '</paymentType>\n' +
            '   <amountPaid>'  + data.famountPaid + '</amountPaid>\n' +
            '   <isdeliveryComplete>' + data.fisdeliveryComplete + '</isdeliveryComplete>\n' +
            '</book>\n'
            ;
                    
        res.type('application/xml');
        res.send(resultXml);
    },

    'text/html': function() {
      res.redirect('/newOrders');
    }
});
   
  };