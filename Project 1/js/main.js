//Zachary Crosser
//Project 1
//ASDI Term 1301
//Zachary Crosser
$(function() {
alert("page ready");
// $('#home').on('pageinit', function(event){
//  //code needed for home page goes here
// });  
//    
// $('#aboutCompany').on('pageInit', function(event){
//  //code needed for aboutCompany page goes here
// });  
// 
// $('#aboutApp').on('pageInit', function(event){
//  //code needed for aboutApp page goes here
// });  
// 
// $('#contactUs').on('pageInit', function(event){
//  //code needed for contactUs page goes here
// });  
// 
// $('#staff').on('pageInit', function(event){
//  //code needed for staff page goes here
// });  
// 
// $('#order').on('pageInit', function(event){
//  //code needed for order page goes here
// });  
// 
// $('#transerrors').on('pageInit', function(event){
//  //code needed for transerrors page goes here
// });  
// 
// $('#addTransaction').on('pageinit',function(event){
//   alert( 'This page was just enhanced by jQuery Mobile!' );

	//any other code needed for addTransaction page goes here
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
          $('#clearData').addClass("inline");
          $('#showInfo').hide();
          $('#addNew').addClass("inline");
          break;
        case "off":
         $('#transform').show();
         $('#clearData').addClass("inline");
         $('#showInfo').addClass("inline");
         $('#addNew').hide();
         $("#data").hide();
        default:
          return false;
      }
    }
  
    var storeTransaction = function(key){
      if(!key){
          var id = Math.floor(Math.random()*100001);
      }else{
        id = key;
      }
      getRadioType();
      var item            = {};
          item.date       =["Date", $('#date').val()];
          item.transType  =["Type", typeValue];
          item.catagory   =["Catagory", $('#groups').val()];
          item.amount     =["Amount", $('#amount').val()];
          item.notes      =["Notes", $('#notes').val()];
      localStorage.setItem(id, JSON.stringify(item));
      alert("Transaction Saved!");
      return item;
    }
  
    var showData = function(catagory){
      controls("on");
      if(localStorage.length === 0){
        alert("There is no data in Local Storage, static data function added!")
       autoFillData();
       showData();
      } else {
        var makeDiv = $('<div id="transactions"></div>')
        var makeList = $('#storedTransactions');
        makeList.html('');
        makeDiv.append(makeList);
        $('body').append(makeDiv);
        $("#transactions").style.display ="block"
        for(var i=0, len=localStorage.length; i<len; i++){
          var makeLi = $('<li class="transaction ' + obj.catagory[0] + '"></li>') 
          var linksLi = $('<li></li>');
          makeList.append(makeLi);
          var key = localStorage.key(i);
          var value = localStorage.getItem(key);
          var obj = JSON.parse(value);
          var makeSubList = $('<ul></ul>')
          makeLi.append(makeSubList);
          for(var s in obj){
            var makeSubLi = $('<li></li>')
            makeSubList.append(makeSubLi);
            var optSubText = obj[s][0]+" "+obj[s][1];
            makeSubLi.html = (optSubText);
            makeSubList.append(linksLi);
          }
          makeItemLinks(localStorage.key(i), linksLi);
        }
      }
    }
  
    var autoFillData = function (){
      for(var j in json){
        var id = Math.floor(Math.random()*100001);
        localStorage.setItem(id, JSON.stringify(json[j]));
      }  
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
      $('#groups').val(item.catagory[1]);
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
      var getCatagory  =$('#groups');
      var getAmount    =$('#amount');
      var getNotes     =$('#notes');
    
      errMsg.innerHTML = "";
      getCatagory.attr("class", "");
      getDate.attr("class", "");
      getAmount.attr("class", "");
      getNotes.attr("class", "");
    
  
    
      var messageAry = [];
    
      if(getCatagory.value === "--Choose a Catagory--"){
        var catagoryError = "Please Pick a Catagory";
        getCatagory.attr("class", "errors");
        messageAry.push(catagoryError); 
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
 
 
    
    var catagory = ["--Choose a Catagory--", "Food", "Credit_Card", "Entertainment", "ATM_Withdraw"],
        typeValue,sss
        checkBoxValue = "No"
        errMsg = $('#errors')
        ;


    $('#showInfo').on('click', function(evt) {
      showData(evt);
    });
    $('#clearData').on('click', function(evt) {
      clearData(evt);
    });
    $('#submit').on('click', function(evt) {
      validate(evt);
    });
  
});

  
  
  