// function for logout
const logout = async function () {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Invalid. Try Again");
  }
};


document
  .querySelector("#logout-link").addEventListener("click", logout);