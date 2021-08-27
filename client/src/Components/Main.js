import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import "./reset.css";
import { dummyMainPosts } from "../dummyData/dummyData";

function Main({ contents, handleContentClick }) {
  // if (contents.length === 0) {
  //   return <div>게시글이 없습니다.</div>;
  // }

  return (
    <main>
      <h2 className="a11yHidden">메인 페이지</h2>
      <ul>
        {dummyMainPosts.data.map((el) => {
          return (
            <Link to="/content">
              <li key={el.id} onClick={() => handleContentClick(el.id)}>
                <article>
                  <h3 className="a11yHidden">{el.title}</h3>
                  <img src={el.image} alt="" />
                </article>
              </li>
            </Link>
          );
        })}
        {/* <li>
          <article>
            <h3 className="a11yHidden">content</h3>
            <img src="fff" alt="" />
            Content
          </article>
        </li>
        <li>
          <article>
            <h3 className="a11yHidden">content</h3>
            <img src="fff" alt="" />
            Content
          </article>
        </li>
        <li>
          <article>
            <h3 className="a11yHidden">content</h3>
            <img src="fff" alt="" />
            Content
          </article>
        </li> */}
      </ul>
    </main>
  );
}

export default Main;
