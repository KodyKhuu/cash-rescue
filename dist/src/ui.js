import { item } from './item.js'
class UI {
   constructor(){
      this.month = document.querySelector('.month')
      this.body = document.querySelector('body');
      this.totIncome = document.querySelector('.total-income');
      this.remainingBudget = document.querySelector('.remaining');
      this.spent = document.querySelector('.spent');
      this.balance = document.querySelector('.balance');
      this.incomeNameInput = document.querySelector('#name-input');
      this.nameFormGroup = document.querySelector('.name-input');
      this.incomeAmountInput = document.querySelector('#amount-input');
      this.expensesDescriptionInput = document.querySelector('#description-input');
      this.expensesDateInput = document.querySelector('#date-input');
      this.descriptionFormGroup = document.querySelector('.desc');
      this.dateFormGroup = document.querySelector('.date');
      this.addBtn = document.querySelector('.add-btn');
      this.editBtn = document.querySelector('.edit-btn');
      this.deleteBtn = document.querySelector('.delete-btn');
      this.backBtn = document.querySelector('.back-btn');
      this.incomeBtn = document.querySelector('.income-btn');
      this.allowancesBtn = document.querySelector('.allowances-btn');
      this.expensesBtn = document.querySelector('.expenses-btn');
      this.incomeList = document.querySelector('.income-list');
      this.allowancesList = document.querySelector('.allowances-list');
      this.expensesList = document.querySelector('.expenses-list');
      this.incomeTable = document.querySelector('.income-table');
      this.allowancesTable = document.querySelector('.allowances-table');
      this.expensesTable = document.querySelector('.expenses-table');
      this.listTitle = document.querySelector('.list-title');
      this.editTitle = document.querySelector('.edit-title');
      this.amountLabel = document.querySelector('.amount-label');
      this.selectHtml = ``;
      this.selectFormGroup = document.querySelector('.select-input');
      this.selectInput = document.querySelector('#select-input');
   }

   updateSelectHtml(list){
      this.selectHtml = ``;
      for (let i = 0; i < list.length; i++){
         this.selectHtml += `<option value="${list[i].id}">${list[i].name}</option>        
` 
      }
      ui.selectInput.innerHTML = ui.selectHtml;
   }

   updateAllowances(id,item,amount){
      for(let i=0; i < item.allowancesItems.length; i++){
         if (item.allowancesItems[i].id == id){
            item.allowancesItems[i].spent.push(amount)
            document.querySelector(`#allowances-${id}`).children[3].innerText = item.allowancesItems[i].spent.reduce((a, b) => a + b, 0)
            if (item.allowancesItems[i].spent > item.allowancesItems[i].amount) {
               document.querySelector(`#allowances-${id}`).children[3].className = 'text-danger'
            }
            break
         }
      }    
   }

   
   updatePercentage(item){
      let list = Array.from(document.getElementsByClassName('percentage'))
      list.forEach((percentage)=>{
         if (item.getData().totalIncome === 0) {
            percentage.innerHTML = 0;
         } else{
            percentage.innerHTML = parseFloat(percentage.parentElement.children[1].innerText / item.getData().totalIncome).toFixed(4) * 100;
         }
      })
   }

