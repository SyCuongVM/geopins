const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Pin {
    _id: ID
    createdAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
  }

  type Comment {
    text: String
    createdAt: String
    author: User
  }

  type Query {
    me: User
    getPins: [Pin!]
  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
    deletePin(pinId: ID!): Pin
    createComment(pindId: ID!, text: String!): Pin
  }

  type Subscription {
    pinAdded: Pin
    pindDeleted: Pin
    pinUpdated: Pin
  }

  input CreatePinInput {
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
  }
`;