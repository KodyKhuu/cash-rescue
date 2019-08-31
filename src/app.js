import { ui } from './ui.js'
import { item } from './item.js'

class App {
   loadEventListeners(){
      ui.addBtn.addEventListener('click', () => {
         console.log(ui.nameFormGroup.innerHTML)
         item.logData()
         this.incomeAddSubmit()
      });
      ui.incomeBtn.addEventListener('click', () => {
         item.logData()
         item.data.state = 'income'
         ui.changeState(item.getState())
      });
      ui.allowancesBtn.addEventListener('click', () => {
         item.logData()
         item.data.state = 'allowances'
         ui.changeState(item.getState())
      });
      ui.expensesBtn.addEventListener('click', () => {
         item.logData()
         item.data.state = 'expenses'
         ui.changeState(item.getState())
      });
   }

   incomeAddSubmit(){
      const name = ui.incomeNameInput.value;
      const amount = ui.incomeAmountInput.value;
      if (item.data.state === 'income') {
         if (name !== '' && amount !== ''){
            const incomeItem = item.addIncomeItem(name,amount);
            ui.incomeListAdd(incomeItem.name,incomeItem.amount, incomeItem.id, item.getData());
            ui.clearFields();
         }   
      } else if (item.data.state === 'allowances'){
         if (name !== '' && amount !== ''){
            const allowanceItem = item.addAllowancesItem(name,[],amount);
            ui.allowancesListAdd(allowanceItem.name,allowanceItem.amount, allowanceItem.id, item.getData());
            item.data.expensesChoices.push(item.createSelectItem(allowanceItem.id, `<option value="${name}">${name}</option>
`))
            ui.updateSelectHtml(item.data.expensesChoices);
            ui.selectInput.innerHTML = ui.selectHtml;
            console.log(ui.selectHtml);
            ui.clearFields();   
         }
      } else if (item.data.state === 'expenses'){
         if (true){
            const name = ui.selectInput.value;
            const desc = ui.expensesDescriptionInput.value;
            const date = ui.expensesDateInput.value;
            const expensesItem = item.addExpensesItem(name,amount,desc,date);
            ui.expensesListAdd(expensesItem.name,expensesItem.amount, expensesItem.desc,expensesItem.date, expensesItem.id, item.getData());
            // ui.clearFields();
            // ui.expensesDateInput.value = '';
            // ui.expensesDescriptionInput.value = '';
         }
      }
   }

   init(){
      this.loadEventListeners();
      ui.incomeBtn.setAttribute('disabled', '');
      ui.selectFormGroup.style.display = 'none'
      ui.allowancesList.style.display = 'none'
      ui.expensesList.style.display = 'none'
      ui.changeState((item.getState()));
   }
}

const app = new App;
app.init();