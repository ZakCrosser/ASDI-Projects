

var displayCouchData = function(){
  $.couch.db("crosser_asd_project").view("app/transactions", {
   success: function(data) {
     console.log(data);
     $.each(data.rows, function(index, transaction) {
        var id = transaction.id;
        var key = transaction.key;
        var date = transaction.value.date;
        var transType = transaction.value.transType;
        var category = transaction.value.category;
        var amount = transaction.value.amount;
        var notes = transaction.value.notes;
        var checkBox = transaction.value.checkBox;
        var del = "Delete Item"
        var edit = "Edit Item"
        var link = $("<a>").attr("href", "#").text(id + ", " + key);
        var delet = $("<button/>").attr("href", "#").attr("data-role", "button").attr("data-inline", "true").attr("data-mini", "true").attr("id", "deleteItem").text(del)
        var edit = $("<button/>").attr("href", "#").attr("data-role", "button").attr("data-inline", "true").attr("data-mini", "true").attr("id", "editItem").text(edit)
        var li = $("<li>");
        var div =$('<div>');
        div.hide();
        div.html("<p hidden='true'>id:</p><p hidden='true' id='id'>" + id + "</p ><p hidden='true'>rev:</p><p hidden='true' id='rev'>" + key + "</p><p>Date:</p>" + date +"<p>Type:</p>" + transType + "<p>Category:</p>" + category + "<p>Amount:</p>" + amount  + "<p>Notes:</p>" + notes);
        // Populate div with transaction data
        li.append(link);
        li.append(div);
        div.append(edit);
        div.append(delet);
        $("#storedTransactions").append(li);
      });
      $("#storedTransactions").listview("refresh");
    }     
  });
}

var deleteCouchData = function () { 
  var doc = {
    _id: $("#id").text(),
    _rev: $("#rev").text()
  };
  $.couch.db("crosser_asd_project").removeDoc(doc, {
    success: function(data) {
      console.log(data);
    },
    error: function(status) {
      console.log(status);
    }
 
  });
}

// var editCouchData = function () {
//   var _id = id
//   $.couch.db("crosser_asd_project").openDoc(_id, {
//     success: function(data) {
//       console.log(data);
//     },
//     error: function(status) {
//       console.log(status);
//     }
//  
//   });
// }
// 
// var saveUpdatedCouchData = function () {
//   var doc = {
//     _id:
//     _rev:
//     foo: "bar"
//   };
//   $.couch.db("crosser_asd_project").saveDoc(doc, {
//     success: function(data) {
//       console.log(data);
//     },
//     error: function(status) {
//       console.log(status);
//     }
//  
//   });
// }

 
var getRadioType = function(){
  var radios = $('#types input[type="radio"]')
  radios.each(function(index, radio) {
    if(radio.checked) {
      typeValue = $(radio).val();
    }
  });
}

var controls = function(n){
  switch(n){
    case "on":
      $('#transform').hide();
      $('#showInfo').hide();
      break;
    case "off":
     $('#transform').show();
     $('#clearData').addClass("inline");
     $('#showInfo').addClass("inline");
     $('#addNew').hide();
     $("#showTransactions").hide();
    default:
      return false;
  }
}

var storeTransaction = function(key){
  getRadioType();
  var item            = {};
  item.date       =[$('#date').val()];
  item.transType  =[typeValue];
  item.category   =[$('#groups').val()];
  item.amount     =[$('#amount').val()];
  item.notes      =[$('#notes').val()];
  $.couch.db("crosser_asd_project").saveDoc(item, {
      success: function(data) {
        console.log(data);
          if(!key){
            var id = Math.floor(Math.random()*100001);
          }else{
            id = key;
          }
          getRadioType();
          var item            = {};
          item.date       =["Date", $('#date').val()];
          item.transType  =["Type", typeValue];
          item.category   =["category", $('#groups').val()];
          item.amount     =["Amount", $('#amount').val()];
          item.notes      =["Notes", $('#notes').val()];
          localStorage.setItem(id, JSON.stringify(item));  
          alert("Transaction Saved!");
          return item;
        },
      error: function(status) {
        console.log(status);
      }
  });
}


var writeLocalStorageToTransactionsList = function() {
  var list = $("#storedTransactions");
  for(var i = 0; i < localStorage.length; i++) {
    transaction = JSON.parse(localStorage.getItem(localStorage.key(i)));
    listItem = $("<li></li>");
    listItem.addClass("transaction");
    listItem.addClass(transaction.category);
    transactionDetailsList = $("<ul></ul>");
    transactionDetailsList.append($("<li>Date: " + transaction.date + "</li>"));
    transactionDetailsList.append($("<li>Trans Type: " + transaction.transType + "</li>"));
    transactionDetailsList.append($("<li>Category: " + transaction.category + "</li>"));
    transactionDetailsList.append($("<li>Amount: " + transaction.amount + "</li>"));
    transactionDetailsList.append($("<li>Notes: " + transaction.notes + "</li>"));
    listItem.append(transactionDetailsList);
    list.append(listItem);
  }
}

var autoFillData = function (){
  for(var j in json){
    var id = Math.floor(Math.random()*100001);
    localStorage.setItem(id, JSON.stringify(json[j]));
  }  
}

var writeYamlToLocalStorage = function() {
  for(var y in yaml) {
    var id = Math.floor(Math.random()*100001);
    localStorage.setItem(id, JSON.stringify(yaml[y]));
  }  
}

