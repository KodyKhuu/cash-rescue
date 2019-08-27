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
      this.itemList = document.querySelector('ul');
      this.listTitle = document.querySelector('.list-title');
      this.editTitle = document.querySelector('.edit-title');
   }

   changeState(state){
      if (state === 'income'){
         state = 'income'
         if (ui.allowancesBtn.getAttributeNames().includes('disabled')){
            ui.allowancesBtn.removeAttribute('disabled');
            ui.incomeBtn.setAttribute('disabled', '');
         } else if (ui.expensesBtn.getAttributeNames().includes('disabled')) {
            ui.expensesBtn.removeAttribute('disabled');
            ui.incomeBtn.setAttribute('disabled', '');
         }
         ui.clearFields();
         ui.descriptionFormGroup.style.display = 'none';
         ui.dateFormGroup.style.display = 'none';
         ui.listTitle.textContent = 'Sources of Income';
         ui.editTitle.textContent = 'Edit Income';

      } else if (state === 'allowances') {
         if (ui.incomeBtn.getAttributeNames().includes('disabled')){
            console.log('hi');
            ui.incomeBtn.removeAttribute('disabled');
            ui.allowancesBtn.setAttribute('disabled', '');
         } else if (ui.expensesBtn.getAttributeNames().includes('disabled')) {
            ui.expensesBtn.removeAttribute('disabled');
            ui.allowancesBtn.setAttribute('disabled', '');
         }
         ui.descriptionFormGroup.style.display = 'none';
         ui.dateFormGroup.style.display = 'none';
         ui.listTitle.textContent = 'Budget Allowances';
         ui.editTitle.textContent = 'Edit Allowances';
   
      } else if (state === 'expenses') {
         if (ui.incomeBtn.getAttributeNames().includes('disabled')){
            console.log('hi');
            ui.incomeBtn.removeAttribute('disabled');
            ui.expensesBtn.setAttribute('disabled', '');
         } else if (ui.allowancesBtn.getAttributeNames().includes('disabled')) {
            ui.allowancesBtn.removeAttribute('disabled');
            ui.expensesBtn.setAttribute('disabled', '');
         }
         ui.descriptionFormGroup.style.display = 'block';
         ui.dateFormGroup.style.display = 'block';
         ui.listTitle.textContent = 'Transations of Expenses';
         ui.editTitle.textContent = 'Edit Expenses';

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
      this.itemList.insertAdjacentElement('beforeend', li)

      // update total income, etc.
      this.totIncome.textContent = item.totalIncome;
      this.balance.textContent = item.balance;
      this.remainingBudget.textContent = item.remainingToBudget;
   }

}

export const ui = new UI();