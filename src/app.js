import { ui } from './ui.js'
import { item } from './item.js'

class App {

   
   loadEventListeners(){
      ui.addBtn.addEventListener('click', this.incomeAddSubmit);
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

   incomeAddSubmit(){
      let name = ui.incomeNameInput.value;
      let amount = ui.incomeAmountInput.value;
      if (name !== '' && amount !== ''){
         const incomeItem = item.addIncomeItem(name,amount);
         ui.incomeListAdd(incomeItem.name,incomeItem.amount, incomeItem.id, item.getData());
         ui.clearFields();
      }
   

   }

   init(){
      this.loadEventListeners();
      ui.incomeBtn.setAttribute('disabled', '');

      ui.changeState((item.getState()));
   }
}

const app = new App;
app.init();