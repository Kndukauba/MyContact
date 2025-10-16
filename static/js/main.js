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