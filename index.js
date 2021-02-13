// HELPER FUNCTION


// CREATE AN ACCOUNT OBJECT
class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  get balance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

}

// CREATE A TRANSACTION SUPERCLASS TO (WITHDRAWALS AND DEPOSITS)
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      console.log("Transaction could not be processed.");
    }
  }

}

// CREATE A WITHDRAWAL OBJECT
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  // CHECK IF BALANCE WILL BE NEGATIVE IF WITHDRAWAL GOES THROUGH
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// CREATE A DEPOSIT OBJECT
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log(`Starting Balance:  $${myAccount.balance}`);

const t1 = new Withdrawal(50.25 , myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log(`Balance after transaction 1: $${myAccount.balance}`);
console.log("------------------------");

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log(`Balance after transaction 2: $${myAccount.balance}`);
console.log("------------------------");

const t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log("Transaction 3:", t3);
console.log(`Balance after transaction 3: $${myAccount.balance}`);
console.log("------------------------");
