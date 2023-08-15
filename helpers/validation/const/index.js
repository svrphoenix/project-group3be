const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;
const phoneRegex = /^38 \(\d{3}\) \d{3} \d{2} \d{2}$/;
const skypeRegex =
  /^(\+\d{1,3}\s?)?(?:\(\d{1,4}\)|\d{1,4})\s?\d{1,4}-?\d{1,4}$/;
const birthdayRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/;

module.exports = {
  emailRegex,
  passwordRegex,
  phoneRegex,
  skypeRegex,
  birthdayRegex,
};
