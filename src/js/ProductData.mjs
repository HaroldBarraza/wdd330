function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
    }
  }
  
  export default class ProductData {
    constructor() {
        this.paths = {
            tents: "./public/json/tents.json",
            backpacks: "./public/json/backpacks.json",
            sleepingBags: "./public/json/sleeping-bags.json"
        };
    }
  
    async getData(category) {
      const path = this.paths[category];
      try {
          const response = await fetch(path);
          const data = await convertToJson(response);
          console.log(`Data for ${category}:`, data);
          return data;
      } catch (error) {
          console.error(`Error fetching data from ${path}:`, error);
          throw error;
      }
  }
  
    async searchData(searchTerm) {
        const categories = Object.keys(this.paths);
        let results = [];
  
        for (const category of categories) {
            const data = await this.getData(category);
            if (Array.isArray(data)) {
                results = results.concat(
                    data.filter((product) =>
                        product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.Brand.Name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
            } else if (data.Result) {
                results = results.concat(
                    data.Result.filter((product) =>
                        product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.Brand.Name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
            }
        }
  
        console.log("Aggregated Search Results:", results);
        return results;
    }
  }