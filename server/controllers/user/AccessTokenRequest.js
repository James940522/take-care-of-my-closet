const { user } = require("../../models")
const { verify } = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

module.exports = (req, res) => {
  const accessToken = req.headers["accesstoken"]
  try {
    verify(accessToken, process.env.ACCESS_SECRET)
  } catch {
    console.log("asdasdasdasdasd")
    res.status(401).json({ data: null, message: "unauthorized" })
  }

  const userInfo = verify(accessToken, process.env.ACCESS_SECRET)
  return res.status(200).json({ data: { userInfo: userInfo }, message: "ok" })
}
