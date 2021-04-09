import {gql} from "graphql-request";

const query = gql`
    mutation NEW_MESSAGE($chat_id: ID!, $input: [NewMessageInput!]!) {
        newMessages2( chat_id: $chat_id, input: $input) {
            edges {
                node {
                    id
                }
            }
        }
    }
`;

const a = JSON.stringify(query)
console.log(a)

console.dir(query)