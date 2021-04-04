"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const express_graphql_1 = require("express-graphql");
const EventRoutes_1 = require("./routes/EventRoutes");
const types_1 = __importDefault(require("./graphql/types"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const app = express_1.default();
app.use(body_parser_1.json());
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: types_1.default,
    rootValue: resolvers_1.default,
    graphiql: true
}));
const port = 4000;
app.listen(port, () => console.log(`Server started at port: ${port}`));
EventRoutes_1.setEventRoutes(app);
exports.default = app;
//# sourceMappingURL=index.js.map