// ==========================================
// NORTHSTAR RETAIL CORE — PEARL TASK 6
// Support lookup logic: orders, stock and help
// ==========================================

async function loadJSON(file) {
    const response = await fetch(file);

    if (!response.ok) {
        throw new Error(`Unable to load ${file}`);
    }

    return await response.json();
}

// -------------------------------
// ORDER LOOKUP
// -------------------------------

async function checkOrder() {
    const input = document.getElementById("order-input");
    const result = document.getElementById("order-result");

    if (!input || !result) return;

    const orderNumber = input.value.trim().toUpperCase();

    if (!orderNumber) {
        result.textContent = "Please enter an order number.";
        return;
    }

    try {
        const orders = await loadJSON("data/orders.json");

        // Supports either:
        // { "NS1001": {...} }
        // or [ { "id": "NS1001", ... } ]
        const order = Array.isArray(orders)
            ? orders.find(item =>
                String(item.id || item.orderNumber || item.order_id).toUpperCase() === orderNumber
              )
            : orders[orderNumber];

        if (!order) {
            result.textContent = "Order not found.";
            return;
        }

        const status = order.status || "Status unavailable";
        const delivery = order.delivery || order.estimatedDelivery || order.eta || "Delivery date unavailable";

        result.innerHTML = `
            <strong>Order ${orderNumber}</strong><br>
            Status: ${status}<br>
            Delivery: ${delivery}
        `;
    }
    catch (error) {
        result.textContent = "Unable to load order information.";
        console.error(error);
    }
}

// -------------------------------
// SUPPORT LOOKUP
// -------------------------------

async function checkSupport() {
    const input = document.getElementById("support-input");
    const result = document.getElementById("support-result");

    if (!input || !result) return;

    const question = input.value.trim().toLowerCase();

    if (!question) {
        result.textContent = "Please select or enter a support question.";
        return;
    }

    try {
        const support = await loadJSON("data/support.json");

        let answer = null;

        if (Array.isArray(support)) {
            const item = support.find(entry => {
                const questionText = String(
                    entry.question || entry.title || entry.topic || ""
                ).toLowerCase();

                return questionText === question || questionText.includes(question);
            });

            answer = item?.answer || item?.response;
        } else {
            // Direct key lookup first.
            answer = support[question];

            // Then look through object values if the JSON uses
            // { question, answer } records.
            if (!answer) {
                const item = Object.values(support).find(entry => {
                    if (typeof entry !== "object" || !entry) return false;

                    const questionText = String(
                        entry.question || entry.title || entry.topic || ""
                    ).toLowerCase();

                    return questionText === question || questionText.includes(question);
                });

                answer = item?.answer || item?.response;
            }
        }

        if (!answer) {
            result.textContent =
                "Support information for that question was not found.";
            return;
        }

        result.innerHTML = `<strong>Support guidance</strong><br>${answer}`;
    }
    catch (error) {
        result.textContent =
            "Unable to load support information.";
        console.error(error);
    }
}

// -------------------------------
// STOCK LOOKUP
// -------------------------------

async function checkStock() {
    const productInput = document.getElementById("product-input");
    const sizeInput = document.getElementById("size-input");
    const result = document.getElementById("stock-result");

    if (!productInput || !sizeInput || !result) return;

    const productName = productInput.value.trim();
    const size = sizeInput.value.trim();

    if (!productName) {
        result.textContent = "Please select a product.";
        return;
    }

    if (!size) {
        result.textContent = "Please select a size.";
        return;
    }

    try {
        const products = await loadJSON("data/products.json");

        let product;

        if (Array.isArray(products)) {
            product = products.find(item => {
                const name = String(
                    item.name || item.product || item.id || ""
                ).toLowerCase();

                return name === productName.toLowerCase()
                    || name.includes(productName.toLowerCase());
            });
        } else {
            product = products[productName];

            if (!product) {
                product = Object.values(products).find(item => {
                    if (typeof item !== "object" || !item) return false;

                    const name = String(
                        item.name || item.product || item.id || ""
                    ).toLowerCase();

                    return name === productName.toLowerCase()
                        || name.includes(productName.toLowerCase());
                });
            }
        }

        if (!product) {
            result.textContent =
                "Product not found.";
            return;
        }

        const sizes = product.sizes || product.stock || {};
        const quantity = sizes[size];

        if (quantity === undefined) {
            result.textContent =
                "This size is not available.";
            return;
        }

        if (quantity === 0) {
            result.textContent =
                "Currently unavailable.";
            return;
        }

        result.innerHTML = `
            <strong>Available!</strong><br>
            ${quantity} units available.
        `;
    }
    catch (error) {
        result.textContent =
            "Unable to load stock information.";
        console.error(error);
    }
}

// -------------------------------
// BUTTON EVENTS
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const orderButton = document.getElementById("order-button");
    const supportButton = document.getElementById("support-button");
    const stockButton = document.getElementById("stock-button");

    if (orderButton) {
        orderButton.addEventListener("click", checkOrder);
    }

    if (supportButton) {
        supportButton.addEventListener("click", checkSupport);
    }

    if (stockButton) {
        stockButton.addEventListener("click", checkStock);
    }
});
