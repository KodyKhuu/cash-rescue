import { ui } from './ui.js'

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

   createAllowancesItem(name, amount, id){
      const item = {
         name,
         amount,
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

   setCurrentTableElement(id, list){
      for (let i = 0; i < list.length; i++){
         if (id == list[i].id){
            this.getData().currentItem = list[i];
            break; 
            }
         }
      
   }



   delItem(){
      let items;
      if (this.getState() === 'income'){
         items = this.getData().incomeItems;
         this.getData().totalIncome -= this.getData().currentItem.amount;
         this.getData().balance -= this.getData().currentItem.amount;
         this.getData().remainingToBudget -= this.getData().currentItem.amount;
      }
      else if (this.getState() === 'allowances'){
         items = this.getData().allowancesItems;
         this.getData().remainingToBudget += this.getData().currentItem.amount;
      }
      else if (this.getState() === 'expenses'){
         items = this.getData().expensesItems;
         this.getData().spent -= this.getData().currentItem.amount;
         this.getData().balance += this.getData().currentItem.amount;
         for (let j = 0; j < this.getData().allowancesItems.length; j++){
            if(this.getData().currentItem.name === this.getData().allowancesItems[j].name){
               this.getData().allowancesItems[j].spent.splice(j,1)
               document.querySelector(`#allowances-${j}`).children[3].innerText = item.getData().allowancesItems[j].spent.reduce((a, b) => a + b, 0)
               break
            }

         }

      }  
      for (let i = 0; i < items.length; i++){
         if (items[i].id == this.getData().currentItem.id){
            items.splice(i, 1)
            break
         }
      }
   }

   updateItem(name, amount, expensesDesc, expensesDate, list) {
      let current = this.getData().currentItem;
      let updatedItem;
      amount = parseFloat(amount);
      for (let i = 0; i < list.length; i++){
         if (list[i].id == current.id) {
            if (this.getState() === 'income'){
               this.getData().totalIncome += amount - current.amount;
               this.getData().balance += amount - current.amount;
               this.getData().remainingToBudget += amount - current.amount;     
            } else if (this.getState() === 'allowances'){
               this.getData().remainingToBudget -= amount - current.amount;
            } else if (this.getState() === 'expenses'){
               this.getData().spent += amount - current.amount;
               this.getData().balance -= amount - current.amount;
               for (let j = 0; j < this.getData().allowancesItems.length; j++){
                  if(name === this.getData().allowancesItems[j].name){
                     this.getData().allowancesItems[j].spent.splice(j,1)
                  }
               }
               list[i].desc = expensesDesc
               list[i].date = expensesDate
               }

            }
            list[i].name = name
            list[i].amount = amount
            updatedItem = list[i];
            break
         }
         return updatedItem;
      }
      
   

   addAllowancesItem(name, amount) {
      let ID;
      // create ID
      if(this.data.allowancesItems.length > 0){
         ID = this.data.allowancesItems[this.data.allowancesItems.length - 1].id + 1
      } else {
         ID = 0
      }
      amount = parseFloat(amount);
      const newAllowancesItem = this.createAllowancesItem(name,amount,ID);
      newAllowancesItem.spent = []
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