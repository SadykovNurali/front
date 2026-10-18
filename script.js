document.addEventListener("DOMContentLoaded", function () {
   const form = document.getElementById("orderForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;

            const username = document.getElementById("username");
            if (username && username.value.trim() === "") {
                username.style.borderColor = "crimson";
                isValid = false;
            } else if (username) {
                username.style.borderColor = "gray";
            }

            const email = document.getElementById("email");
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailPattern.test(email.value.trim())) {
                email.style.borderColor = "crimson";
                isValid = false;
            } else if (email) {
                email.style.borderColor = "gray";
            }

            if (isValid) {
                alert("Form submitted successfully!");
                form.reset();
                if (username) username.style.borderColor = "gray";
                if (email) email.style.borderColor = "gray";
            }
        });
    }
    
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const currentItem = this.parentElement;
            
            accordionHeaders.forEach(item => {
                const parent = item.parentElement;
                if (parent !== currentItem) {
                    parent.classList.remove("active");
                    parent.querySelector(".accordion-body").style.display = "none";
                }
            });

            const body = this.nextElementSibling;
            if (currentItem.classList.contains("active")) {
                currentItem.classList.remove("active");
                body.style.display = "none";
            } else {
                currentItem.classList.add("active");
                body.style.display = "block";
            }
        });
    });

    const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const customPopup = document.getElementById("customPopup");

    if (openPopupBtn && customPopup) {
        openPopupBtn.addEventListener("click", function () {
            customPopup.style.display = "flex";
        });
    }

    if (closePopupBtn && customPopup) {
        closePopupBtn.addEventListener("click", function () {
            customPopup.style.display = "none";
        });
    }

    if (customPopup) {
        customPopup.addEventListener("click", function (event) {
            if (event.target === customPopup) {
                customPopup.style.display = "none";
            }
        });
    }
    const colorPicker = document.getElementById("fav-color");
    const mainHeader = document.getElementById("main-header");
    const mainFooter = document.querySelector("footer");

    const savedColor = localStorage.getItem("siteThemeColor");
    if (savedColor) {
        if (mainHeader) {
            mainHeader.style.backgroundColor = savedColor;
        }
        if (mainFooter) {
            mainFooter.style.backgroundColor = savedColor;
        }
        if (colorPicker) {
            colorPicker.value = savedColor;
        }
    }

    if (colorPicker) {
        colorPicker.addEventListener("input", function () {
            const selectedColor = colorPicker.value;
            if (mainHeader) {
                mainHeader.style.backgroundColor = selectedColor;
            }
            if (mainFooter) {
                mainFooter.style.backgroundColor = selectedColor;
            }
            localStorage.setItem("siteThemeColor", selectedColor);
        });
    }

    const dateElement = document.getElementById("clock-date");
    const timeElement = document.getElementById("clock-time");

    if (dateElement && timeElement) {
        function updateClock() {
            const now = new Date();
            
            const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('en-US', optionsDate);
            
            timeElement.textContent = now.toLocaleTimeString('en-US');
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    
    const goalButtons = document.querySelectorAll(".goal-btn");
    const goalInfoBox = document.getElementById("goal-info-box");
    const goalTitle = document.getElementById("goal-title");
    const goalText = document.getElementById("goal-text");

    const goalData = {
        muscle: {
            title: "Muscle Gain Insights",
            text: "To build quality muscle mass, consume a calorie surplus with 1.6–2.2g of protein per kilogram of body weight, combined with progressive overload resistance training."
        },
        weight: {
            title: "Weight Loss Insights",
            text: "Effective weight loss requires a sustainable calorie deficit, high fiber intake from vegetables and whole grains, and adequate hydration to boost metabolism."
        },
        endurance: {
            title: "Endurance Insights",
            text: "Endurance training demands complex carbohydrates for sustained glycogen storage, electrolyte balance, and proper post-workout recovery nutrition."
        }
    };

    let activeGoalKey = null;

    if (goalButtons.length > 0 && goalInfoBox) {
        goalButtons.forEach(button => {
            button.addEventListener("click", function () {
                const goalKey = this.getAttribute("data-goal");
                
                if (activeGoalKey === goalKey) {
                    goalInfoBox.style.display = "none";
                    activeGoalKey = null;
                } else {
                    const data = goalData[goalKey];
                    if (data) {
                        goalTitle.textContent = data.title;
                        goalText.textContent = data.text;
                        goalInfoBox.style.display = "block";
                        activeGoalKey = goalKey;
                    }
                }
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       TASK 4. Change background color (button + color picker)
       Colors are saved, so they stay the same on every page.
       ===================================================== */
    const colorPicker = document.getElementById("bg-color-picker");
    const colorButton = document.getElementById("bg-color-btn");
    const palette = ["#f5f7f2", "#e8f3e1", "#fdf3e1", "#e6f0f7", "#f6e8ef", "#eceaf7"];
    let colorIndex = 0;

    function applyColor(color) {
        document.body.style.backgroundColor = color;
        if (colorPicker) colorPicker.value = color;
        try { localStorage.setItem("fc-bg-color", color); } catch (e) { /* storage unavailable */ }
    }

    try {
        const saved = localStorage.getItem("fc-bg-color");
        if (saved) {
            document.body.style.backgroundColor = saved;
            if (colorPicker) colorPicker.value = saved;
            const savedIndex = palette.indexOf(saved);
            if (savedIndex !== -1) colorIndex = savedIndex;
        }
    } catch (e) { /* storage unavailable */ }

    if (colorButton) {
        colorButton.addEventListener("click", function () {
            colorIndex = (colorIndex + 1) % palette.length;
            applyColor(palette[colorIndex]);
        });
    }

    if (colorPicker) {
        colorPicker.addEventListener("input", function () {
            applyColor(colorPicker.value);
        });
    }

    /* =====================================================
       Recipe filter (recipes page)
       ===================================================== */
    const filterButtons = document.querySelectorAll("[data-filter]");
    const recipeItems = document.querySelectorAll(".recipe-item");
    const noRecipesMessage = document.getElementById("no-recipes");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });
            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            recipeItems.forEach(function (recipe) {
                const matches = selectedCategory === "all" ||
                    recipe.dataset.category === selectedCategory;
                recipe.classList.toggle("is-hidden", !matches);
                if (matches) visibleCount += 1;
            });

            if (noRecipesMessage) {
                noRecipesMessage.classList.toggle("d-none", visibleCount > 0);
            }
        });
    });

    /* =====================================================
       TASK 2. Accordion (FAQ) - hidden by default, toggles on click
       ===================================================== */
    document.querySelectorAll(".faq-item").forEach(function (item) {
        const button = item.querySelector(".accordion-header");
        if (!button) return;

        button.addEventListener("click", function () {
            const isOpen = item.classList.contains("is-open");
            item.classList.toggle("is-open", !isOpen);
            button.setAttribute("aria-expanded", String(!isOpen));
        });
    });

    /* =====================================================
       TASK 3. Popup subscription form
       Any element with [data-open-modal] opens the popup.
       ===================================================== */
    const modal = document.getElementById("subscription-modal");
    const openButtons = document.querySelectorAll("[data-open-modal]");
    const closeModalButton = document.getElementById("close-subscription");
    const firstModalInput = document.getElementById("subscriber-name");
    let lastOpener = null;

    function openModal(opener) {
        if (!modal) return;
        lastOpener = opener || null;
        modal.classList.add("is-visible");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        if (firstModalInput) firstModalInput.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("is-visible");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        if (lastOpener) lastOpener.focus();
    }

    openButtons.forEach(function (btn) {
        btn.addEventListener("click", function () { openModal(btn); });
    });

    if (closeModalButton) closeModalButton.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) closeModal();   // click outside the popup
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal && modal.classList.contains("is-visible")) {
            closeModal();
        }
    });

    /* =====================================================
       TASK 1. Form validation (live + on submit)
       ===================================================== */
    const form = document.getElementById("subscription-form");

    if (form) {
        const nameInput = document.getElementById("subscriber-name");
        const emailInput = document.getElementById("subscriber-email");
        const passwordInput = document.getElementById("subscriber-password");
        const confirmInput = document.getElementById("subscriber-confirm");
        const formMessage = document.getElementById("form-message");

        const rules = [
            { input: nameInput,     error: "Please enter your name.",
              test: function () { return nameInput.value.trim().length > 0; } },
            { input: emailInput,    error: "Please enter a valid email address (e.g. name@example.com).",
              test: function () { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()); } },
            { input: passwordInput, error: "Password must contain at least 8 characters.",
              test: function () { return passwordInput.value.length >= 8; } },
            { input: confirmInput,  error: "Passwords do not match.",
              test: function () { return confirmInput.value.length > 0 && confirmInput.value === passwordInput.value; } }
        ].filter(function (r) { return r.input; });

        function setMessage(text, type) {
            if (!formMessage) return;
            formMessage.textContent = text;
            formMessage.className = "form-message" + (type ? " " + type : "");
        }

        function validateRule(rule) {
            const ok = rule.test();
            rule.input.classList.toggle("is-invalid", !ok);
            rule.input.classList.toggle("is-valid", ok);
            const feedback = rule.input.parentElement.querySelector(".invalid-feedback");
            if (feedback) feedback.textContent = rule.error;
            return ok;
        }

        rules.forEach(function (rule) {
            rule.input.addEventListener("input", function () {
                validateRule(rule);
                // when the password changes, re-check the confirmation too
                if (rule.input === passwordInput && confirmInput.value.length > 0) {
                    validateRule(rules[rules.length - 1]);
                }
                setMessage("", "");
            });
            rule.input.addEventListener("blur", function () { validateRule(rule); });
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let allValid = true;
            rules.forEach(function (rule) {
                if (!validateRule(rule)) allValid = false;
            });

            if (!allValid) {
                setMessage("Please correct the highlighted fields and try again.", "error");
                return;
            }

            setMessage("Success! Thank you for subscribing to Food Craft.", "success");
            form.reset();
            rules.forEach(function (rule) {
                rule.input.classList.remove("is-valid", "is-invalid");
            });
        });
    }

    /* =====================================================
       TASK 5. Current date and time (updates every second)
       Format: "October 18, 2026, 10:45:12 AM"
       ===================================================== */
    const dateTimeDisplay = document.getElementById("datetime-display");

    function updateDateTime() {
        if (!dateTimeDisplay) return;
        const now = new Date();
        const datePart = now.toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
        });
        const timePart = now.toLocaleTimeString("en-US", {
            hour: "numeric", minute: "2-digit", second: "2-digit"
        });
        dateTimeDisplay.textContent = datePart + ", " + timePart;
    }

    updateDateTime();
    window.setInterval(updateDateTime, 1000);
});
