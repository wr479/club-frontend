const form = document.getElementById("productForm");
const resetBtn = document.getElementById("resetBtn");
const productsBody = document.getElementById("productsBody");
const feedbackBody = document.getElementById("feedbackBody");
const formTitle = document.getElementById("formTitle");
const imageFileInput = document.getElementById("imageFile");
const imageUrlInput = document.getElementById("image_url");
const imagePreview = document.getElementById("imagePreview");

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Ошибка запроса");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function formToPayload() {
  return {
    title: document.getElementById("title").value.trim(),
    brand: document.getElementById("brand").value.trim(),
    price: Number(document.getElementById("price").value),
    capacity_ah: Number(document.getElementById("capacity_ah").value),
    voltage_v: Number(document.getElementById("voltage_v").value),
    polarity: document.getElementById("polarity").value.trim() || null,
    terminal_type: document.getElementById("terminal_type").value.trim() || null,
    width_mm: document.getElementById("width_mm").value
      ? Number(document.getElementById("width_mm").value)
      : null,
    height_mm: document.getElementById("height_mm").value
      ? Number(document.getElementById("height_mm").value)
      : null,
    length_mm: document.getElementById("length_mm").value
      ? Number(document.getElementById("length_mm").value)
      : null,
    in_stock: document.getElementById("in_stock").checked,
    image_url: imageUrlInput.value.trim() || null,
  };
}

function setForm(product = null) {
  form.reset();
  imageFileInput.value = "";
  imagePreview.style.display = "none";
  imagePreview.src = "";
  document.getElementById("productId").value = product ? product.id : "";
  formTitle.textContent = product ? `Редактировать #${product.id}` : "Создать товар";

  if (!product) {
    document.getElementById("in_stock").checked = true;
    imageUrlInput.value = "";
    return;
  }

  for (const key of [
    "title",
    "brand",
    "price",
    "capacity_ah",
    "voltage_v",
    "polarity",
    "terminal_type",
    "width_mm",
    "height_mm",
    "length_mm",
  ]) {
    document.getElementById(key).value = product[key] ?? "";
  }
  imageUrlInput.value = product.image_url || "";
  if (product.image_url) {
    imagePreview.src = product.image_url;
    imagePreview.style.display = "block";
  }
  document.getElementById("in_stock").checked = Boolean(product.in_stock);
}

async function renderProducts() {
  const products = await api("/api/admin/products");
  productsBody.innerHTML = "";

  for (const product of products) {
    const row = document.createElement("tr");
    const imageCell = product.image_url
      ? `<img src="${product.image_url}" alt="${product.title}" width="80" height="60" />`
      : "—";
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${imageCell}</td>
      <td>${product.title}</td>
      <td>${product.brand}</td>
      <td>${product.price}</td>
      <td>${product.in_stock ? "Да" : "Нет"}</td>
      <td>
        <button data-action="edit" data-id="${product.id}">Редактировать</button>
        <button data-action="delete" data-id="${product.id}">Удалить</button>
      </td>
    `;
    row.querySelector('[data-action="edit"]').addEventListener("click", () => {
      setForm(product);
    });
    row.querySelector('[data-action="delete"]').addEventListener("click", async () => {
      const isConfirmed = window.confirm("Удалить товар?");
      if (!isConfirmed) {
        return;
      }
      await api(`/api/admin/products/${product.id}`, { method: "DELETE" });
      await renderProducts();
    });
    productsBody.append(row);
  }
}

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return date.toLocaleString("ru-RU");
}

async function renderFeedbackRequests() {
  const requests = await api("/api/admin/feedback");
  feedbackBody.innerHTML = "";

  for (const request of requests) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${request.id}</td>
      <td>${formatDate(request.created_at)}</td>
      <td>${request.name}</td>
      <td>${request.phone}</td>
      <td>${request.message || "—"}</td>
    `;
    feedbackBody.append(row);
  }
}

async function uploadImageIfNeeded() {
  const file = imageFileInput.files[0];
  if (!file) {
    return imageUrlInput.value.trim() || null;
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/admin/products/upload-image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Не удалось загрузить изображение");
  }

  const data = await response.json();
  imageUrlInput.value = data.image_url;
  imagePreview.src = data.image_url;
  imagePreview.style.display = "block";
  imageFileInput.value = "";
  return data.image_url;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const id = document.getElementById("productId").value;
    await uploadImageIfNeeded();
    const payload = formToPayload();
    if (id) {
      await api(`/api/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await api("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    setForm(null);
    await renderProducts();
  } catch (error) {
    alert(error.message);
  }
});

resetBtn.addEventListener("click", () => setForm(null));

renderProducts().catch((error) => {
  alert(error.message);
});

renderFeedbackRequests().catch((error) => {
  alert(error.message);
});
