import {createServer, Model} from "miragejs";


export default function Server () {
  createServer({
    models: {
      product: Model,
    },

    routes() {
      this.get("/api/products", (schema) => {
        return schema.products.all()
      })

      this.post("/api/products", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.products.create(attrs)
      })
    },
  })
}