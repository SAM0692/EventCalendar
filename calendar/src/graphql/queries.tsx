import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
query GetAllEvents{
    events{
        id
        name
        description
        date
    }
}
`

export const GET_EVENT = gql`
query GetEvent($id: ID!){
    event(id: $id){
        id
        name
        description
        date
    }
}
`