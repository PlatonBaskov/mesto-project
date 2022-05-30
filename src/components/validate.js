function enableValidation(settings) {
  const popupElements = Array.from(document.querySelectorAll(settings.popupSelector))
  popupElements.forEach( (popupElement) => {
    const form = popupElement.querySelector(settings.formSelector)
    if(form !== null) {
      setEventListeners(popupElement, form, settings)
    };
   });
};
    
function setEventListeners(popupElement, formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  toggleSubmitButton(inputList, submitButton, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleSubmitButton(inputList, submitButton, settings);
    });
  });   
};
    
function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  };
};
    
function hasInvalidInput(inputList) {
  return inputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
};
    
function toggleSubmitButton(inputList, buttonElement, settings) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};
    
    
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};
    
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';    
};

export { enableValidation };