   changeEditState(e, item){
      let element = e.target.parentElement;
      if (element.parentElement.classList[0] === 'table-body'){
         let id = element.id.split('-')[1];
         if (item.getState() === 'income'){
            item.setCurrentTableElement(id, item.getData().incomeItems)
            this.editTitle.textContent = 'Edit Income'
         } else if (item.getState() === 'allowances'){
            item.setCurrentTableElement(id, item.getData().allowancesItems)
            this.editTitle.textContent = 'Edit Allowances'
         } else if (item.getState() === 'expenses'){
            item.setCurrentTableElement(id, item.getData().expensesItems)
            this.editTitle.textContent = 'Edit Expenses'
            this.expensesDescriptionInput.value = item.getData().currentItem.desc
            this.expensesDateInput.value = item.getData().currentItem.date
            this.selectInput.value = item.getData().currentItem.id
         }
         this.incomeNameInput.value = item.getData().currentItem.name;
         this.incomeAmountInput.value = item.getData().currentItem.amount;
         this.addBtn.style.display = 'none'
         this.editBtn.style.display = 'block'
         this.deleteBtn.style.display = 'block'
         this.backBtn.style.display = 'block'
      }
   }


   
   changeState(state){
      this.returnToAddState()
      if (state === 'income'){
         if (ui.allowancesBtn.getAttributeNames().includes('disabled')){
         ui.allowancesBtn.removeAttribute('disabled');
         ui.incomeBtn.setAttribute('disabled', '');

         ui.allowancesTable.style.display = 'none';
      } else if (ui.expensesBtn.getAttributeNames().includes('disabled')) {
         ui.expensesBtn.removeAttribute('disabled');
         ui.incomeBtn.setAttribute('disabled', '');

         ui.expensesTable.style.display = 'none';
      }
      ui.clearFields();
      ui.selectFormGroup.style.display = 'none'
      ui.nameFormGroup.style.display = 'block'
      ui.incomeTable.style.display = 'table';
      ui.descriptionFormGroup.style.display = 'none';
      ui.amountLabel.textContent = 'Amount';
      ui.dateFormGroup.style.display = 'none';
      ui.listTitle.textContent = 'Sources of Income';
      ui.editTitle.textContent = 'Add Income';   
      }

      else if (state === 'allowances') {
      if (ui.incomeBtn.getAttributeNames().includes('disabled')){
         ui.incomeBtn.removeAttribute('disabled');
         ui.allowancesBtn.setAttribute('disabled', '');

         ui.incomeTable.style.display = 'none'
      } else if (ui.expensesBtn.getAttributeNames().includes('disabled')) {
         ui.expensesBtn.removeAttribute('disabled');
         ui.allowancesBtn.setAttribute('disabled', '');

         ui.expensesTable.style.display = 'none'
      }
      ui.clearFields();
      ui.selectFormGroup.style.display = 'none'
      ui.nameFormGroup.style.display = 'block'
      ui.allowancesTable.style.display = 'table';
      ui.amountLabel.textContent = 'Amount Planning to Spend';
      ui.descriptionFormGroup.style.display = 'none';
      ui.dateFormGroup.style.display = 'none';
      ui.listTitle.textContent = 'Budget Allowances';
      ui.editTitle.textContent = 'Add Allowances';

   } else if (state === 'expenses') {
      if (ui.incomeBtn.getAttributeNames().includes('disabled')){
         ui.incomeBtn.removeAttribute('disabled');
         ui.expensesBtn.setAttribute('disabled', '');

         ui.incomeTable.style.display = 'none'
      } else if (ui.allowancesBtn.getAttributeNames().includes('disabled')) {
         ui.allowancesBtn.removeAttribute('disabled');
         ui.expensesBtn.setAttribute('disabled', '');

         ui.allowancesTable.style.display = 'none'
      }
      ui.selectFormGroup.style.display = 'block'
      ui.nameFormGroup.style.display = 'none'
      ui.clearFields();
      ui.expensesTable.style.display = 'table'
      ui.amountLabel.textContent = 'Amount Spent';
      ui.descriptionFormGroup.style.display = 'block';
      ui.dateFormGroup.style.display = 'block';
      ui.listTitle.textContent = 'Transactions of Expenses';
      ui.editTitle.textContent = 'Add Expenses';

   }
   }

   clearFields(){
      this.incomeNameInput.value = '';
      this.incomeAmountInput.value = '';
      this.selectInput.value = '';
      this.expensesDateInput.value = '';
      this.expensesDescriptionInput.value = '';
   }

   incomeListAdd(name, amount, id, item){
      // create list item
      const tr = document.createElement('tr');
      tr.id = `income-${id}`;
      tr.className = 'income-element'
      tr.innerHTML = `<tr>
      <td>${name}</td>
      <td>${amount}</td>
      </tr>`
      this.incomeList.insertAdjacentElement('beforeend', tr)

      this.updatePercentage(item);

      // update total income, etc.
      this.totIncome.textContent = item.getData().totalIncome;
      this.balance.textContent = item.getData().balance;
      this.remainingBudget.textContent = item.getData().remainingToBudget;
   }

