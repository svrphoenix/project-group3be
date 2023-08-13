const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;
const numberRegex = /^38 \(\d{3}\) \d{3} \d{2} \d{2}$/;
const skypeRegex =
  /^(\+\d{1,3}\s?)?(?:\(\d{1,4}\)|\d{1,4})\s?\d{1,4}-?\d{1,4}$/;

module.exports = { emailRegex, passwordRegex, numberRegex, skypeRegex };
