import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import logo from "../image/LOGO.png";
import { Logo } from "../Styled/NavStyled";
import { A11yHidden, Legend } from "../Styled/Common";
import {
  SignUpForm,
  SignUpFieldset,
  SignUpInput,
  PassWordCheck,
  FileAttachProfile,
  ProfileImageBox,
  UserSave,
  DuplicateBtn,
} from "../Styled/SignUpStyled";
// import {FileAttach} from "../Styled/ContentModiCreateStyled";

// axios.defaults.withCredentials = true;

function SignUp() {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [matchPwValue, setMatchPwValue] = useState("");
  const [validIdLength, setValidIdLength] = useState(true);
  const [validPwLength, setValidPwLength] = useState(false);
  const [duplicatedId, setDuplicatedId] = useState(false);
  const [duplicatedNick, setDuplicatedNick] = useState(false);
  const [pwMatch, setPwMatch] = useState(true);
  const [validIdMessage, setValidIdMessage] = useState("");
  const [duplicatedIdMessage, setDuplicatedIdMessage] = useState("");
  const [duplicatedNickMessage, setDuplicatedNickMessage] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const formData = new FormData();

  // console.log("image_url", imageUrl)

  useEffect(() => {
    isValidPassword();
    isMatch();
    isValidId();
  }, [
    idValue,
    pwValue,
    matchPwValue,
    pwMatch,
    validIdLength,
    validIdMessage,
    profileImage,
  ]);
  // console.log(profileImage);
  const history = useHistory();

  const inputIdHandler = (e) => {
    setIdValue(e.target.value);
  };

  const inputPwHandler = (e) => {
    setPwValue(e.target.value);
  };

  const inputMatchPwHandler = (e) => {
    setMatchPwValue(e.target.value);
  };

  const inputProfileHandler = (e) => {
    // console.log(e.target.files[0]);
    setProfileImage(e.target.files[0]);
    // console.log("????????? ??????", profileImage);
    let reader = new FileReader(); // -> ?????? ?????? ??????

    reader.onload = function () {
      setProfileUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);

    const img = e.target.files[0];
    formData.append("closet", img);
    // console.log(formData); // FormData {}
    // for (const keyValue of formData) console.log("????????????", keyValue); // ["img", File] File??? ??????
    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.message === "ok") {
          setImageUrl(res.data.image_url);
        } else {
          alert("????????? ???????????? ??????????????????.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputNickNameHandler = (e) => {
    setNickName(e.target.value);
  };

  const isDuplicatedId = (e) => {
    e.preventDefault();
    if (idValue.length < 4) {
      return alert("???????????? ??? ?????? ??????????????? ?????????.");
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/duplicate`,
        {
          login_id: idValue,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.message === "ok") {
          setDuplicatedId(true);
          // setDuplicatedIdMessage("????????? ??? ?????? ????????? ?????????.");
          return alert("????????? ??? ?????? ????????? ?????????.");
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 409) {
            return alert("????????? ??? ?????? ????????? ?????????.");
          }
        } else {
          console.log(err);
        }
      });
  };

  const isDuplicatedNick = (e) => {
    e.preventDefault();
    if (!nickName) return alert("???????????? ???????????????.");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/duplicate`,
        {
          nickname: nickName,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.message === "ok") {
          setDuplicatedNick(true);
          setDuplicatedNickMessage("?????? ????????? ????????? ?????????.");
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 409) {
            setDuplicatedNick(false);
            setDuplicatedNickMessage("????????? ??? ?????? ????????? ?????????.");
          }
        }
      });
  };

  const isValidId = () => {
    if (idValue.length >= 4) {
      setValidIdLength(true);
    } else {
      setValidIdLength(false);
      setValidIdMessage("* ???????????? ??? ?????? ??????????????? ?????????.");
    }
  };

  const isValidPassword = () => {
    if (pwValue.length >= 8 && pwValue.length <= 16) {
      setValidPwLength(true);
    } else if (pwValue.length < 8 || pwValue.length > 16) {
      setValidPwLength(false);
    }
  };

  const isMatch = () => {
    if (pwValue === matchPwValue) {
      setPwMatch(true);
    } else {
      setPwMatch(false);
    }
  };

  const requestSignUp = (e) => {
    e.preventDefault();

    if (!idValue || !pwValue || !nickName) {
      return alert("?????????, ????????????, ???????????? ???????????????");
    }
    if (duplicatedId === false) {
      return alert("???????????? ???????????? ????????????.");
    }
    if (validPwLength === false) {
      return alert("??????????????? ???????????? ????????????.");
    }
    if (pwMatch === false) {
      return alert("??????????????? ???????????? ????????????.");
    }
    if (duplicatedNick === false) {
      return alert("???????????? ???????????? ????????????.");
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          login_id: idValue,
          password: pwValue,
          nickname: nickName,
          user_image: imageUrl,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.message === "create!") {
          alert("????????? ?????????????????????.");
          history.push("/login");
        } else {
          alert("?????? ???????????? ???????????????.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      class="sign-up"
      style={{
        background:
          "linear-gradient(to right bottom, #f4f4f4, #ecd6a7, #70e1f5)",
      }}
    >
      <h1>
        <Link to="/">
          <Logo src={logo} />
        </Link>
      </h1>
      <SignUpForm>
        <h2>????????????</h2>
        <SignUpFieldset>
          <Legend>????????????</Legend>
          <div className="id-form">
            <SignUpInput
              type="text"
              onChange={(e) => inputIdHandler(e)}
              value={idValue}
              placeholder="?????????"
            />
            <DuplicateBtn onClick={(e) => isDuplicatedId(e)}>
              ????????????
            </DuplicateBtn>
          </div>
          {duplicatedIdMessage ? <p>{duplicatedIdMessage}</p> : null}
          {validIdLength ? null : (
            <p
              style={{ marginLeft: "-100px", marginTop: "-5px", color: "red" }}
            >
              {validIdMessage}
            </p>
          )}
          <SignUpInput
            style={{ marginLeft: "-70px" }}
            type="password"
            onChange={(e) => inputPwHandler(e)}
            value={pwValue}
            placeholder="????????????"
          />
          {validPwLength ? null : (
            <p style={{ marginLeft: "-50px", marginTop: "-5px", color: "red" }}>
              * ??????????????? 8??? ?????? 16??? ???????????? ?????????.
            </p>
          )}
          <PassWordCheck
            style={{ marginLeft: "-60px" }}
            type="password"
            onChange={(e) => inputMatchPwHandler(e)}
            placeholder="???????????? ??????"
          />
          {pwMatch ? null : (
            <p
              style={{ marginLeft: "-130px", marginTop: "-5px", color: "red" }}
            >
              *??????????????? ???????????? ????????????.
            </p>
          )}
          <div className="profile-form">
            <ProfileImageBox src={profileUrl} />
            {/* <img src={profileUrl} alt="img-thumbnail" /> */}
            <div className="profileUpload">
              <FileAttachProfile for="input-file">
                ????????? ?????????
              </FileAttachProfile>
              <FileAttachProfile for="input-file">
                ????????? ??????
              </FileAttachProfile>
            </div>
            {/* <button>????????? ??????</button> */}
            {/* <p>????????? ????????? ????????? ????????????</p> */}
            <input
              style={{ display: "none" }}
              id="input-file"
              type="file"
              name="user_image"
              accept=".jpg, .jpeg, .png, .gif, .bmp"
              onChange={(e) => inputProfileHandler(e)}
            />
          </div>
          {/* <label>????????? : </label> */}
          <div className="nickname-form">
            <SignUpInput
              style={{ marginLeft: "-60px" }}
              type="text"
              onChange={(e) => inputNickNameHandler(e)}
              placeholder="?????????"
            />
            <DuplicateBtn onClick={(e) => isDuplicatedNick(e)}>
              ????????????
            </DuplicateBtn>
          </div>
          {duplicatedNickMessage ? (
            <span style={{ marginLeft: "-160px", color: "red" }}>
              {duplicatedNickMessage}
            </span>
          ) : null}
          <UserSave onClick={(e) => requestSignUp(e)}>????????????</UserSave>
        </SignUpFieldset>
      </SignUpForm>
    </div>
  );
}

export default SignUp;
