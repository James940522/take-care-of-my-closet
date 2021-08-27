const { user } = require("../../models")

module.exports = async (req, res) => {
  console.log(req.body)

  // {
  //   login_id: "",
  //   password: "",
  // }

  const userInfo = await user.findOne({
    where: { login_id: req.body.login_id, password: req.body.password },
  })

  if (!userInfo) {
    res.status(401).json({ message: "Invalid user or Wrong password" })
  } else {
    const { login_id, nickname, user_image } = userInfo

    res.status(200).json({ login_id, nickname, user_image })
  }

  // const { login_id, password } = req.body
  // user.findOne({
  //   where: {
  //     login_id,
  //     password,
  //   },
  // })
  // console.log("aaa")
  res.sendStatus(200)
}
