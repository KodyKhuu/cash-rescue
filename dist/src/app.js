import { ui } from './ui.js'
import { item } from './item.js'

class App {
   loadEventListeners(){
      ui.incomeTable.addEventListener('click',(e) => {
         ui.changeEditState(e, item)
      });

      ui.allowancesTable.addEventListener('click', (e) => {
         ui.changeEditState(e, item)
      });

      ui.expensesTable.addEventListener('click', (e) => {
         ui.changeEditState(e, item)
      })

      ui.editBtn.addEventListener('click', () => {
         this.incomeUpdateSubmit(item);
      });

      ui.deleteBtn.addEventListener('click', () => {
         this.deleteItem();
      });
      ui.backBtn.addEventListener('click', () => {
         ui.returnToAddState()
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

   deleteItem(){
      item.delItem();
      ui.removeItem();
   }

   incomeUpdateSubmit(item){
      const name = ui.incomeNameInput.value;
      const amount = ui.incomeAmountInput.value;
      if (item.getState() === 'income') {
         if (name !== '' && amount !== ''){
            const incomeItem = item.updateItem(name,amount,null,null,item.getData().incomeItems);
            ui.tableUpdate(incomeItem, item);
         }
      } else if (item.getState() === 'allowances') {
         if (name !== '' && amount !== ''){
            const allowancesItem = item.updateItem(name,amount,null,null,item.getData().allowancesItems);
            ui.tableUpdate(allowancesItem, item);
         }
      } else if (item.getState() === 'expenses') {
         
         const expensesName = ui.selectInput[ui.selectInput.value].innerText;
         const desc = ui.expensesDescriptionInput.value;
         const date = ui.expensesDateInput.value;
         if (expensesName !== '' && amount !== '') {
            const expensesItem = item.updateItem(expensesName,amount,desc,date,item.getData().expensesItems)
            ui.tableUpdate(expensesItem, item)
            ui.updateAllowances(ui.selectInput.value,item.getData(),expensesItem.amount);
         }
      }
      ui.clearFields();
      ui.returnToAddState();
   }


   incomeAddSubmit(){
      const name = ui.incomeNameInput.value;
      const selectName = ui.selectInput.value;
      const amount = ui.incomeAmountInput.value;
      if (item.getState() === 'income') {
         if (name !== '' && amount !== ''){
            const incomeItem = item.addIncomeItem(name,amount);
            ui.incomeListAdd(incomeItem.name,incomeItem.amount, incomeItem.id, item);
            ui.clearFields();
         }   
      } else if (item.getState() === 'allowances'){
         if (name !== '' && amount !== ''){
            const allowanceItem = item.addAllowancesItem(name,amount);
            ui.allowancesListAdd(allowanceItem.name,allowanceItem.amount, allowanceItem.spent, allowanceItem.id, item);
            ui.updateSelectHtml(item.getData().allowancesItems);
            ui.clearFields();   
         }
      } else if (item.getState() === 'expenses'){
         if (selectName !== '' && amount !== ''){
            const name = ui.selectInput[ui.selectInput.value].innerText;
            const desc = ui.expensesDescriptionInput.value;
            const date = ui.expensesDateInput.value;
            const expensesItem = item.addExpensesItem(name,amount,desc,date);
            ui.expensesListAdd(expensesItem.name,expensesItem.amount, expensesItem.desc,expensesItem.date, expensesItem.id, item);
            ui.updateAllowances(ui.selectInput.value,item.getData(),expensesItem.amount);
            ui.clearFields();
         }
      }
   }

   init(){
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      this.loadEventListeners();
      let d = new Date();
      ui.month.innerText = months[d.getMonth()];
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