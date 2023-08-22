const emailRegex = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;
const phoneRegex = /^(\+\d{1,3}|\d{1,3}) \(\d{3}\) \d{3} \d{2} \d{2}$/;
const skypeRegex = /^(\+\d{1,3}|\d{1,3}) \(\d{3}\) \d{3} \d{2} \d{2}$/;
const timeRegexp = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const dateRegexp =
  /^(202[3-9]|20[3-9]\d|2[1-9]\d{2}|[3-9]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const birthdayRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/;

module.exports = {
  emailRegex,
  passwordRegex,
  skypeRegex,
  timeRegexp,
  dateRegexp,
  phoneRegex,
  birthdayRegex,
};
