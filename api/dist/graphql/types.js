"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
    type Query {
        event(id: ID!): Event
        events(date: String): [Event]
    },
    type Event {
        id: ID
        name: String
        description: String
        date: String
    },
    type Mutation {
        createEvent(input: CreateEventInput!): Boolean
        updateEvent(id: ID!, input: UpdateEventInput!): Boolean
        deleteEvent(id: ID!): Boolean
    },
    input CreateEventInput {
        name: String
        description: String
        date: String
    },
    input UpdateEventInput {
        name: String
        description: String
        date: String
    }
`);
exports.default = schema;
//# sourceMappingURL=types.js.map