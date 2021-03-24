  export const Post = (postObject, userId) => {
    if (postObject.user.name === userId) {
      return `
    <section class="post">
      <header>
          <h2 class="post__title">${postObject.title}</h2>
      </header>
      <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}"/>
      <p class="post__auth"> By: ${postObject.user.name}</p>
      <button id="edit__${postObject.id}">Edit</button>
      <button id="delete__${postObject.id}">Delete</button>
    </section>
  `
  }  else { return`
  <section class="post">
    <header>
        <h2 class="post__title">${postObject.title}</h2>
    </header>
    <img class="post__image" src="${postObject.imageURL}" />
    <p class="post__auth"> By: ${postObject.user.name}</p>
    </div>
  </section>
`
  }
}