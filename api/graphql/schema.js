const schema = `
  type User {
    id: id!
    FirstName: String
    LastName: String
    Email: String
  }
  type id {
    id: Int
  }
  type FirstName {
    FirstName: String!
  }
  type LastName {
    LastName: String!
  }
  type Email {
    Email: String!
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
