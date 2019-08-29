class UI {
   constructor(){
      this.totIncome = document.querySelector('.total-income');
      this.remainingBudget = document.querySelector('.remaining');
      this.difference = document.querySelector('.difference');
      this.spent = document.querySelector('.spent');
      this.balance = document.querySelector('.balance');
      this.incomeNameInput = document.querySelector('#name-input');
      this.incomeAmountInput = document.querySelector('#amount-input');
      this.expensesDescriptionInput = document.querySelector('#description-input');
      this.expensesDateInput = document.querySelector('#date-input');
      this.descriptionFormGroup = document.querySelector('.desc');
      this.dateFormGroup = document.querySelector('.date');
      this.addBtn = document.querySelector('.add-btn');
      this.incomeBtn = document.querySelector('.income-btn');
      this.allowancesBtn = document.querySelector('.allowances-btn');
      this.expensesBtn = document.querySelector('.expenses-btn');
      this.incomeList = document.querySelector('.income-list');
      this.allowancesList = document.querySelector('.allowances-list');
      this.expensesList = document.querySelector('.expenses-list');
      this.listTitle = document.querySelector('.list-title');
      this.editTitle = document.querySelector('.edit-title');
      this.amountLabel = document.querySelector('.amount-label');
   }

   changeState(state){
      if (state === 'income'){
         if (ui.allowancesBtn.getAttributeNames().includes('disabled')){
            ui.allowancesBtn.removeAttribute('disabled');
            ui.incomeBtn.setAttribute('disabled', '');

            ui.allowancesList.style.display = 'none';
         } else if (ui.expensesBtn.getAttributeNames().includes('disabled')) {
            ui.expensesBtn.removeAttribute('disabled');
            ui.incomeBtn.setAttribute('disabled', '');

            ui.expensesList.style.display = 'none';
         }
         ui.clearFields();
         ui.incomeList.style.display = 'block';
         ui.descriptionFormGroup.style.display = 'none';
         ui.amountLabel.textContent = 'Amount';
         ui.dateFormGroup.style.display = 'none';
         ui.listTitle.textContent = 'Sources of Income';
         ui.editTitle.textContent = 'Add Income';

      } else if (state === 'allowances') {
         if (ui.incomeBtn.getAttributeNames().includes('disabled')){
            ui.incomeBtn.removeAttribute('disabled');
            ui.allowancesBtn.setAttribute('disabled', '');

            ui.incomeList.style.display = 'none'
         } else if (ui.expensesBtn.getAttributeNames().includes('disabled')) {
            ui.expensesBtn.removeAttribute('disabled');
            ui.allowancesBtn.setAttribute('disabled', '');
         }
         ui.allowancesList.style.display = 'block';
         ui.amountLabel.textContent = 'Amount Planning to Spend';
         ui.descriptionFormGroup.style.display = 'none';
         ui.dateFormGroup.style.display = 'none';
         ui.listTitle.textContent = 'Budget Allowances';
         ui.editTitle.textContent = 'Add Allowances';
   
      } else if (state === 'expenses') {
         if (ui.incomeBtn.getAttributeNames().includes('disabled')){
            ui.incomeBtn.removeAttribute('disabled');
            ui.expensesBtn.setAttribute('disabled', '');
         } else if (ui.allowancesBtn.getAttributeNames().includes('disabled')) {
            ui.allowancesBtn.removeAttribute('disabled');
            ui.expensesBtn.setAttribute('disabled', '');
         }
         ui.expensesList.style.display = 'block'
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
   }

   incomeListAdd(name, amount, id, item){
      // create list item
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.id = `item-${id}`;
      li.innerHTML = `
      <strong>${name}: </strong> <em>$${amount}</em>
         <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
         </a>`;
      this.incomeList.insertAdjacentElement('beforeend', li)

      // update total income, etc.
      this.totIncome.textContent = item.totalIncome;
      this.balance.textContent = item.balance;
      this.remainingBudget.textContent = item.remainingToBudget;
   }

   allowancesListAdd(name, amount, id, item){


      // create list item
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.id = `item-${id}`;
      li.innerHTML = `
      <strong>${name}: </strong> <em>$${amount}</em>
         <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
         </a>`;
      console.log(li);
      this.allowancesList.insertAdjacentElement('beforeend', li)

      // update total income, etc.
      this.remainingBudget.textContent = item.remainingToBudget;
   }

   expensesListAdd(name,amount,desc,date,id,item){
      // create list item
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.id = `item-${id}`;
      li.innerHTML = `
      <strong>${name},${desc},${date}: </strong> <em>$${amount}</em>
         <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
         </a>`;
      this.expensesList.insertAdjacentElement('beforeend', li)

      // update total income, etc.
      this.balance.textContent = item.balance;
      this.spent.textContent = item.spent;
   }
}

export const ui = new UI();