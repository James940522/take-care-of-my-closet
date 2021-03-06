const { user, refreshtoken } = require("../../models")
const { sign } = require("jsonwebtoken")

module.exports = async (req, res) => {

  if(!req.body.login_id || !req.body.password){
    res.status(401).json({message: "unauthorized"})
  }

  const findUserInfo = await user.findOne({
    where: { login_id: req.body.login_id, password: req.body.password },
  })
  if (!findUserInfo) {
    return res.json({ message: "not authorized" })
  } else {
    const userInfo = findUserInfo.dataValues
    delete userInfo.password

    const accessToken = sign(userInfo, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
    })
    const refreshToken = sign(userInfo, process.env.REFRESH_SECRET, {
      expiresIn: "14d",
    })

    await res.cookie("accessToken", accessToken, {
      sameSite: "None",
      httpOnly: true,
      secure: true,
    })

    await res.cookie("refreshToken", refreshToken, {
      sameSite: "None",
      httpOnly: true,
      secure: true,
    })

    await refreshtoken.create({
      value: refreshToken,
      userId: userInfo.id,
    })

    res.status(200).send({ message: "ok" })
  }
}
