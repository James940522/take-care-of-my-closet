const { refreshtoken } = require("../../models")

module.exports = async (req, res) => {
  // console.log("리프레시토큰", req.headers.refreshtoken);
  const refreshToken = req.headers.cookie.split(' ')[0].split('=')[1];
       
 try{
  await refreshtoken.destroy({
    where: { value: refreshToken },
  })
  res.status(205).send("Logged out successfully")
 }catch{
  res.status(205).send("Logged out successfully")
 }
  
}
