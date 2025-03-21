// C:\Users\Navya\rajasthan-bus-backend\hashPassword.js
const bcrypt = require('bcrypt');

bcrypt.hash('testpass', 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});