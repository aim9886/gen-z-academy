// Show modals
document.getElementById("signupBtn").onclick = () => new bootstrap.Modal(document.getElementById("signupModal")).show();
document.getElementById("loginBtn").onclick = () => new bootstrap.Modal(document.getElementById("loginModal")).show();

// Sign up logic
document.getElementById("signupForm").onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  localStorage.setItem("user", JSON.stringify({ email, password }));
  alert("Account created successfully!");
  bootstrap.Modal.getInstance(document.getElementById("signupModal")).hide();
};

// Login logic
document.getElementById("loginForm").onsubmit = (e) => {
  e.preventDefault();
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === loginEmail && user.password === loginPassword) {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    showProtectedContent();
    bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
  } else {
    alert("Invalid credentials.");
  }
};

// Logout
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("loggedIn");
  showProtectedContent();
};

// Enrollment
document.getElementById("enrollForm").onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  alert(`Thank you ${name}, you've enrolled in ${course}!`);
};

// Show/hide content based on login state
function showProtectedContent() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  document.getElementById("enrollSection").classList.toggle("d-none", !isLoggedIn);
  document.getElementById("logoutBtn").classList.toggle("d-none", !isLoggedIn);
  document.getElementById("loginBtn").classList.toggle("d-none", isLoggedIn);
  document.getElementById("signupBtn").classList.toggle("d-none", isLoggedIn);
}
showProtectedContent();

// Updated enroll logic with DB mock
document.getElementById("enrollForm").onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;
  const data = { name, email, course };
  const stored = JSON.parse(localStorage.getItem("enrollments")) || [];
  stored.push(data);
  localStorage.setItem("enrollments", JSON.stringify(stored));
  alert(`Thank you ${name}, you've enrolled in ${course}!`);
};

// Animate cards on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate__fadeInUp");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".card").forEach(card => {
  card.classList.add("animate__animated");
  observer.observe(card);
});
