import { Post } from "./Post.js";

export const PostList = (allPosts) => {
	let postHTML = "";
		
		for (const postObject of allPosts) {
	
			postHTML += Post(postObject)
		}
		return postHTML;
	
}