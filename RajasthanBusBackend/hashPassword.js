const bcrypt = require('bcrypt');

const plainPassword = 'test123';  // Change to your password

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) console.error('❌ Hashing error:', err);
  else console.log('✅ Hashed password:', hash);
});
