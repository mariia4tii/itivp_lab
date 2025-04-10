document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const numberInput = document.getElementById("number");
  const addressInput = document.getElementById("address");
  const submitButton = document.querySelector(".submit-button");
  const paymentOptions = document.querySelectorAll('input[name="payment-type"]');
  const paymentBlock = document.getElementById("payment");

  function showError(input, message) {
    let wrapper = input.nextElementSibling;
    if (!wrapper || !wrapper.classList.contains("error-wrapper")) {
      wrapper = document.createElement("div");
      wrapper.className = "error-wrapper";
      input.insertAdjacentElement("afterend", wrapper);
    }
    wrapper.textContent = message;
  }

  function removeError(input) {
    const wrapper = input.nextElementSibling;
    if (wrapper && wrapper.classList.contains("error-wrapper")) {
      wrapper.textContent = "";
    }
  }

  function validateName() {
    const value = nameInput.value.trim();
    nameInput.value = value;
    removeError(nameInput);

    if (!value) {
      showError(nameInput, "Поле имени обязательно для заполнения.");
      return false;
    }

    return true;
  }

  function validateNumber() {
    const value = numberInput.value;
    removeError(numberInput);

    if (!value) {
      showError(numberInput, "Поле номера обязательно для заполнения.");
      return false;
    }

    if (value.startsWith("+375") && value.length > 13) {
      showError(numberInput, "Номер с +375 не должен превышать 13 символов.");
      return false;
    }

    if (value.startsWith("80") && value.length > 11) {
      showError(numberInput, "Номер с 80 не должен превышать 11 символов.");
      return false;
    }

    if (!value.startsWith("+375") && !value.startsWith("80")) {
      showError(numberInput, "Номер должен начинаться с +375 или 80.");
      return false;
    }

    return true;
  }

  function validateAddress() {
    const value = addressInput.value.trim();
    addressInput.value = value;
    removeError(addressInput);

    if (!value) {
      showError(addressInput, "Поле адреса обязательно для заполнения.");
      return false;
    }

    return true;
  }

  function validatePayment() {
    const selected = [...paymentOptions].some(option => option.checked);
    let error = paymentBlock.querySelector(".error-wrapper");

    if (!selected) {
      if (!error) {
        error = document.createElement("div");
        error.className = "error-wrapper";
        error.style.color = "red";
        error.style.fontSize = "0.9em";
        error.style.marginTop = "4px";
        error.textContent = "Выберите способ оплаты.";
        paymentBlock.appendChild(error);
      }
      return false;
    } else if (error) {
      error.remove();
    }

    return true;
  }

  nameInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const isLetter = /^[a-zA-Zа-яА-ЯёЁ]$/.test(key);
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];

    if (!isLetter && !allowedKeys.includes(key)) {
      e.preventDefault();
    }

    if (nameInput.value.length >= 40 && !allowedKeys.includes(key)) {
      e.preventDefault();
    }
  });

  numberInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const isDigitOrPlus = /^[0-9+]$/.test(key);
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];

    if (!isDigitOrPlus && !allowedKeys.includes(key)) {
      e.preventDefault();
      return;
    }

    let value = numberInput.value;

    if (allowedKeys.includes(key)) return;

    // Предпросмотр следующего значения
    if (key.length === 1) {
      const selectionStart = numberInput.selectionStart;
      const selectionEnd = numberInput.selectionEnd;
      value = value.slice(0, selectionStart) + key + value.slice(selectionEnd);
    }

    if (value.startsWith("+375") && value.length > 12) {
      e.preventDefault();
    } else if (value.startsWith("80") && value.length > 10) {
      e.preventDefault();
    } else if (!value.startsWith("+375") && !value.startsWith("80") && value.length > 0) {
      e.preventDefault();
    }
  });

  addressInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const isAllowed = /^[a-zA-Zа-яА-ЯёЁ0-9.,\s]$/.test(key);
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];

    if (!isAllowed && !allowedKeys.includes(key)) {
      e.preventDefault();
    }

    if (addressInput.value.length >= 50 && !allowedKeys.includes(key)) {
      e.preventDefault();
    }
  });

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    const validName = validateName();
    const validNumber = validateNumber();
    const validAddress = validateAddress();
    const validPayment = validatePayment();

    if (validName && validNumber && validAddress && validPayment) {
      console.log("Форма успешно прошла строгую валидацию!");
    }
  });
});
