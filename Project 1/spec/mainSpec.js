describe("Main App", function() {
  
  describe("#autoFillData", function() {
    
    beforeEach(function() {
      localStorage.clear();
    });
        
    afterEach(function() {
      localStorage.clear();
    });
    
    it("should load json into local storage", function() {
      autoFillData();
      expect(localStorage.length).toBeGreaterThan(0); 
    });
    
  }); 
  
  describe("#writeLocalStorageToTransactionsList", function() {
    
    beforeEach(function() {
      localStorage.clear();
      autoFillData();
    });
    
    afterEach(function() {
      localStorage.clear();
      $("#storedTransactions").html("");
    });
    
    it("should populate #storedTransactions list", function() {
      expect($("#storedTransactions")).toBeEmpty();
      writeLocalStorageToTransactionsList();
      expect($("#storedTransactions")).not.toBeEmpty();
    });
    
    it("should populate #storedTransactions list", function() {
      writeLocalStorageToTransactionsList();
      expect($("#storedTransactions li.transaction").length).toEqual(20);
    });
      
  });  
  
  describe("#writeYamlToLocalStorage", function() {
    
    beforeEach(function() {
      localStorage.clear();
    });
    
    afterEach(function() {
      localStorage.clear();
    });
    
    it("should load yaml data into local storage", function() {
      writeYamlToLocalStorage();
      expect(localStorage.length).toBeGreaterThan(0);
    });

  });
  
});