const isAdmin = (email) => {
  const adminEmail = 'batrakova.yulia@gmail.com';
  return email === adminEmail;
};

module.exports = isAdmin;
