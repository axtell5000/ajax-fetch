const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentSectionElement = document.getElementById("comments");

function createCommentsList(comments) {
  const commentListElement = document.createElement("ul");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
    `;
    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`); // fetch returns a promise so we can use async/await
  const responseData = await response.json();

  const commentsListElement = createCommentsList(responseData);
  commentSectionElement.innerHTML = "";
  commentSectionElement.appendChild(commentsListElement);
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
