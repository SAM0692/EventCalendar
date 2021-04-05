import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
query GetAllEvents($date: String){
    events(date: $date) {
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