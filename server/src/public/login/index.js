function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

async function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message);
    if (data.token) {
        localStorage.setItem('jwt', data.token);
        showLogin();
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwt', data.token);
        window.location.href = '/my-mooguis';
    } else {
        const errorData = await response.json();
        alert(errorData.message);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    showLogin()
});


window.showLogin = showLogin;
window.showRegister = showRegister;
window.register = register;
window.login = login;