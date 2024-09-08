// const ensureAuthenticated = (req, res, next) => {
//   console.log("req.isAuthenticated(): ", req.isAuthenticated());
//   console.log("req.user: ", req.user);
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.status(401).json({ message: "Access denied. Please log in." });
//   }
// };

// module.exports = ensureAuthenticated;

const ensureAuthenticated = (req, res, next) => {
  console.log("req.isAuthenticated(): ", req.isAuthenticated());
  console.log("req.user: ", req.user);
  
  if (req.isAuthenticated()) {
    const adminEmail = 'batrakova.yulia@gmail.com'; 

    if (req.user.email === adminEmail) {
      req.user.is_admin = true; 
    } else {
      req.user.is_admin = false; 
    }
    
    return next(); 
  } else {
    res.status(401).json({ message: "Access denied. Please log in." });
  }
};

module.exports = ensureAuthenticated;
