import express from "express";
import { json } from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { setEventRoutes } from "./routes/EventRoutes";
import schema from "./graphql/types";
import resolver from "./graphql/resolvers";

const app = express();

app.use(json());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

const port = 4000;

app.listen(port, () => console.log(`Server started at port: ${port}`));

setEventRoutes(app);

export default app;
