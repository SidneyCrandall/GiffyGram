import { getPosts, usePostCollection, createPost, deletePost, getLoggedInUser, updatePost, getSinglePost, getUsers, loginUser, registerUser, setLoggedInUser, logoutUser, postLike } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./feed/PostEdit.js";
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";

const applicationElement = document.querySelector("main");

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        console.log(`Blast from the past ${yearAsNumber}.`)
        showFilteredPosts(yearAsNumber);
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon") {
        console.log(`It's mail time!`)
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "homeIcon") {
        console.log(`There's no place like home.`)
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
        //collect the input values into an object to post to the DB
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        //we have not created a user yet - for now, we will hard code `1`.
        //we can add the current time as well
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: getLoggedInUser().id,
            timestamp: Date.now()
        }
        // be sure to import from the DataManager
        createPost(postObject)
        //*.then(response => {
        showPostList();
        showPostEntry();
    } else if (event.target.id === "newPost__cancel") {
        showPostEntry();
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("delete")) {
        const postId = event.target.id.split("__")[1];
        deletePost(postId)
            .then(response => {
                showPostList();
            })
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("edit")) {
        const postId = event.target.id.split("__")[1];
        getSinglePost(postId)
            .then(response => {
                showEdit(response);
            })
    }
})

applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("updatePost")) {
        const postId = event.target.id.split("__")[1];
        //collect all the details into an object
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        const timestamp = document.querySelector("input[name='postTime']").value

        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: getLoggedInUser().id,
            timestamp: parseInt(timestamp),
            id: parseInt(postId)
        }
        showPostEntry();

        updatePost(postObject)
            .then(response => {
                showPostList();
            })
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        logoutUser();
        console.log(getLoggedInUser());
        sessionStorage.clear();
        checkForUser();
    }
})

let userObject = {}
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "login__submit") {
        //collect all the details into an object
        userObject = {
            name: document.querySelector("input[name='name']").value,
            email: document.querySelector("input[name='email']").value
        }
        loginUser(userObject)
            .then(dbUserObj => {
                if (dbUserObj) {
                    sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                    startGiffyGram();
                } else {
                    //got a false value - no user
                    const entryElement = document.querySelector(".entryForm");
                    entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
                }
            })
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "register__submit") {
        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='registerName']").value,
            email: document.querySelector("input[name='registerEmail']").value
        }
        registerUser(userObject)
            .then(dbUserObj => {
                sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                startGiffyGram();
            })
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("like")) {
        const likeObject = {
            postId: event.target.id.split("__")[1],
            userId: getLoggedInUser().id
        }
        postLike(likeObject)
            .then(response => {
                showPostList();
            })
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "userposts") {
      const postElement = document.querySelector(".postList");
        userPosts(getLoggedInUser().id).then((allPosts) => {
            postElement.innerHTML = PostList(allPosts, userObject.name);
        })
    }
})

const showFilteredPosts = (year) => {
    //get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    //filter the data
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}

const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts.reverse(), userObject.name);
    })
}

const showNavBar = () => {
    const navElement = document.querySelector("nav")
    navElement.innerHTML = NavBar();
}

const showFooter = () => {
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
}

const showPostEntry = () => {
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
}

const checkForUser = () => {
    if (sessionStorage.getItem("user")) {
        //this is expecting an object. Need to fix
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
        startGiffyGram();
    } else {
        //show login/register
        showLoginRegister();
    }
}

const showLoginRegister = () => {
    showNavBar();
    const entryElement = document.querySelector(".entryForm");
    //template strings can be used here too
    entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
    //make sure the post list is cleared out too
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = "";
}

const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEdit(postObj);
}

const startGiffyGram = () => {
    showPostList();
    showNavBar();
    showFooter();
    showFilteredPosts();
    showPostEntry();
}

checkForUser()