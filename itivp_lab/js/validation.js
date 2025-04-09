document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const addressInput = document.getElementById("address");
    const submitButton = document.querySelector(".submit-button");
  
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
      const value = nameInput.value.trimStart();
      nameInput.value = value;
      removeError(nameInput);
  
      if (!value) {
        showError(nameInput, "Поле имени обязательно для заполнения.");
        return false;
      }
      if (/^\s/.test(value)) {
        showError(nameInput, "Имя не должно начинаться с пробела.");
        return false;
      }
      if (/\d/.test(value)) {
        showError(nameInput, "Имя не должно содержать цифры.");
        return false;
      }
      if (value.length > 40) {
        showError(nameInput, "Имя не должно превышать 40 символов.");
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
      if (/[A-Za-zА-Яа-я]/.test(value)) {
        showError(numberInput, "Номер не должен содержать буквы.");
        return false;
      }
      if (/[^0-9+]/.test(value)) {
        showError(numberInput, "Номер должен содержать только цифры и '+'.");
        return false;
      }
      if (value.length > 8) {
        showError(numberInput, "Максимальная длина номера — 8 символов.");
        return false;
      }
      return true;
    }
  
    function validateAddress() {
      const value = addressInput.value.trimStart();
      addressInput.value = value;
      removeError(addressInput);
  
      if (!value) {
        showError(addressInput, "Поле адреса обязательно для заполнения.");
        return false;
      }
      if (/^\s/.test(value)) {
        showError(addressInput, "Адрес не должен начинаться с пробела.");
        return false;
      }
      if (value.length > 50) {
        showError(addressInput, "Адрес не должен превышать 50 символов.");
        return false;
      }
      return true;
    }
  
    // Валидация по вводу
    nameInput.addEventListener("input", validateName);
    numberInput.addEventListener("input", validateNumber);
    addressInput.addEventListener("input", validateAddress);
  
    // Валидация по нажатию кнопки
    submitButton.addEventListener("click", function (e) {
      e.preventDefault(); // Отключаем стандартное поведение
  
      const validName = validateName();
      const validNumber = validateNumber();
      const validAddress = validateAddress();
  
      if (validName && validNumber && validAddress) {
        alert("Данные введены корректно!");
        // Тут можно будет отправить форму или продолжить обработку
      }
    });
  });
  