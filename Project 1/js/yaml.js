//Zachary Crosser
//Project 2
//ASDI Term 1301

yamlString = "transaction1:\n\
  date: ['Date', '2013-08-21']\n\
  transType: ['Type', 'Deposit']\n\
  category: ['Category', 'Credit_Card']\n\
  amount: ['Amount', '500.00']\n\
  notes: ['Notes', 'Opening of account']\n\
\n\
transaction2:\n\
  date: ['Date', '2013-08-22']\n\
  transType: ['Type', 'Withdraw']\n\
  category: ['Category', 'Food']\n\
  amount: ['Amount', '12.56']\n\
  notes: ['Notes', 'Wendys']\n\
\n\
transaction3:\n\
  date: ['Date', '2013-08-23']\n\
  transType: ['Type', 'Adjustment']\n\
  category: ['Category', 'Entertainment']\n\
  amount: ['Amount', '54.67']\n\
  notes: ['Notes', 'Movies']\n\
\n\
transaction4:\n\
  date: ['Date', '2013-08-24']\n\
  transType: ['Type', 'Deposit']\n\
  category: ['Category', 'Credit_Card']\n\
  amount: ['Amount', '100.00']\n\
  notes: ['Notes', 'Credit card payment']\n\
\n\
transaction5:\n\
  date: ['Date', '2013-08-25']\n\
  transType: ['Type', 'Withdraw']\n\
  category: ['Category', 'Food']\n\
  amount: ['Amount', '32.78']\n\
  notes: ['Notes', 'Burger King']"
  
var yaml = jsyaml.load(yamlString);
  
  