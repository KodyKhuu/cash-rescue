class Item {
   constructor() {
      this.data = {
         incomeItems:[],
         allowancesItems:[],
         expensesItems:[],
         totalIncome:0,
         remainingToBudget:0,
         difference:0,
         spent:0,
         balance:0
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

   logData() {
      console.log(this.data);
   }
   getData() {
      return this.data;
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
      return newIncomeItem;


   }
}

export const item = new Item();