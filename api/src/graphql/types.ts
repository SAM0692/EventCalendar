import { buildSchema } from "graphql";

const schema = buildSchema(`
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

export default schema;