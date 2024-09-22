import { createServer, Model } from "miragejs";


export default function Server() {
  createServer({
    models: {
      product: Model,
      image: Model,
    },

    
    routes() {
      this.namespace = 'api';
      this.urlPrefix = 'http://localhost:3000';
      this.get("/products", (schema) => {
        return schema.products.all()
      })

      this.post("/products", (schema, request) => {
        const newProducts = JSON.parse(request.requestBody); 
        const existingProducts = schema.products.all(); 
        const existingIds = new Set(existingProducts.models.map(product => product.id));
        const uniqueProducts = newProducts?.filter(product => !existingIds.has(product.id));
        uniqueProducts.forEach(product => {
            schema.products.create(product);
        });
        return uniqueProducts.length > 0
            ? { message: 'Products added successfully', products: uniqueProducts }
            : { message: 'No unique products to add' };
      })

      this.post('/upload', (schema, request) => {
        const formData = request.requestBody;
        const urlParams = new URLSearchParams(formData);
        const imageUrl = urlParams.get('imageUrl');
        const id = urlParams.get('id');

        console.log('Received imageUrl:', imageUrl);
        console.log('Received id:', id);
        return schema.images.create({id, imageUrl});
      });

      this.get('/image', (schema) => {
        return schema.images.all();
      });

    }
  });
}