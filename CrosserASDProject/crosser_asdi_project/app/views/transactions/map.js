function (doc) {

		emit(doc._rev, {  
		"date": doc.date,
		"transType": doc.transType,
		"category": doc.category,
		"amount": doc.amount,
		"notes": doc.notes,
		"checkBox": doc.checkBox
		});
};