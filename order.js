// Order page: validation of the delivery order form (Task 1).
// The FAQ accordion, popup, date/time and background color are in the shared script.js.

function showError(input, text) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.nextElementSibling.textContent = text;
}

function showOk(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.nextElementSibling.textContent = '';
}

const orderForm = document.getElementById('orderForm');
const orderSuccess = document.getElementById('orderSuccess');

orderForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const customer = document.getElementById('order-customer');
    const address = document.getElementById('order-address');
    let isValid = true;
    orderSuccess.classList.add('d-none');

    if (customer.value.trim() === '') {
        showError(customer, 'Customer name is required.');
        isValid = false;
    } else if (customer.value.trim().length < 2) {
        showError(customer, 'Name must be at least 2 characters.');
        isValid = false;
    } else {
        showOk(customer);
    }

    if (address.value.trim() === '') {
        showError(address, 'Delivery address is required.');
        isValid = false;
    } else if (address.value.trim().length < 5) {
        showError(address, 'Please enter the full address (at least 5 characters).');
        isValid = false;
    } else {
        showOk(address);
    }

    if (isValid) {
        orderSuccess.textContent = 'Thank you, ' + customer.value.trim() + '! Your order request has been sent.';
        orderSuccess.classList.remove('d-none');
        orderForm.reset();
        customer.classList.remove('is-valid');
        address.classList.remove('is-valid');
    }
});
