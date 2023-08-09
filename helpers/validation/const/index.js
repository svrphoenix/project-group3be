const emailRegex=/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;

module.exports = {emailRegex ,passwordRegex };
