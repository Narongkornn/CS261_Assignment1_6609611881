document.getElementById('loginForm').addEventListener('submit', submitLogin);

function submitLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Application-Key': 'TUa2e2b6005fde4d72dd2f0af4b53b365251f65a42cbfcaac5663bc8ca3fb67b739915a0c6f0a57e25b01b6e98454ab340'
    },
    body: JSON.stringify({ 
      UserName :username, 
      PassWord: password 
    })
  })
  .then(response => response.json())
  .then(data => {
    const messageElement = document.getElementById('message');
    if(data.message === 'Success'){
      messageElement.innerHTML = `
        <p>${data.message}</p>
        <p>Username: ${data.username}</p>
        <p>Email: ${data.email}</p>
        <p>Display Name: ${data.displayname_en}</p>
        <p>Faculty: ${data.faculty}</p>
      `;
    } else {
      messageElement.innerText = 'Login status: ' + data.message;
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('message').innerText = 'An error occurred: ' + error.message;
  });
}
