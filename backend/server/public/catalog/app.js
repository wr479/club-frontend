const catalogBody = document.getElementById("catalogBody");
const applyFiltersBtn = document.getElementById("applyFilters");
const resetFiltersBtn = document.getElementById("resetFilters");
const feedbackForm = document.getElementById("feedbackForm");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildQuery() {
  const params = new URLSearchParams();
  const fields = ["minPrice", "maxPrice"];
  for (const field of fields) {
    const value = document.getElementById(field).value.trim();
    if (value) {
      params.set(field, value);
    }
  }

  const inStockChecked = document.getElementById("inStock").checked;
  const underOrderChecked = document.getElementById("underOrder").checked;

  // Если выбран только один статус, отправляем его как фильтр.
  if (inStockChecked && !underOrderChecked) {
    params.set("inStock", "true");
  }
  if (!inStockChecked && underOrderChecked) {
    params.set("inStock", "false");
  }

  params.set("limit", "100");
  params.set("offset", "0");
  return params.toString();
}

async function loadProducts() {
  const query = buildQuery();
  const response = await fetch(`/api/products?${query}`);
  const data = await response.json();
  catalogBody.innerHTML = "";

  for (const product of data.items || []) {
    const row = document.createElement("tr");
    const imageCell = product.image_url
      ? `<img src="${escapeHtml(product.image_url)}" alt="${escapeHtml(product.title)}" width="80" height="60" />`
      : "—";
    row.innerHTML = `
      <td>${imageCell}</td>
      <td>${product.title}</td>
      <td>${product.brand}</td>
      <td>${product.price}</td>
      <td>${product.capacity_ah}</td>
      <td>${product.voltage_v}</td>
      <td>${product.in_stock ? "Да" : "Нет"}</td>
    `;
    catalogBody.append(row);
  }
}

applyFiltersBtn.addEventListener("click", () => {
  loadProducts().catch((error) => alert(error.message));
});

resetFiltersBtn.addEventListener("click", () => {
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  document.getElementById("inStock").checked = false;
  document.getElementById("underOrder").checked = false;
  loadProducts().catch((error) => alert(error.message));
});

feedbackForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("feedbackName").value.trim(),
        phone: document.getElementById("feedbackPhone").value.trim(),
        message: document.getElementById("feedbackMessage").value.trim() || null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Не удалось отправить заявку");
    }

    feedbackForm.reset();
    alert("Заявка отправлена");
  } catch (error) {
    alert(error.message);
  }
});

loadProducts().catch((error) => alert(error.message));
