import React from "react";
import { Link } from "react-router-dom";
// import "./Main.css";
// import "./reset.css";
import { A11yHidden } from "../Styled/Common";
import { MainUl, MainArticle, MainImg, MainP, Nick } from "../Styled/MainStyled";

function Main({ contents, handleContentClick }) {
  if (contents.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }
  console.log("메인페이지 컨텐츠", contents);
  return (
    <main>
      <A11yHidden>메인 페이지</A11yHidden>
      <MainUl>
        {contents.map((el) => {
          return (
            <Link to="/content" style={{ textDecoration: "none" }}>
              <li key={el.id} onClick={() => handleContentClick(el.id)}>
                <MainArticle>
                  <MainP>{el.title}</MainP>
                  <MainImg src={el.image} alt="img-thumbnail" />
                  <img style={{width: "100px"}} src={el.user_image} alt="dd"/>
                  <Nick>&#64;{el.user.nickname}</Nick>
                </MainArticle>
              </li>
            </Link>
          );
        })}
      </MainUl>
    </main>
  );
}

export default Main;
