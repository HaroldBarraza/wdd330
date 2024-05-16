// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
export function getLocalStorage(key) {
  const storedData = JSON.parse(localStorage.getItem(key));
  return Array.isArray(storedData) ? storedData : [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  console.log(`Loading template from: ${path}`);
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load template from ${path}: ${res.statusText}`);
  }
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("../public/partials/header.html");
    const headerElement = document.querySelector("#main-header");
    headerElement.innerHTML = headerTemplate;

    const footerTemplate = await loadTemplate("../public/partials/footer.html");
    const footerElement = document.querySelector("#main-footer");
    footerElement.innerHTML = footerTemplate;

    console.log("Header and Footer loaded successfully.");
  } catch (error) {
    console.error("Error loading Header or Footer:", error);
  }
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function playCartAnimation() {
  const cartIcon = document.querySelector('.cart svg');
  if (cartIcon) {
    cartIcon.classList.add('cart-animation');
    setTimeout(() => {
      cartIcon.classList.remove('cart-animation');
    }, 500);
  } else {
    console.error('Cart icon not found!');
  }
}