var showYamlTransactions = function(category) {
  controls("on");
  if(localStorage.length === 0){
    writeYamlToLocalStorage();
    writeLocalStorageToTransactionsList();
  }
  $("#storedTransactions").show();
}

var writeXmlToLocalStorage = function() {
 $(xmlString).find("transaction").each(function(index, transaction) {
    var id = Math.floor(Math.random()*100001);
    transactionJson = {
      "date" : $(transaction).find("date").html(),
      "transType" : $(transaction).find("type").html(),
      "category" : $(transaction).find("category").html(),
      "amount" : $(transaction).find("amount").html()
    }
    localStorage.setItem(id, JSON.stringify(transactionJson));
  });   
}

var showXmlTransactions = function(){
  controls("on");
  if(localStorage.length === 0){
    writeXmlToLocalStorage();
    writeLocalStorageToTransactionsList();
  }
  $("#storedTransactions").show();
}

var makeItemLinks = function(key, linksLi){
  var editLink = $('<a></a>')
  editLink.href = "#";
  editLink.key = key;
  var editText = "Edit Transaction";
  editLink.on("click", function( ) {
    editItem(key);
  });
  editLink.html = editText;
  linksLi.append(editLink);
  var breakTag = $('<br>')
  linksLi.append(breakTag);
  var deleteLink = $('<a></a>')
  deleteLink.href = "#";
  var deleteText = "Delete Transaction";
  deleteLink.on("click", function( ) {
    deleteItem(key);
  });
  deleteLink.html = deleteText;
  linksLi.append(deleteLink);
}  

var editItem = function(key){
  var value = localStorage.getItem(key);
  var item = JSON.parse(value);
  var submit = $('#submit');
  controls("off");
  $('#date').val(item.date[1]);
  var radios = $('#types input[type="radio"]')
  radios.each(function(index, radio){
    if(radios.val() == "Deposit" && item.transType[1] == "Deposit"){
      radios.attr("checked", "checked");
    }else if(radios[i].val == "Withdraw" && item.transType[1] == "Withdraw"){
      radios.attr("checked", "checked");
    }else if(radios[i].val == "Adjustment" && item.transType[1] == "Adjustment"){
      radios.attr("checked", "checked");
    }else if(radios[i].val == "Transfer" && item.transType[1] == "Transfer"){
      radios.attr("checked", "checked");
    }  
  });
  $('#groups').val(item.category[1]);
  $('#amount').val(item.amount[1]);
  $('#slider').val(item.slider[1]);
  $('#notes').val(item.notes[1]);

  submit.val("Edit Transaction");
  submit.key = key;
  console.log('editItem');
  console.log(submit.key);
  submit.on("click", function(evt) {
    validate(evt);
  });
}

var deleteItem = function(key){
  var ask = confirm("Are you sure you want to delete this Transaction?");
  if(ask){
    localStorage.removeItem(key);
    window.location.reload();
  }else{
    alert("Transaction was NOT deleted!")
  }
}

var clearData = function(){
  if(localStorage.length === 0){
    alert("There Are No Transactions Saved!")
  }else{
    localStorage.clear();
    alert("All Transactions Have Been Deleted!");
    window.location.reload();
    return false;
  }
}

var validate = function(evt){
  console.log($('#submit').key);
  var getDate      =$('#date');
  var getcategory  =$('#groups');
  var getAmount    =$('#amount');
  var getNotes     =$('#notes');

  errMsg.innerHTML = "";
  getcategory.attr("class", "");
  getDate.attr("class", "");
  getAmount.attr("class", "");
  getNotes.attr("class", "");



  var messageAry = [];

  if(getcategory.value === "--Choose a category--"){
    var categoryError = "Please Pick a category";
    getcategory.attr("class", "errors");
    messageAry.push(categoryError); 
  }
  if(getDate.value === ""){
    var dateError = "Please Enter A Date";
    getDate.attr("class", "errors");
    messageAry.push(dateError);
  }
  // if(!(new RegExp("^[0-9\.]+$", "i")).test(getAmount.value)){
  //        var amountError = "Please Enter A Amount";
  //        getAmount.attr("class", "errors");
  //        messageAry.push(amountError);
  //      }
  if(messageAry.length >= 1){
    for(var i=0, j=messageAry.length; i < j; i++){
      var txt = $("<li></li>")
      txt.html = messageAry[i];
      errMsg.append(txt);
    }
    evt.preventDefault();
    return false;
  }else{
    return storeTransaction($('#submit').key);
  }
}
 
$(function() {
    
  var category = ["--Choose a category--", "Food", "Credit_Card", "Entertainment", "ATM_Withdraw"],
      typeValue,sss
      checkBoxValue = "No"
      errMsg = $('#errors')
      ;
      
      
  $('#showJsonInfo').on('click', function(evt) {
    showJsonTransactions(evt);
  });
  $('#showYamlInfo').on('click', function(evt) {
    showYamlTransactions(evt);
  });
  $('#showXmlInfo').on('click', function(evt) {
    showXmlTransactions(evt);
  });
   $('#showCouchInfo').on('click', function(evt) {
     displayCouchData(evt); 
  });    
  $('#clearData').on('click', function(evt) {
    clearData(evt);
  });
  $('#submit').on('click', function(evt) {
    validate(evt);
  });  
  $("#storedTransactions li a").live("click", function(evt){
    $(evt.target).next().toggle();
  });
  $("#deleteItem").live("click", function(evt){
    var ask = confirm("Are you sure you want to delete this Transaction?");
      if(ask){
        deleteCouchData();
        window.location.reload();
      }else{
        alert("Transaction was NOT deleted!")
  }
}); 
  
});