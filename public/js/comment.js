// event listener for comment posting
const commentFormHandler = async function (event) {
  event.preventDefault();
  const post_id = document.querySelector('input[name="post-id"]').value;
  const comment_text = document.querySelector(
    'input[name="comment-body"]'
  ).value;

  console.log(post_id)
  console.log(comment_text)

  if (comment_text) {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.location.reload();
  }
};


// event listner for delete posting
const deleteClickHandler = async () => {
  const post_id = document.querySelector('input[name="post-id"]').value;
  await fetch(`/api/comment`, {
    method: "DELETE",
  });
  document.location.reload();
};


document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);