

class UI {
   constructor(){
      this.totIncome = document.querySelector('.total-income');
      this.remainingBudget = document.querySelector('.remaining');
      this.difference = document.querySelector('.difference');
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
            item.allowancesItems[i].spent += amount
            document.querySelector(`#allowances-${id}`).children[3].innerText = item.allowancesItems[i].spent
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
      item.setCurrentTableElement(e)
      this.incomeNameInput.value = item.getData().currentItem.name;
      this.incomeAmountInput.value = item.getData().currentItem.amount;
      
      this.addBtn.style.display = 'none'
      this.editBtn.style.display = 'block'
      this.deleteBtn.style.display = 'block'
      this.backBtn.style.display = 'block'
      this.editTitle.textContent = 'Edit Income'
   }

   
   changeState(state){
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
      ui.listTitle.textContent = 'Transations of Expenses';
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

   incomeListUpdate(name, amount, id, item){
      let incomeItems = Array.from(document.getElementsByClassName('income-element'))
      for (let i = 0; i < incomeItems.length; i++){
         if (incomeItems[i].id === `income-${id}`) {
            incomeItems[i].innerHTML = `<tr>
            <td>${name}</td>
            <td>${amount}</td>
            </tr>`
         }
      }
      this.updatePercentage(item);
      // update total income, etc.
      this.totIncome.textContent = item.getData().totalIncome;
      this.balance.textContent = item.getData().balance;
      this.remainingBudget.textContent = item.getData().remainingToBudget;

   }

   removeIncome(item){
      document.querySelector(`#income-${item.currentItem.id}`).remove();
      this.clearFields();
      this.returnToAddIncome();
      this.totIncome.textContent = item.totalIncome;
      this.balance.textContent = item.balance;
      this.remainingBudget.textContent = item.remainingToBudget;

   }

   returnToAddIncome(){
      this.addBtn.style.display = 'block';
      this.editBtn.style.display = 'none';
      this.deleteBtn.style.display = 'none';
      this.backBtn.style.display = 'none';
      this.editTitle.textContent = 'Add Income';
   }

   allowancesListAdd(name, amount, spent, id, item){
      // create list item
      const tr = document.createElement('tr');
      tr.id = `allowances-${id}`;
      tr.innerHTML = `<tr>
      <td>${name}</td>
      <td>${amount}</td>
      <td class="percentage"></td>
      <td class="spent">${spent}</td>
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