//Zachary Crosser
//Project 2
//ASDI Term 1301

yamlString = "transaction1:\n\
  date: 2013-08-21\n\
  transType: Deposit\n\
  category: Credit_Card\n\
  amount: 500.00\n\
  notes: Opening of account\n\
\n\
transaction2:\n\
  date: 2013-08-22\n\
  transType: Withdraw\n\
  category: Food\n\
  amount: 12.56\n\
  notes: Wendys\n\
\n\
transaction3:\n\
  date: 2013-08-23\n\
  transType: Adjustment\n\
  category: Entertainment\n\
  amount: 54.67\n\
  notes: Movies\n\
\n\
transaction4:\n\
  date: 2013-08-24\n\
  transType: Deposit\n\
  category: Credit_Card\n\
  amount: 100.00\n\
  notes: Credit card payment\n\
\n\
transaction5:\n\
  date: 2013-08-25\n\
  transType: Withdraw\n\
  category: Food\n\
  amount: 32.78\n\
  notes: Burger King"
  
var yaml = jsyaml.load(yamlString);
  
  