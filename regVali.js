document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const errorBox = document.getElementById("error-box");

    function showError(message) {
        errorBox.innerText = message;
        errorBox.style.display = "block";
    }

    function clearError() {
        errorBox.innerText = "";
        errorBox.style.display = "none";
    }

    function validateInput(input) {
        const value = input.value.trim();
        const placeholder = input.placeholder;
        let errorMessage = "";

        if (input.type === "text") {
            if (placeholder.includes("Name") && value.length < 3) {
                errorMessage = `${placeholder} must be at least 3 characters.`;
            } else if (placeholder.includes("Aadhaar") && !/^\d{12}$/.test(value)) {
                errorMessage = "Aadhaar No must be exactly 12 digits.";
            } else if (placeholder.includes("Pincode") && !/^\d{6}$/.test(value)) {
                errorMessage = "Pincode must be exactly 6 digits.";
            } else if (placeholder.includes("Nominee Name") && value.length < 3) {
                errorMessage = "Nominee Name must be at least 3 characters.";
            }
        }

        if (input.type === "tel") {
            if (placeholder.includes("Mobile") && !/^\d{10}$/.test(value)) {
                errorMessage = `${placeholder} must be exactly 10 digits.`;
            }
        }

        if (input.type === "password") {
            if (input.id === "password" && !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(value)) {
                errorMessage = "Password must be at least 6 characters, include a number and a special character.";
            } else if (input.id === "confirm-password" && value !== document.getElementById("password").value) {
                errorMessage = "Passwords do not match.";
            }
        }

        if (input.type === "email") {
            if (!/^\S+@\S+\.\S+$/.test(value)) {
                errorMessage = "Enter a valid email address.";
            }
        }

        if (input.type === "date") {
            if (new Date(value) > new Date()) {
                errorMessage = "Date of Birth cannot be in the future.";
            }
        }

        if (input.tagName === "SELECT") {
            if (input.value === "") {
                errorMessage = "Please select an option.";
            }
        }

        if (errorMessage) {
            showError(errorMessage);
            input.style.borderColor = "red";
        } else {
            clearError();
            input.style.borderColor = "";
        }
    }

    document.querySelectorAll("input, select").forEach((input) => {
        input.addEventListener("blur", () => validateInput(input));
    });

    form.addEventListener("submit", function (event) {
        let isValid = true;

        document.querySelectorAll("input, select").forEach((input) => {
            validateInput(input);
            if (input.style.borderColor === "red") {
                isValid = false;
            }
        });

        if (!document.querySelector(".terms input").checked) {
            showError("You must accept the terms and conditions.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});