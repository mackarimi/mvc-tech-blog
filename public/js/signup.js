// function for signup
const signupHandler = async function (event) {
  event.preventDefault();
  const usernameEl = document.querySelector("#username-input-signup");
  const passwordEl = document.querySelector("#password-input-signup");
  if (usernameEl && passwordEl) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log(response)
      alert("Invalid. Failed Attempt");
    }
  }
};


document
  .querySelector("#signup-form")
  .addEventListener("submit", signupHandler);