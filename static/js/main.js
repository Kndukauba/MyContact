
const userForm = document.getElementById('userForm'); 
if (userForm) {
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value),
        income_level: document.getElementById('income_level').value,
        currency: document.getElementById('currency').value,
        risk_tolerance: document.getElementById('risk_tolerance').value,
        retirement_age_target: parseInt(document.getElementById('retirement_age_target').value)
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  });
}

async function fetchUsers() {
  const response = await fetch('/users');
  const users = await response.json();
  const usersDiv = document.getElementById('usersList');
  usersDiv.innerHTML = ''; 
  users.forEach(user => {  
    usersDiv.innerHTML += `<p>${user[1]} | ${user[2]} | ${user[3]} | ${user[4]} | ${user[5]} | ${user[6]} | ${user[7]}</p>`;

  }); 
}

async function deleteUsers() {
  const response = await fetch('/delete_users', {method: 'DELETE'}); 
  const data = await response.json(); 
  alert(data.message); 
  fetchUsers(); 
}


const accountForm = document.getElementById('accountForm');
if (accountForm) {
  accountForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bank: document.getElementById('bank').value,
        account_type: document.getElementById('account_type').value,
        account_number: parseInt(document.getElementById('account_number').value),
        balance: parseInt(document.getElementById('balance').value),
        currency: document.getElementById('account_currency').value,
        interest_rate: parseFloat(document.getElementById('interest_rate').value),
        credit_limit: parseInt(document.getElementById('credit_limit').value)
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data)); 
  });
}

const transactionForm = document.getElementById('transactionForm');
if (transactionForm) {
  transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: parseInt(document.getElementById('amount').value),
        txn_type: document.getElementById('txn_type').value,
        merchant: document.getElementById('merchant').value,
        description: document.getElementById('description').value,
        txn_date: document.getElementById('txn_date').value,
        status: document.getElementById('status').value,
        payment_method: document.getElementById('payment_method').value
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  });
}

const categoryForm = document.getElementById('categoryForm');
if (categoryForm) {
  categoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category_name: document.getElementById('category_name').value,
        current_income: parseInt(document.getElementById('current_income').value)
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  });
} 

async function fetchCategories() { 
  const response = await fetch('/categories');
  const categories = await response.json();
  const Divhtml = document.getElementById("categoriesList");
  Divhtml.innerHTML = ''; 
  categories.forEach(category => { 
     Divhtml.innerHTML += `<p>${category[1]} | ${category[2]}</p>`;
  });
} 

async function deleteCategories() {
  const response = await fetch('/delete_categories', {method: 'DELETE'}); 
  const data = await response.json();  
  alert(data.message); 
  fetchCategories();  
}

const budgetForm = document.getElementById('budgetForm');
if (budgetForm) {
  budgetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount_limit: parseInt(document.getElementById('amount_limit').value),
        timeframe: document.getElementById('timeframe').value
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  });
}


const goalForm = document.getElementById('goalForm');
if (goalForm) {
  goalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_goal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        goal_type: document.getElementById('goal_type').value,
        goal_name: document.getElementById('goal_name').value,
        target_amount: parseInt(document.getElementById('target_amount').value),
        current_progress: parseInt(document.getElementById('current_progress').value),
        target_date: document.getElementById('target_date').value,
        priority: document.getElementById('priority').value,
        strategy: document.getElementById('strategy').value
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  });
}


const recurringForm = document.getElementById('recurringForm');
if (recurringForm) {
  recurringForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_recurring', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: parseInt(document.getElementById('amount_recurring').value),
        frequency: document.getElementById('frequency').value,
        next_due: document.getElementById('next_due').value,
        end_date: document.getElementById('end_date').value,
        description: document.getElementById('description_recurring').value,
        investment_auto: document.getElementById('investment_auto').value
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  });
}


const investmentForm = document.getElementById('investmentForm');
if (investmentForm) {
  investmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_investment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        investment_type: document.getElementById('investment_type').value,
        amount_investment: parseInt(document.getElementById('amount_investment').value),
        current_value: parseInt(document.getElementById('current_value').value),
        risk_level: document.getElementById('risk_level').value
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  });
}


const adviceForm = document.getElementById('adviceForm');
if (adviceForm) {
  adviceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        advice_text: document.getElementById('advice_text').value,
        status: document.getElementById('status_advice').value
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  });
}


const reportForm = document.getElementById('reportForm');
if (reportForm) {
  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/add_report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        report_type: document.getElementById('report_type').value
      })
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  });
}
