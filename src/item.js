class Item {
   constructor() {
      this.data = {
         incomeItems:[],
         allowancesItems:[],
         expensesItems:[],
         totalIncome:0,
         remainingToBudget:0,
         difference: this.totalIncome - this.remainingToBudget,
         spent:0,
         balance:0,
         state:'income'
      };
   };

   createIncomeItem(name, amount, id){
      const item = {
         name,
         amount,
         id
      }
      return item
   }

   createAllowancesItem(name, amount, spent, id){
      const item = {
         name,
         amount,
         spent,
         id
      }
      return item   
   }

   createExpensesItem(name, amount, desc, date, id){
      const item = {
         name,
         amount,
         desc,
         date,
         id
      }
      return item
   }
   logData() {
      console.log(this.data);
   }
   getData() {
      return this.data;
   }
   
   getState() {
      return this.data.state;
   }
   addIncomeItem(name, amount) {
      let ID;
      // create ID
      if(this.data.incomeItems.length > 0){
         ID = this.data.incomeItems[this.data.incomeItems.length - 1].id + 1
      } else {
         ID = 0
      }
      amount = parseInt(amount);
      
      const newIncomeItem = this.createIncomeItem(name,amount,ID);

      this.data.incomeItems.push(newIncomeItem);

      this.data.totalIncome += amount;
      this.data.balance += amount;
      this.data.remainingToBudget += amount;
      return newIncomeItem;
   }

   addAllowancesItem(name, spent, amount) {
      let ID;
      // create ID
      if(this.data.incomeItems.length > 0){
         ID = this.data.incomeItems[this.data.incomeItems.length - 1].id + 1
      } else {
         ID = 0
      }
      amount = parseInt(amount);
      const newAllowancesItem = this.createAllowancesItem(name,amount,spent,ID);
      this.data.allowancesItems.push(newAllowancesItem);
      this.data.remainingToBudget -= amount;
      return newAllowancesItem;
   }

   addExpensesItem(name, amount, desc, date) {
      let ID;
      // create ID
      if(this.data.incomeItems.length > 0){
         ID = this.data.incomeItems[this.data.incomeItems.length - 1].id + 1
      } else {
         ID = 0
      }
      amount = parseInt(amount);
      const newExpensesItem = this.createExpensesItem(name, amount, desc, date, ID);
      this.data.expensesItems.push(newExpensesItem);
      this.data.spent += amount;
      this.data.balance -= amount;
      return newExpensesItem;
   }
}

export const item = new Item();