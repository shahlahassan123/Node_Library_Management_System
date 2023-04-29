const mongoose = require('mongoose');
const credentials = require('./credentials.js');
// const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;


let newOrdersSchema = new Schema({
	author : String,
    language : String,
    title : String,
    expectedDeliveryDate : Date,
    paymentType : String,
    amountPaid : String,
    isdeliveryComplete : String
}, {
	collection: 'NewOrders'
});


// Returns a date in 'yyyy-MM-dd' format
newOrdersSchema.methods.formatDate = function(dates) {
    if(dates === undefined){
        return undefined;
    }else{
    const newDates = new Date(this[dates]);
    let formattedDates = `${ newDates.getFullYear() }-`;
        formattedDates += `${ `0${ newDates.getMonth() + 1 }`.slice(-2) }-`;  // for double digit month
        formattedDates+= `${ `0${ newDates.getDate()+1 }`.slice(-2) }`;        // for double digit day
    return formattedDates;
    }
}

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("NewOrdersModel", 
            newOrdersSchema);
		};
		return model;
	}
};


