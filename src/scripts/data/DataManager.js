export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(response => response.json())
};

let postCollection = [];

export const usePostCollection = () => {
    return [...postCollection];
}

export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(response => response.json())
        .then(parsedResponse => {
            postCollection = parsedResponse
            return parsedResponse;
        })
}

export const createPost = postObj => {
    return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
        .then(response => response.json())
}

export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
  
    })
        .then(response => response.json())
        .then(getPosts)
  }

let loggedInUser = {};

export const getLoggedInUser = () => {
    return {...loggedInUser };
}

export const logoutUser = () => {
    loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj;
  }
  