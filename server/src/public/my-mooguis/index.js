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

        data.data.forEach(nft => createNftCard(nft));
    } else {
        const errorData = await response.json();
        alert(errorData.message);
    }
}

function createNftCard(nft) {
    const nftContainer = document.getElementById('nftContainer');

    const card = document.createElement('div');
    card.className = 'bg-white shadow-lg rounded-lg overflow-hidden';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'relative w-full pt-[100%] bg-gray-200 p-2';

    const img = document.createElement('img');
    img.src = nft.image_url;
    img.alt = 'NFT Image';
    img.className = 'absolute top-0 left-0 w-full h-full object-cover rounded-md';

    imgContainer.appendChild(img);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'p-4';

    const attributes = nft.extra_metadata.attributes;
    attributes.forEach(attribute => {
        const attributeDiv = document.createElement('div');
        attributeDiv.className = 'mb-2';

        const traitType = document.createElement('span');
        traitType.className = 'font-bold text-gray-700';
        traitType.innerText = `${attribute.trait_type}: `;

        const value = document.createElement('span');
        value.className = 'text-gray-600';
        value.innerText = attribute.value;

        attributeDiv.appendChild(traitType);
        attributeDiv.appendChild(value);

        infoDiv.appendChild(attributeDiv);
    });

    card.appendChild(imgContainer);
    card.appendChild(infoDiv);

    nftContainer.appendChild(card);
}

document.addEventListener('DOMContentLoaded', (event) => {
    getMyMooguis().then();
});