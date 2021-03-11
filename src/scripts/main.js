import { getPosts, usePostCollection, createPost, getLoggedInUser } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";


const applicationElement = document.querySelector("main");

applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        console.log("Peace out cub scout.")
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("edit")) {
        console.log("post clicked", event.target.id.split("--"))
        console.log("the id is", event.target.id.split("--")[1])
    }
})

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
            .then(response => {
                showPostList();
            })
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
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
        postElement.innerHTML = PostList(allPosts.reverse());
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

const startGiffyGram = () => {
    showPostList();
    showNavBar();
    showFooter();
    showFilteredPosts();
    showPostEntry();
}

startGiffyGram()