// event listner for post request with id
const newFormHandler = async function (event) {
  event.preventDefault();
  const post_id = document.querySelector('input[name="post-id"]').value;
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  console.log(body);
  await fetch(`/api/posts/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  document.location.replace("/dashboard");
};


// event listner for delete
const deleteClickHandler = async () => {
  const post_id = document.querySelector('input[name="post-id"]').value;
  await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });
  document.location.replace("/dashboard");
};


document
  .querySelector("#edit-post-form")
  .addEventListener("submit", newFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);