// Appel à l'API d'inscription
async function getMyMooguis() {
    const token = localStorage.getItem('jwt');

    if (!token) {
        window.location.href = '/';
    }

    const response = await fetch('/api/my-mooguis', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        const errorData = await response.json();
        alert(errorData.message);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    getMyMooguis().then();
});


window.getMyMooguis = getMyMooguis;