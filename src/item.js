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
         state:'income',
         expensesChoices:[],
         currentItem: {}
      };
   };

   createSelectItem(id, html){
      return{
         id,
         html
      }
   }

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
      amount = parseFloat(amount);
      
      const newIncomeItem = this.createIncomeItem(name,amount,ID);

      this.data.incomeItems.push(newIncomeItem);

      this.data.totalIncome += amount;
      this.data.balance += amount;
      this.data.remainingToBudget += amount;
      return newIncomeItem;
   }

   setCurrentTableElement(e){
      let list = this.getData().incomeItems;
      let element = e.target.parentElement;
      if (element.parentElement.classList[0] === 'table-body'){
         let id = element.id.split('-')[1];
         if (this.getState() === 'income'){
            for (let i = 0; i < list.length; i++){
               if (id == list[i].id){
                  this.getData().currentItem = list[i];
                  break; 
               }
         }
      }
   }
}


   deleteIncomeItem(e){
      let list = this.getData().incomeItems;
      this.setCurrentTableElement(e, this.getState(), this.getData());
      for (let i = 0; i < list.length; i++){
         if (list[i].id == this.getData().currentItem.id){
            list.splice(i, 1)
            break
         }
      }
      this.getData().totalIncome -= this.getData().currentItem.amount;
      this.getData().balance -= this.getData().currentItem.amount;
      this.getData().remainingToBudget -= this.getData().currentItem.amount;

   }

   updateIncomeItem(name, amount) {
      let updatedIncomeItem;
      amount = parseFloat(amount);
      for (let i = 0; i < this.data.incomeItems.length; i++){
         if (this.data.incomeItems[i].id == this.data.currentItem.id) {
            this.data.totalIncome += amount - this.data.currentItem.amount;
            this.data.balance += amount - this.data.currentItem.amount;
            this.data.remainingToBudget += amount - this.data.currentItem.amount;  
            this.data.incomeItems[i].name = name
            this.data.incomeItems[i].amount = amount
            updatedIncomeItem = this.data.incomeItems[i];
            break
         }
      }
      return updatedIncomeItem;
   }

   addAllowancesItem(name, spent, amount) {
      let ID;
      // create ID
      if(this.data.allowancesItems.length > 0){
         ID = this.data.allowancesItems[this.data.allowancesItems.length - 1].id + 1
      } else {
         ID = 0
      }
      amount = parseFloat(amount);
      const newAllowancesItem = this.createAllowancesItem(name,amount,spent,ID);
      this.data.allowancesItems.push(newAllowancesItem);
      this.data.remainingToBudget -= amount;
      return newAllowancesItem;
   }

   addExpensesItem(name, amount, desc, date) {
      let ID;
      // create ID
      if(this.data.expensesItems.length > 0){
         ID = this.data.expensesItems[this.data.expensesItems.length - 1].id + 1
      } else {
         ID = 0
      }
      amount = parseFloat(amount);
      const newExpensesItem = this.createExpensesItem(name, amount, desc, date, ID);
      this.data.expensesItems.push(newExpensesItem);
      this.data.spent += amount;
      this.data.balance -= amount;
      return newExpensesItem;
   }
}

export const item = new Item();