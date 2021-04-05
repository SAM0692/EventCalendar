import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
mutation CreateEvent($input: EventInput!){
    createEvent(input: $input)
}
`

export const UPDATE_EVENT = gql`
mutation UpdateEvent($id: ID!, $input: EventInput!){
    updateEvent(id: $id, input: $input){
        id
        name
        description
        date
    }
}
`

export const DELETE_EVENT = gql`
mutation DeleteEvent($id: ID!){
    deleteEvent(id: $id)
}
`