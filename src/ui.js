class UI {
   constructor(){
      this.totIncome = document.querySelector('.total-income');
      this.remainingBudget = document.querySelector('.remaining');
      this.difference = document.querySelector('.difference');
      this.spent = document.querySelector('.spent');
      this.balance = document.querySelector('.balance');
      this.incomeNameInput = document.querySelector('#name-input');
      this.incomeAmountInput = document.querySelector('#amount-input');
      this.addBtn = document.querySelector('.add-btn');
      this.incomeBtn = document.querySelector('.income-btn');
      this.allowancesBtn = document.querySelector('.allowances-btn');
      this.expensesBtn = document.querySelector('.expenses-btn');
      this.itemList = document.querySelector('ul');
   }

   updateIncomeUI(name, amount, id, item){
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
   }

}

export const ui = new UI();