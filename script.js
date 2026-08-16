// ===============================
// NORTHSTAR SUPPORT HUB
// JavaScript functionality
// ===============================


// -------------------------------
// SHOW SUPPORT SECTION
// -------------------------------

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".support-section");

    sections.forEach(function(section) {
        section.style.display = "none";
    });

    const selected =
        document.getElementById(sectionId);

    if (selected) {
        selected.style.display = "block";

        selected.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// -------------------------------
// LOAD ORDERS
// -------------------------------

async function getOrders() {

    const response =
        await fetch("data/orders.json");

    return await response.json();
}


// -------------------------------
// CHECK ORDER
// -------------------------------

async function checkOrder() {

    const input =
        document.getElementById("order-input");

    const result =
        document.getElementById("order-result");

    const orderId =
        input.value.trim();

    if (orderId === "") {

        result.textContent =
            "Please enter your order number.";

        return;
    }

    try {

        const orders =
            await getOrders();

        const order =
            orders.find(function(item) {

                return item.orderId.toLowerCase()
                    === orderId.toLowerCase();

            });


        if (!order) {

            result.textContent =
                "Order not found.";

            return;
        }


        result.innerHTML = `
            <strong>Order ${order.orderId}</strong><br>
            Status: ${order.status}<br>
            Delivery: ${order.delivery}
        `;

    }

    catch (error) {

        result.textContent =
            "Unable to load order information.";

        console.error(error);
    }
}


// -------------------------------
// LOAD SUPPORT ANSWERS
// -------------------------------

async function getSupportAnswers() {

    const response =
        await fetch("data/support.json");

    return await response.json();
}


// -------------------------------
// CHECK SUPPORT QUESTION
// -------------------------------

async function checkSupport() {

    const selection =
        document.getElementById(
            "support-question"
        );

    const result =
        document.getElementById(
            "support-result"
        );

    const questionId =
        selection.value;


    if (questionId === "") {

        result.textContent =
            "Please select a question.";

        return;
    }


    try {

        const answers =
            await getSupportAnswers();

        const answer =
            answers.find(function(item) {

                return item.id === questionId;

            });


        if (!answer) {

            result.textContent =
                "Answer not found.";

            return;
        }


        result.innerHTML = `
            <strong>${answer.question}</strong><br>
            ${answer.answer}
        `;

    }

    catch (error) {

        result.textContent =
            "Unable to load support information.";

        console.error(error);
    }
}


// -------------------------------
// LOAD PRODUCTS
// -------------------------------

async function getProducts() {

    const response =
        await fetch("data/products.json");

    return await response.json();
}


// -------------------------------
// CHECK STOCK
// -------------------------------

async function checkStock() {

    const productSelect =
        document.getElementById(
            "product-select"
        );

    const sizeSelect =
        document.getElementById(
            "size-select"
        );

    const result =
        document.getElementById(
            "stock-result"
        );


    const productName =
        productSelect.value;

    const size =
        sizeSelect.value;


    if (productName === "") {

        result.textContent =
            "Please select a product.";

        return;
    }


    if (size === "") {

        result.textContent =
            "Please select a size.";

        return;
    }


    try {

        const products =
            await getProducts();


        const product =
            products.find(function(item) {

                return item.product === productName;

            });


        if (!product) {

            result.textContent =
                "Product not found.";

            return;
        }


        const quantity =
            product.sizes[size];


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

document
    .getElementById("order-button")
    .addEventListener(
        "click",
        checkOrder
    );


document
    .getElementById("support-button")
    .addEventListener(
        "click",
        checkSupport
    );


document
    .getElementById("stock-button")
    .addEventListener(
        "click",
        checkStock
    );
