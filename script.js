document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const productTableContainer = document.getElementById('product-table-container');
    const productList = document.getElementById('product-list');
    const showHideButton = document.getElementById('show-hide');
    let isEditing = false;
    let editingIndex = null;
    let isTableVisible = false;

    let products = JSON.parse(localStorage.getItem('products')) || [];

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price.toFixed(2)}</td>
                <td><svg id="barcode-${index}"></svg></td>
                <td>
                    <button data-index="${index}" class="edit">Editar</button>
                    <button data-index="${index}" class="delete">Eliminar</button>
                </td>
            `;
            productList.appendChild(tr);

            // Generar el código de barras para el producto
            generateBarcode(product, index);
        });
    }

    function generateBarcode(product, index) {
        const barcodeElement = document.getElementById(`barcode-${index}`);
        const barcodeData = `${product.name}-${product.quantity}-${product.price.toFixed(2)}`;
        JsBarcode(barcodeElement, barcodeData, {
            format: "CODE128",
            width: 2,
            height: 50,
            displayValue: true
        });
    }

    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('product-name').value.trim();
        const quantity = parseInt(document.getElementById('product-quantity').value, 10);
        const price = parseFloat(document.getElementById('product-price').value);

        if (name && quantity > 0 && price >= 0) {
            if (isEditing) {
                products[editingIndex] = { name, quantity, price };
                isEditing = false;
                editingIndex = null;
            } else {
                products.push({ name, quantity, price });
            }
            saveProducts();
            form.reset();
        } else {
            alert('Por favor, complete todos los campos correctamente.');
        }
        renderProducts();
    }

    function handleShowHideClick() {
        isTableVisible = !isTableVisible;
        productTableContainer.style.display = isTableVisible ? 'block' : 'none'; 
        showHideButton.textContent = isTableVisible ? 'Ocultar' : 'Mostrar'; 
        if (isTableVisible) {
            renderProducts();
        }
    }

    function handleDeleteClick(e) {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            products.splice(index, 1);
            saveProducts();
            renderProducts();
        }
    }

    function handleEditClick(e) {
        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const product = products[index];
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-quantity').value = product.quantity;
            document.getElementById('product-price').value = product.price.toFixed(2);
            isEditing = true;
            editingIndex = index;
        }
    }

    form.addEventListener('submit', handleFormSubmit);
    showHideButton.addEventListener('click', handleShowHideClick);
    productList.addEventListener('click', handleDeleteClick);
    productList.addEventListener('click', handleEditClick);
});
