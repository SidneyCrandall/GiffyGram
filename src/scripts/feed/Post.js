import { getLoggedInUser, getLikes } from "../data/DataManager.js"

const getNumberOfLikes = (postId) => {
  getLikes(postId)
  .then(response => {
    
    document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
  })
}

export const Post = (postObject) => {

  let buttons = ""
  if (getLoggedInUser().id === postObject.userId){
    buttons = `<button id="delete__${postObject.id}">Delete</button>
    <button id="edit__${postObject.id}">Edit</button>`
  }


    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}"/>
         ${buttons}
         <button id="like__${postObject.id}">Like</button>
         <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
      </section>
    `
}