export default class ProductList {
  constructor(category, dataSource, element) {
      this.category = category;
      this.dataSource = dataSource;
      this.element = element;
  }

  async init() {
      const list = await this.dataSource.getData(this.category.toLowerCase());
      this.renderList(list);
  }

  renderList(list) {
      this.element.innerHTML = list.map(this.renderProduct).join('');
  }

  renderProduct(product) {
      return `
          <li class="product-card">
              <a href="#">
                  <img src="${product.Image}" alt="${product.Name}">
                  <h3>${product.Name}</h3>
                  <p>${product.DescriptionHtmlSimple}</p>
                  <p>${product.FinalPrice}</p>
              </a>
          </li>
      `;
  }
}
