function (doc) {
	if (doc._id.substr(0, 11) === "transaction") {
		emit(doc._id.substr(12), {
		"date": doc.date,
		"transType": doc.transType,
		"category": doc.category,
		"amount": doc.amount,
		"notes": doc.notes,
		"checkBox": doc.checkBox
		});
  }
};