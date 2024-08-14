document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === 'lopezdiego@gmail.com','kioto@gmail.com'  && password === '12345')
        {
       
        window.location.href = 'index.html';
    } else {
       
        errorMessage.textContent = 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.';
        errorMessage.style.color = 'red'; 
    }
});
