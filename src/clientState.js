export const resolvers = {
  notes: []
};
export const defaults = [
  `
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    notes: [Note]!
    note(id: Int!): Note
  }
  type Mutation {
    cretateNote(title: String!, content: String!)
    editNote(id: String!, title: String!, content: String!)
  }
  type Note {
    id: Int!
    title: String!
    content: String!
  }
  `
];
export const typeDefs = {
  Query: {
    notes: () => true
  }
};