function initMooguisInfo() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    document.getElementById('id').value = id;
}

async function newMooguis() {
    const id = document.getElementById('id').value;
    const code = document.getElementById('code').value;
    const token = localStorage.getItem('jwt');

    if (!token) {
        alert('Token manquant. Veuillez vous reconnecter.');
        window.location.href = '/';
        return;
    }

    const response = await fetch('/api/new-mooguis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id, code }),
    });

    const data = await response.json();
    alert(data.message);
}

document.addEventListener('DOMContentLoaded', (event) => {
    initMooguisInfo();
});

window.newMooguis = newMooguis;