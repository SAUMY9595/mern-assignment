document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value;
    fetchDataWithSpinner(query); // Fetch products with spinner
});

function fetchProducts(query = '') {
    fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then(response => response.json())
        .then(data => displayProducts(data.products))
        .catch(error => console.error("Failed to fetch products:", error));
}

function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    document.body.appendChild(spinner);
}

function removeLoadingSpinner() {
    const spinner = document.querySelector('.spinner');
    if (spinner) {
        document.body.removeChild(spinner);
    }
}

function fetchDataWithSpinner(query) {
    showLoadingSpinner();
    fetchProducts(query).finally(removeLoadingSpinner);
}

function displayProducts(products) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: ${product.price}</p>
        `;
        container.appendChild(card);
    });
}

fetchProducts();