import { ui } from './ui.js'
import { item } from './item.js'

class App {
   loadEventListeners(){
      ui.incomeTable.addEventListener('click',(e) => {
         ui.changeEditState(e, item)
      });

      ui.editBtn.addEventListener('click', () => {
         this.incomeUpdateSubmit(item);
      });

      ui.deleteBtn.addEventListener('click', (e) => {
         this.incomeDeleteItem(e);
      });
      ui.backBtn.addEventListener('click', () => {
         ui.returnToAddIncome()
         ui.clearFields();
      });

      ui.addBtn.addEventListener('click', () => {
         this.incomeAddSubmit()
      });
      ui.incomeBtn.addEventListener('click', () => {
         item.data.state = 'income'
         ui.changeState(item.getState())
      });
      ui.allowancesBtn.addEventListener('click', () => {
         item.data.state = 'allowances'
         ui.changeState(item.getState())
      });
      ui.expensesBtn.addEventListener('click', () => {
         item.data.state = 'expenses'
         ui.changeState(item.getState())
      });
   }

   incomeDeleteItem(e){
      item.deleteIncomeItem(e)
      ui.removeIncome(item.getData());
   }

   incomeUpdateSubmit(item){
      const name = ui.incomeNameInput.value;
      const selectName = ui.selectInput.value;
      const amount = ui.incomeAmountInput.value;
      if (item.data.state === 'income') {
         if (name !== '' && amount !== ''){
            const incomeItem = item.updateIncomeItem(name,amount);
            ui.incomeListUpdate(incomeItem.name,incomeItem.amount, incomeItem.id, item);
            ui.clearFields();
         }

         ui.returnToAddIncome();

      }
   }

   incomeAddSubmit(){
      const name = ui.incomeNameInput.value;
      const selectName = ui.selectInput.value;
      const amount = ui.incomeAmountInput.value;
      if (item.data.state === 'income') {
         if (name !== '' && amount !== ''){
            const incomeItem = item.addIncomeItem(name,amount);
            ui.incomeListAdd(incomeItem.name,incomeItem.amount, incomeItem.id, item);
            ui.clearFields();
         }   
      } else if (item.data.state === 'allowances'){
         if (name !== '' && amount !== ''){
            const allowanceItem = item.addAllowancesItem(name,0,amount);
            ui.allowancesListAdd(allowanceItem.name,allowanceItem.amount, allowanceItem.spent, allowanceItem.id, item);
            ui.updateSelectHtml(item.getData().allowancesItems);
            ui.clearFields();   
         }
      } else if (item.data.state === 'expenses'){
         if (selectName !== '' && amount !== ''){
            const name = ui.selectInput.innerText;
            const desc = ui.expensesDescriptionInput.value;
            const date = ui.expensesDateInput.value;
            const expensesItem = item.addExpensesItem(name,amount,desc,date);
            ui.expensesListAdd(expensesItem.name,expensesItem.amount, expensesItem.desc,expensesItem.date, expensesItem.id, item);
            ui.updateAllowances(ui.selectInput.value,item.getData(),expensesItem.amount);
            ui.clearFields();
            // , 
         }
      }
   }

   init(){
      this.loadEventListeners();
      ui.incomeBtn.setAttribute('disabled', '');
      ui.selectFormGroup.style.display = 'none'
      ui.allowancesTable.style.display = 'none'
      ui.expensesTable.style.display = 'none'
      ui.editBtn.style.display = 'none'
      ui.deleteBtn.style.display = 'none'
      ui.backBtn.style.display = 'none'

      ui.changeState(item.getState());
   }
}

const app = new App;
app.init();