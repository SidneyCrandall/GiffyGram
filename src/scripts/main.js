import { getUsers, getPosts} from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import {NavBar} from "./nav/NavBar.js"


const showPostList = () => {
  const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showNavBar = () => {
	const navElement = document.querySelector("nav")
    navElement.innerHTML = NavBar();
}

const startGiffyGram = () => {
	showPostList();
	showNavBar();
}


startGiffyGram();


