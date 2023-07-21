async function loginFormHandler(event) {
  console.log("fired up");
  event.preventDefault();

  const email = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log({ response });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);

console.log("connected");
