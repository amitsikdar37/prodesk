export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^\+?[\d\s-]{10,}$/;
  return regex.test(phone);
};

export const validateRequired = (value) => {
  return value.trim().length > 0;
};
