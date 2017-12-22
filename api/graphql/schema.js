const schema = `
  type User {
    id: ID!
	First Name: String!
	Last Name: String!
	Email: String!
  }
  type Query {
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User
  }
  schema {
    query: Query
  }
`;

module.exports = schema;
