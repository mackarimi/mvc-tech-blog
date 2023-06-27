async function logout() {
  // Make a POST request to destroy the session on the back end
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  // If successfully logged out, redirect to the login page
  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);
