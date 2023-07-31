import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../service/firebase';

const getMainPosts = async (page) => {
  try {
    // 넘겨받은 인자로 다음을 처리
    const itemsPerPage = 5;
    const startAt = (page - 1) * itemsPerPage;
    const endAt = page * itemsPerPage;

    // 1. postsData
    const postsData = [];
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(endAt)); // limit(5)등이 아니라

    const querySnapshot = await getDocs(q);

    // 프로필 data
    const profileQ = query(collection(db, 'userInfo'));
    const profileQuerySnapshot = await getDocs(profileQ);

    const profileMap = {};

    profileQuerySnapshot.forEach((doc) => {
      const profile = doc.data();
      profileMap[profile.uid] = {
        nickname: profile.nickname,
        photoURL: profile.photoURL
      };
    });

    querySnapshot.forEach((doc) => {
      //
      const post = {
        id: doc.id,
        ...doc.data(),
        writerNickname: profileMap[doc.data().uid]?.nickname || '',
        writerPhotoURL: profileMap[doc.data().uid]?.photoURL || ''
      };

      postsData.push(post);
    });

    // 현재 페이지에 맞게 데이터를 slice하여 가져옴
    const currentPageData = postsData.slice(startAt, endAt);

    return { postsData: currentPageData };
  } catch (err) {
    console.log(err);
    return { postsData: [] };
  }
};

//////////////////////////////////////
// const getMainLikes = async () => {
//   try {
//     const likeQ = query(collection(db, 'likes'));
//     const likeQuerySnapshot = await getDocs(likeQ);

//     const likeMap = {};
//     const likesData = [];

//     likeQuerySnapshot.forEach((doc) => {
//       const like = doc.data();
//       const likeTargetPostId = doc.data().targetPostId;
//       likeMap[likeTargetPostId] = {
//         targetPostId: like.targetPostId,
//         userId: like.userId
//       };

//       likesData.push({ ...likeMap[likeTargetPostId] });
//       return likesData;
//     });
//   } catch (err) {
//     console.log(err);
//     return { likesData: [] };
//   }
// };

export { getMainPosts };
