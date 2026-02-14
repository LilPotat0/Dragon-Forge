document.addEventListener("DOMContentLoaded", function () {

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      window.location.href = "/login.html";
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", function () {
      window.location.href = "/signup.html";
    });
  }

  loadProducts();
});

async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p style='padding:40px;'>No products available.</p>";
    return;
  }

  products.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" />
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <p>In Stock: ${product.stock}</p>
        <button class="buy ${product.stock === 0 ? 'out' : ''}" 
          ${product.stock === 0 ? 'disabled' : ''}>
          ${product.stock === 0 ? 'Out of Stock' : 'Buy'}
        </button>
      </div>
    `;
  });
}
