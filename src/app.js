import { ui } from './ui.js'
import { item } from './item.js'

class App {
   loadEventListeners(){
      ui.addBtn.addEventListener('click', this.incomeAddSubmit);
   }

   incomeAddSubmit(){
      let name = ui.incomeNameInput.value;
      let amount = ui.incomeAmountInput.value;
      const incomeItem = item.addIncomeItem(name,amount);
      ui.updateIncomeUI(incomeItem.name,incomeItem.amount, incomeItem.id, item.getData());

   }

   init(){
      this.loadEventListeners()
   }
}

const app = new App;
app.init();