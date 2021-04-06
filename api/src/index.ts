import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import { setEventRoutes } from "./routes/EventRoutes";
import schema from "./graphql/types";
import resolver from "./graphql/resolvers";

const app = express();

app.use(json());
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

const port = 4000;

mongoose.connect('mongodb://127.0.0.1:27017/eventcalendardb', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(port, () => console.log(`Server started at port: ${port}`));
}).catch((err) => {
    console.log(err);
})

setEventRoutes(app);

export default app;
