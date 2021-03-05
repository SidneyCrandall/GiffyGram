export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p class="post__description">${postObject.description}</p>
        <p class="post__timestamp">${postObject.timestamp}</p>
        <p class="post__userID">${postObject.userID}</p?
      </section>
    `
  }