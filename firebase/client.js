import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCFbgq0jCRKk2kNFPXp--bspsWhlzhD9Gk",
  authDomain: "trying-new-things-991e3.firebaseapp.com",
  databaseURL: "https://trying-new-things-991e3.firebaseio.com",
  projectId: "trying-new-things-991e3",
  storageBucket: "trying-new-things-991e3.appspot.com",
  messagingSenderId: "131047062348",
  appId: "1:131047062348:web:d4f26d7a93edf357bfede9",
  measurementId: "G-EE4D9BVSF3",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null

    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likeCount: 0,
    sharedCount: 0,
    userId,
    userName,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        console.log(doc.data())
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
    })
}
