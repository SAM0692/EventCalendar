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

export default schema;