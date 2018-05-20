import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../schema'
import Weather from '../model/Weather.js'

let port = 3000
const app = express()
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true,
  context: {
    Weather: new Weather()
  }
}))

app.listen(port)
console.log(`GraphQL API server running at localhost:${port}`)
