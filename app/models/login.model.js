const Login = function(login) {
    this.username = login.username;
    this.password = login.password;
  };
  

  const sql = require("./db.js");

  Login.AuthUser = (username,password, result) => {
    sql.query('SELECT * FROM customers WHERE email = ?',[username], function (error, res, fields) {
      if (error) {
        console.log("error ocurred ", error);
        result(null, error);
      }else{
        // console.log('The solution is: ', results);
        if(res.length >0){
          if(res[0].password == password){
            res.success=true;  
            result(null,res);
                return;
          }
          else{
            res.success ="Email and password does not match"
            result(null,res);
                return;
          }
        }
        else{
            res.success ="Email does not exits"
            result(null,res);
                return;
        }
      }
      });
  };

  module.exports = Login;