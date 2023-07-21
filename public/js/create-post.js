// Initiated by: create-post.handlebars
async function createPostHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector("#post-title").value.trim();
  const post_id = document.querySelector("#post-content").value.trim();

  
    const response = await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify({
        comment_text,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }


document
  .querySelector(".create-post-form")
  .addEventListener("submit", createPostHandler);
