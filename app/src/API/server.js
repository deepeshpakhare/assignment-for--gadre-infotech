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
        let attrs = JSON.parse(request.requestBody)
        return schema.products.create(attrs)
      })

      this.post('/upload', (schema, request) => {
        const formData = request.requestBody;
        
        // Log the incoming data
        const urlParams = new URLSearchParams(formData);
        const imageUrl = urlParams.get('imageUrl');
        const id = urlParams.get('id');

        console.log('Received imageUrl:', imageUrl);
        console.log('Received id:', id);
        // Process the file here; you can save it or return a mock response
        return schema.images.create({id, imageUrl});
      });

      this.get('/image', (schema) => {
        return schema.images.all();
      });

    }
  });
}