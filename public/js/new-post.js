// new posting function
const newFormHandler = async function (event) {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('input[name="post-body"]').value;
  console.log("body=", body);
  var response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Invalid. Failed Attempt");
  }
};


document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);