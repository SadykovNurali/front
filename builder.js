// Builder page: validation of the "Assemble Your Custom Bowl" form (Task 1).
// Background color, date/time, popup and accordion are in the shared script.js.

// Show an error under the field (red border + text)
function showError(input, text) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.nextElementSibling.textContent = text; // next element after the input = error div
}

// Mark the field as correct (green border)
function showOk(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.nextElementSibling.textContent = '';
}

// Simple email check: there is "@" and a dot after it
function isEmailOk(email) {
    const at = email.indexOf('@');
    const dot = email.lastIndexOf('.');
    return at > 0 && dot > at + 1 && dot < email.length - 1;
}

const form = document.getElementById('buildForm');
const successBox = document.getElementById('formSuccess');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // do not send the form until it is checked

    const name = document.getElementById('builder-name');
    const email = document.getElementById('builder-email');
    const password = document.getElementById('builder-password');
    const confirm = document.getElementById('builder-confirm');

    let isValid = true; // everything is fine until we find an error
    successBox.classList.add('d-none');

    // Name
    if (name.value.trim() === '') {
        showError(name, 'Name is required.');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters.');
        isValid = false;
    } else {
        showOk(name);
    }

    // Email
    if (email.value.trim() === '') {
        showError(email, 'Email is required.');
        isValid = false;
    } else if (!isEmailOk(email.value.trim())) {
        showError(email, 'Enter a valid email, for example name@mail.com');
        isValid = false;
    } else {
        showOk(email);
    }

    // Password
    if (password.value === '') {
        showError(password, 'Password is required.');
        isValid = false;
    } else if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        showOk(password);
    }

    // Password confirmation
    if (confirm.value === '') {
        showError(confirm, 'Please confirm your password.');
        isValid = false;
    } else if (confirm.value !== password.value) {
        showError(confirm, 'Passwords do not match.');
        isValid = false;
    } else {
        showOk(confirm);
    }

    // No errors: show the message and clear the form
    if (isValid) {
        successBox.textContent = 'Thank you, ' + name.value.trim() + '! Your custom bowl has been saved.';
        successBox.classList.remove('d-none');
        form.reset();

        const inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('is-valid');
        }
    }
});
