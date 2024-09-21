import {createServer, Model} from "miragejs";


export default function Server () {
  createServer({
    models: {
      product: Model,
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
    },
  })
}