describe("Transaction", function() {
  
  describe("attributes", function() {
    
    it("attributes should include a key", function() {
      transaction = new Transaction({});
      expect(transaction.key).toEqual(jasmine.any(Number));
    });
    
    it("attributes should include a date", function() {
      transaction = new Transaction({date: "1/1/2013"});
      expect(transaction.date).toEqual("1/1/2013");
    });

    it("attributes should include a type", function() {
      transaction = new Transaction({type: "Deposit"});
      expect(transaction.type).toEqual("Deposit");
    });

    it("attributes should include a amount", function() {
      transaction = new Transaction({amount: "4.56"});
      expect(transaction.amount).toEqual("4.56");
    });

    it("attributes should include a category", function() {
      transaction = new Transaction({category: "Food"});
      expect(transaction.category).toEqual("Food");
    });

    it("attributes should include a notes", function() {
      transaction = new Transaction({notes: "my wonderful notes"});
      expect(transaction.notes).toEqual("my wonderful notes");
    });

    it("attributes should include a errors", function() {
      transaction = new Transaction({});
      expect(transaction.errors).toEqual({empty: true});
    });

  });
  
  describe("#toJSON", function() {
    
    beforeEach(function() {
      transaction = new Transaction({
        date: "1/1/2013",
        type: "Deposit",
        amount: "4.56",
        category: "Food"
      });
    });
    
    it("should create a valid JSON object with the correct values", function() {
      json = JSON.parse(transaction.toJSON());
      expect(json.date).toEqual(transaction.date);
      expect(json.type).toEqual(transaction.type);
      expect(json.amount).toEqual(transaction.amount);
      expect(json.category).toEqual(transaction.category);
      expect(json.key).toEqual(transaction.key);
    });
    
  });
  
  describe("#isValid", function() {
    
    beforeEach(function() {
      transaction = new Transaction({
        date: "1/1/2013",
        type: "Deposit",
        amount: "4.56",
        category: "Food"
      });
    });
    
    it("should be valid with valid attributes", function() {
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors).toEqual({empty: true});
    });
    
    it("should set errors for a invalid date", function() {
      transaction.date = "1/1/2013";
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.date).toEqual(undefined);
      
      transaction.date = "";
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.date).toEqual("can't be blank");
      
      transaction.date = "1-1-2013";
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.date).toEqual("is invalid");
      
      transaction.date = "2013-1-1";
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.date).toEqual("is invalid");
      
      transaction.date = "31/1/2013";
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.date).toEqual("is invalid");
      
      transaction.date = "31-1-2013";
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.date).toEqual("is invalid");
    });
    
    it("should set errors for a invalid type", function() {
      transaction.type = "Deposit"
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.type).toEqual(undefined);
      
      transaction.type = "Withdraw"
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.type).toEqual(undefined);
      
      transaction.type = "Adjustment"
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.type).toEqual(undefined);
      
      transaction.type = "Transfer"
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.type).toEqual(undefined);
      
      transaction.type = "";
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.type).toEqual("can't be blank");
      
      transaction.type = "Foo"
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.type).toEqual("is invalid");
    });
    
    it("should set errors for an invalid amount", function() {
      transaction.amount = "1.23"
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.amount).toEqual(undefined);
      
      transaction.amount = ""
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.amount).toEqual("can't be blank");
      
      transaction.amount = "asdf"
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.amount).toEqual("must be a number");
    });
    
    it("should set errors for a invalid category", function() {
      transaction.category = "Food"
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.category).toEqual(undefined);
      
      transaction.category = "Credit Card"
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.category).toEqual(undefined);
      
      transaction.category = "Entertainment"
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.category).toEqual(undefined);
      
      transaction.category = "ATM Withdraw"
      expect(transaction.isValid()).toEqual(true);
      expect(transaction.errors.category).toEqual(undefined);
      
      transaction.category = ""
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.category).toEqual("can't be blank");
      
      transaction.category = "Foo"
      expect(transaction.isValid()).toEqual(false);
      expect(transaction.errors.category).toEqual("is invalid");
    });
    
  });
  
  describe("#save", function() {
    
    describe("with valid data", function() {
      
      beforeEach(function() {
        transaction = new Transaction({
          date: "1/1/2013",
          type: "Deposit",
          amount: "4.56",
          category: "Food"
        });
      });
      
      it("should return true", function() {
        expect(transaction.save()).toEqual(true);
      });
      
      it("should save the transaction to local storage", function() {
        transaction.save();
        expect(localStorage.getItem(transaction.key)).not.toBeNull();
      });
      
    });
    
    describe("with invalid data", function() {
      
      beforeEach(function() {
        transaction = new Transaction({});
      });
      
      it("should return false", function() {
        expect(transaction.save()).toEqual(false);
      })
      
      it("should not save the transaction to local storage", function() {
        transaction.save()
        expect(localStorage.getItem(transaction.key)).toBeNull();
      });
      
    });
    
  });
  
});