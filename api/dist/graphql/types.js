"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
    type Query {
        event(id: ID!): Event
        events: [Event]
    },
    type Event {
        id: ID
        name: String
        description: String
        date: String
    },
    type Mutation {
        createEvent(input: EventInput!): Boolean
        updateEvent(id: ID!, input: EventInput!): Event
        deleteEvent(id: ID!): Boolean
    },
    input EventInput {
        name: String
        description: String
        date: String
    }
`);
exports.default = schema;
//# sourceMappingURL=types.js.map