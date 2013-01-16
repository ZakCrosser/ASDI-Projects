//Zachary Crosser
//Project 1
//ASDI Term 1301
//Zachary Crosser

$("#addTransaction").live('pageinit', function(evt) {
  $('#loadFixtures').on('click', function(evt) {
    loadFixtures(evt);
  });
  
  $('#showInfo').on('click', function(evt) {
    showData(evt);
  });
  
  $('#clearData').on('click', function(evt) {
    clearData(evt);
  });
  
  $('#submit').on('click', function(evt) {
    saveTransaction(evt);
  });
});

function loadFixtures(evt) {
  if( confirm("Ok to clear your data and load fixtures?") == 1 ) {
    clearData(evt);
    
  }
}

function showData(evt) {
  alert('not done yet');
}

function clearData(evt) {
  alert('not done yet');
}

function saveTransaction(evt) {
  alert('not done yet');
}
