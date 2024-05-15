// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
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

// function to take a list of objects and a template and insert the objects as HTML into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// function to take an optional object and a template and insert the objects as HTML into the DOM
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  //if there is a callback...call it and pass data
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
    const headerTemplate = await loadTemplate("./public/partials/header.html");
    const headerElement = document.querySelector("#main-header");
    renderWithTemplate(headerTemplate, headerElement);

    const footerTemplate = await loadTemplate("./public/partials/footer.html");
    const footerElement = document.querySelector("#main-footer");
    renderWithTemplate(footerTemplate, footerElement);

    console.log("Header and Footer loaded successfully.");
  } catch (error) {
    console.error("Error loading Header or Footer:", error);
  }
}
