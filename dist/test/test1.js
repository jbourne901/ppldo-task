"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const query = graphql_request_1.gql `
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
const a = JSON.stringify(query);
console.log(a);
console.dir(query);
//# sourceMappingURL=test1.js.map