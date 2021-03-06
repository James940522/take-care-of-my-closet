const getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (Number(max) - Number(min) + 2));
};

// 메인페이지, 내가쓴글 페이지
const dummyMainPosts = {
  data: [
    {
      id: 1,
      title: "스트릿 코디입니다.",
      image: `https://randomuser.me/api/portraits/women/${getRandomNumber(
        1,
        98
      )}.jpg`,
      contents: "괜찮은가요?",
      createdAt: "2021-08-27T16:14:26.000Z",
      updatedAt: "2021-08-27T16:14:26.000Z",
      userId: 1,
      user: {
        nickname: "test1",
      },
    },
    {
      id: 2,
      title: "쇼핑했는데 어떰?",
      image: `https://randomuser.me/api/portraits/men/${getRandomNumber(
        1,
        98
      )}.jpg`,
      contents: "세일하길래 삼",
      createdAt: "2021-08-27T16:14:26.000Z",
      updatedAt: "2021-08-27T16:14:26.000Z",
      userId: 1,
      user: {
        nickname: "test1",
      },
    },
    {
      id: 3,
      title: "승마복 아님",
      image: `https://randomuser.me/api/portraits/women/${getRandomNumber(
        1,
        98
      )}.jpg`,
      contents: "ㅈㄱㄴ",
      createdAt: "2021-08-27T16:14:26.000Z",
      updatedAt: "2021-08-27T16:14:26.000Z",
      userId: 2,
      user: {
        nickname: "test2",
      },
    },
    {
      id: 4,
      title: "게이 아님",
      image: `https://randomuser.me/api/portraits/men/${getRandomNumber(
        1,
        98
      )}.jpg`,
      contents: "ㅈㄱㄴ",
      createdAt: "2021-08-27T16:14:26.000Z",
      updatedAt: "2021-08-27T16:14:26.000Z",
      userId: 3,
      user: {
        nickname: "test3",
      },
    },
  ],
};

// 게시글(컨텐츠창)
const dummyContents = [
  {
    id: 1,
    userId: 3,
    image: `https://randomuser.me/api/portraits/men/${getRandomNumber(
      1,
      98
    )}.jpg`,
    title: "옷 스타일이 아재같나요?",
    contents:
      "모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다. 모든 국민은 양심의 자유를 가진다. 모든 국민은 사생활의 비밀과 자유를 침해받지 아니한다. 연소자의 근로는 특별한 보호를 받는다. 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.",
    likecount: 3,
    unlikecount: 5,
  },
];

// 댓글
const dummyComment = [
  {
    id: 3,
    contents: "게이야..",
    createdAt: "2021-08-28T07:58:19.000Z",
    user: {
      nickname: "test1",
    },
  },
  {
    id: 5,
    contents: "이건 좀...",
    createdAt: "2021-08-28T07:58:19.000Z",
    user: {
      nickname: "test2",
    },
  },
  {
    id: 10,
    contents: "난 좋은데?",
    createdAt: "2021-08-28T07:58:19.000Z",
    user: {
      nickname: "test4",
    },
  },
];

export { dummyMainPosts, dummyContents, dummyComment };

// 게시글 클릭할때 서버에서 오는 응답 형식
const aaa = {
  contents: {
    id: 4,
    title: "게이 같음?",
    image: "image4",
    contents: "ㅈㄱㄴ",
    createdAt: "2021-08-28T07:58:19.000Z",
    updatedAt: "2021-08-28T07:58:19.000Z",
    userId: 3,
    comments: [
      {
        id: 3,
        contents: "게이야..",
        createdAt: "2021-08-28T07:58:19.000Z",
        user: {
          nickname: "test1",
        },
      },
      {
        id: 5,
        contents: "이건 좀...",
        createdAt: "2021-08-28T07:58:19.000Z",
        user: {
          nickname: "test2",
        },
      },
      {
        id: 10,
        contents: "난 좋은데?",
        createdAt: "2021-08-28T07:58:19.000Z",
        user: {
          nickname: "test4",
        },
      },
    ],
  },
  likeCount: 2,
  unlikeCount: 3,
  message: "ok",
};

// 좋아요, 싫어요 버튼 눌렀을 때 서버에서 오는 응답 형식
const res = { data: { like: 4, unlike: 4 }, message: "ok" };
