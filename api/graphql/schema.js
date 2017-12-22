const schema = `
  type User {
    id: id!
    first_name: String
    last_name: String
    email: String
  }
  type id {
    id: Int
  }
  type first_name {
    first_name: String!
  }
  type last_name {
    last_name: String!
  }
  type email {
    email: String!
  }
  type Query {
    getUserById(id: id!): User
    getUserByEmail(email: String!): User
  }
  schema {
    query: Query
  }
`;

module.exports = schema;
