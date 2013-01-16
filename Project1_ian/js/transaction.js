var Transaction = function(options) {
  options = options || {};
  this.key = (new Date).getTime();
  this.date = options.date;
  this.type = options.type;
  this.amount = options.amount;
  this.category = options.category;
  this.notes = options.notes;
  this.errors = {empty : true};
  
  this.valid_categories = function() {
    return ["Food", "Credit Card", "Entertainment", "ATM Withdraw"];
  }
  
  this.valid_types = function() {
    return ["Deposit", "Withdraw", "Adjustment", "Transfer"];
  }
  
  this.toJSON = function() {
    json = '{';
    json += '"key":' + this.key;
    json += ',"date":"' + this.date + '"';
    json += ',"type":"' + this.type + '"';
    json += ',"amount":"' + this.amount + '"';
    json += ',"category":"' + this.category + '"';
    json += ',"notes":"' + this.notes + '"';
    return json + '}';
  }
  
  this.isValid = function() {
    this.errors = {empty: true};
    
    if( this.date == undefined || this.date == "") {
      this.errors.empty = false;
      this.errors.date = "can't be blank";
    } else {
      if( !this.date.match(/^(1[012]|[1-9])\/(([12]\d{1}|[1-9])|(3[01]))\/\d{4}$/) ) {
        this.errors.empty = false;
        this.errors.date = "is invalid";
      }
    }
    
    if( this.type == undefined || this.type == "") {
      this.errors.empty = false;
      this.errors.type = "can't be blank";
    } else {
      if( this.valid_types().indexOf(this.type) == -1 ) {
        this.errors.empty = false;
        this.errors.type = "is invalid";
      }
    }
    
    if( this.amount == undefined || this.amount == "") {
      this.errors.empty = false;
      this.errors.amount = "can't be blank";
    } else {
      if( !this.amount.match(/^\d{1,}\.\d{2}$/) ) {
        this.errors.empty = false;
        this.errors.amount = "must be a number";
      }
    }
    
    if( this.category == undefined || this.category == "") {
      this.errors.empty = false;
      this.errors.category = "can't be blank";
    } else {
      if( this.valid_categories().indexOf(this.category) == -1 ) {
        this.errors.empty = false;
        this.errors.category = "is invalid";
      }
    }
    
    return this.errors.empty;
  }
  
  this.save = function() {
    if( this.isValid() ) {
      localStorage.setItem(this.key, JSON.stringify(this.toJSON()))
    }
    return this.errors.empty;
  }
}


