import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../image/logo.jpeg";

function SignUp() {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState([]);
  const [matchPwValue, setMatchPwValue] = useState("");
  const [validIdLength, setValidIdLength] = useState(true);
  const [validPwLength, setValidPwLength] = useState(false);
  const [duplicatedId, setDuplicatedId] = useState(false);
  const [duplicatedNick, setDuplicatedNick] = useState(false);
  const [pwMatch, setPwMatch] = useState(true);
  const [validIdMessage, setValidIdMessage] = useState("");
  const [duplicatedIdMessage, setDuplicatedIdMessage] = useState("");
  const [duplicatedNickMessage, setDuplicatedNickMessage] = useState("");

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
    // console.log(e);
    // const formData = new FormData();
    // formData.append("user_image", e.target.name);
    // formData.append("file", e.target.files[0]);
    setProfileImage(e.target.files);
    // console.log(formData);
    // console.log(profileImage);
  };

  const inputNickNameHandler = (e) => {
    setNickName(e.target.value);
  };

  const isDuplicatedId = (e) => {
    e.preventDefault();
    if (idValue.length < 4) {
      return alert("아이디는 네 글자 이상이어야 합니다.");
    }
    axios
      .post(
        "https://takecareofmycloset/duplicate",
        {
          login_id: idValue,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === `It's already created`) {
          setDuplicatedId(false);
          setDuplicatedIdMessage("사용할 수 없는 아이디 입니다.");
        } else if (res.data.message === "ok") {
          setDuplicatedId(true);
          setDuplicatedIdMessage("사용할 수 있는 아이디 입니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isDuplicatedNick = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://takecareofmycloset/duplicate",
        {
          nickname: nickName,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === `It's already created`) {
          setDuplicatedNick(false);
          setDuplicatedNickMessage("사용할 수 없는 닉네임 입니다.");
        } else if (res.data.message === "ok") {
          setDuplicatedNick(true);
          setDuplicatedNickMessage("사용 가능한 닉네임 입니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isValidId = () => {
    if (idValue.length >= 4) {
      setValidIdLength(true);
    } else {
      setValidIdLength(false);
      setValidIdMessage("아이디는 네 글자 이상이어야 합니다.");
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
      return alert("아이디, 비밀번호, 닉네임을 입력하세요");
    }
    if (duplicatedId === false) {
      return alert("아이디가 유효하지 않습니다.");
    }
    if (validPwLength === false) {
      return alert("비밀번호가 유효하지 않습니다.");
    }
    if (pwMatch === false) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    if (duplicatedNick === false) {
      return alert("닉네임이 유효하지 않습니다.");
    }

    axios
      .post(
        "https://takecareofmycloset/signup",
        {
          login_id: idValue,
          password: pwValue,
          nickname: nickName,
          user_image: profileImage,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.message);
        if (res.message === "ok") {
          alert("가입이 완료되었습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>
        <img src={logo} alt="logo" width="500px" />
      </h1>
      <h2>회원가입</h2>
      <form>
        <fieldset>
          아이디 :{" "}
          <input
            type="text"
            onChange={(e) => inputIdHandler(e)}
            value={idValue}
            placeholder="아이디를 입력하세요"
          />
          <button onClick={(e) => isDuplicatedId(e)}>중복확인</button>
          {duplicatedIdMessage ? duplicatedIdMessage : null}
          <br />
          {validIdLength ? null : validIdMessage}
          비밀번호 :{" "}
          <input
            type="password"
            onChange={(e) => inputPwHandler(e)}
            value={pwValue}
            placeholder="비밀번호를 입력하세요"
          />
          <br />
          {validPwLength ? null : "비밀번호는 8자 이상 16자 이하여야 합니다."}
          비밀번호 확인 :{" "}
          <input
            type="password"
            onChange={(e) => inputMatchPwHandler(e)}
            placeholder="비밀번호 확인"
          />
          <br />
          {pwMatch ? null : "비밀번호가 일치하지 않습니다."}
          프로필 사진 첨부 :{" "}
          <input
            type="file"
            name="user_image"
            accept=".jpg, .jpeg, .png, .gif, .bmp"
            onChange={(e) => inputProfileHandler(e)}
          />
          <br />
          닉네임 :{" "}
          <input
            type="text"
            onChange={(e) => inputNickNameHandler(e)}
            placeholder="닉네임을 입력하세요"
          />
          <button onClick={(e) => isDuplicatedNick(e)}>중복확인</button>
          {duplicatedNickMessage ? duplicatedNickMessage : null}
          <br />
          <button onClick={(e) => requestSignUp(e)}>가입하기</button>
        </fieldset>
      </form>
    </div>
  );
}

export default SignUp;
