import { Post } from "./Post.js";

export const PostList = (allPosts, userId) => {
	let postHTML = "";
		
		for (const postObject of allPosts) {
	
			postHTML += Post(postObject, userId)
		}
		return postHTML;
	
}