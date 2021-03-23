  export const Post = (postObject) => {
      return `
    <section class="post">
      <header>
          <h2 class="post__title">${postObject.title}</h2>
      </header>
      <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}"/>
      <div><button id="edit--${postObject.id}">Edit</div>
      <div><button id="delete__${postObject.id}">Delete</button></div>
    </section>
  `
  }