import { notifyError } from './components/Toasters';

export function validatePhoneNumber(numberToValidate) {
  const regex = /^\d{10}$/;

  if (regex.test(numberToValidate)) {
    return true;
  } else {
    notifyError('Enter valid phone number');
    return false;
  }
}

export function validateEmail(emailToValidate) {
  const regex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;

  if (regex.test(emailToValidate)) {
    return true;
  } else {
    notifyError('Enter valid email');
    return false;
  }
}

export function validatePinCode(pincodeToValidate) {
  const regex = /^\d{6}$/;

  if (regex.test(pincodeToValidate)) {
    return true;
  } else {
    notifyError('Enter valid pincode');
    return false;
  }
}

export function validateText(textToValidate) {
  const regex = /^[A-Za-z]+$/;

  if (regex.test(textToValidate)) {
    return true;
  } else {
    notifyError('Enter valid text');
    return false;
  }
}

export function validateNonEmptyText(textToValidate) {
  const regex = /\S+/;

  if (regex.test(textToValidate)) {
    return true;
  } else {
    notifyError('Enter valid input');
    return false;
  }
}
