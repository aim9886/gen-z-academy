// Load users from localStorage
window.onload = () => {
  const tbody = document.querySelector("#usersTable tbody");
  const users = JSON.parse(localStorage.getItem("enrollments")) || [];
  users.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${user.course}</td>`;
    tbody.appendChild(tr);
  });
};