   tableUpdate(updatedItem, item){
      if (item.getState() === 'income') {
         let incomeItems = Array.from(document.getElementsByClassName('income-element'))
         for (let i = 0; i < incomeItems.length; i++){
            if (incomeItems[i].id === `income-${updatedItem.id}`) {
               incomeItems[i].innerHTML = `<tr>
               <td>${updatedItem.name}</td>
               <td>${updatedItem.amount}</td>
               </tr>`   
            }
         }
         this.totIncome.textContent = item.getData().totalIncome;
         this.balance.textContent = item.getData().balance;   
      } else if (item.getState() === 'allowances') {
         let allowancesItems = Array.from(document.getElementsByClassName('allowances-element'))
         for (let i = 0; i < allowancesItems.length; i++){
            if (allowancesItems[i].id === `allowances-${updatedItem.id}`) {
               allowancesItems[i].innerHTML = `<tr>
               <td>${updatedItem.name}</td>
               <td>${updatedItem.amount}</td>
               <td class="percentage"></td>
               <td class="spent">${updatedItem.spent}</td>
               </tr>`            
            }
         }
      } else if (item.getState() === 'expenses') {
         let expensesItems = Array.from(document.getElementsByClassName('expenses-element'))
         for (let i = 0; i < expensesItems.length; i++) {
            if (expensesItems[i].id === `expenses-${updatedItem.id}`) {
               expensesItems[i].innerHTML = `<tr>
               <td>${updatedItem.name}</td>
               <td>${updatedItem.amount}</td>
               <td>${updatedItem.desc}</td>
               <td>${updatedItem.date}</td>
               </tr>`
            }
         }
         this.spent.textContent = item.getData().spent;
         this.balance.textContent = item.getData().balance;
      }

      this.updatePercentage(item);
      // update total income, etc.
      this.remainingBudget.textContent = item.getData().remainingToBudget;

   }

   removeItem(){
      if (item.getState() === 'income'){
         document.querySelector(`#income-${item.getData().currentItem.id}`).remove();
      }
      else if (item.getState() === 'allowances'){
         document.querySelector(`#allowances-${item.getData().currentItem.id}`).remove();
      }
      else if (item.getState() === 'expenses'){
         document.querySelector(`#expenses-${item.getData().currentItem.id}`).remove();
      }
      this.clearFields();
      this.returnToAddState();
      this.totIncome.textContent = item.getData().totalIncome;
      this.balance.textContent = item.getData().balance;
      this.remainingBudget.textContent = item.getData().remainingToBudget;
      this.spent.textContent = item.getData().spent
      this.balance.textContent = item.getData().balance

   }

   returnToAddState(){
      this.addBtn.style.display = 'block';
      this.editBtn.style.display = 'none';
      this.deleteBtn.style.display = 'none';
      this.backBtn.style.display = 'none';
      if (item.getState() === 'income'){
         this.editTitle.textContent = 'Add Income';
      } else if (item.getState() === 'allowances'){
         this.editTitle.textContent = 'Add Allowances'
      } else if (item.getState() === 'expenses'){
         this.editTitle.textContent = 'Add Expenses'
      }
   }

   allowancesListAdd(name, amount, spent, id, item){
      // create list item
      const tr = document.createElement('tr');
      tr.id = `allowances-${id}`;
      tr.className = 'allowances-element'
      tr.innerHTML = `<tr>
      <td>${name}</td>
      <td>${amount}</td>
      <td class="percentage"></td>
      <td class="spent">${spent.reduce((a, b) => a + b, 0)}</td>
      </tr>`
      this.allowancesList.insertAdjacentElement('beforeend', tr)
      this.updatePercentage(item);

      // update total income, etc.
      this.remainingBudget.textContent = item.getData().remainingToBudget;
   }

   expensesListAdd(name,amount,desc,date,id,item){
      // create list item
      const tr = document.createElement('tr');
      tr.id = `expenses-${id}`;
      tr.className = 'expenses-element'
      tr.innerHTML = `<tr>
      <td>${name}</td>
      <td>${amount}</td>
      <td>${desc}</td>
      <td>${date}</td>
      </tr>`
      this.expensesList.insertAdjacentElement('beforeend', tr)

      // update total income, etc.
      this.balance.textContent = item.getData().balance;
      this.spent.textContent = item.getData().spent;
   }
}

export const ui = new UI();