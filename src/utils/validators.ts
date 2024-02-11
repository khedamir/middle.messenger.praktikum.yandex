export const login = (value: string): string | false => {
  const minLength = 3;
  const maxLength = 20;

  if (value.length === 0) {
    return 'Field can not be empty';
  }

  if (value.length < minLength) {
    return `Length of login should not be less than ${minLength} letters.`;
  }

  if (value.length > maxLength) {
    return `Length of login should not exceed ${maxLength} letters.`;
  }

  // Проверка на использование только латинских букв
  if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
    return 'Login should only contain Latin letters, numbers, hyphens, and underscores.';
  }

  // Проверка, что login не состоит только из цифр
  if (/^\d+$/.test(value)) {
    return 'Login should not consist only of numbers.';
  }

  return false;
};

export const password = (value: string): string | false => {
  const minLength = 8;
  const maxLength = 40;

  if (value.length === 0) {
    return 'Field can not be empty';
  }

  if (value.length < minLength) {
    return `Password should be at least ${minLength} characters long.`;
  }

  if (value.length > maxLength) {
    return `Password should not exceed ${maxLength} characters.`;
  }

  // Проверка на наличие хотя бы одной заглавной буквы
  if (!/[A-Z]/.test(value)) {
    return 'Password should contain at least one uppercase letter.';
  }

  // Проверка на наличие хотя бы одной цифры
  if (!/\d/.test(value)) {
    return 'Password should contain at least one digit.';
  }

  return false;
};

export const name = (value: string): string | false => {
  const regex = /^[A-Za-zА-Яа-яЁё-]+$/;

  if (value.length === 0) {
    return 'Field can not be empty';
  }

  if (!regex.test(value)) {
    return 'Invalid characters in the name.';
  }

  if (!/^[A-ZА-ЯЁ]/.test(value)) {
    return 'Name should start with an uppercase letter.';
  }
  return false;
};

export const email = (value: string): string | false => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  if (value.length === 0) {
    return 'Field can not be empty';
  }

  if (!emailRegex.test(value)) {
    return 'Invalid email format';
  }

  return false;
};

export const phone = (value: string): string | false => {
  const phoneRegex = /^(\+)?\d{10,15}$/;

  if (value.length === 0) {
    return 'Field can not be empty';
  }

  if (!phoneRegex.test(value)) {
    return 'Invalid phone number format';
  }

  return false;
};

export const message = (value: string): string | false => {
  if (value.trim().length === 0) {
    return 'Message can not be empty';
  }

  return false;
};
