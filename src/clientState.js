import { NOTE_FRAGMENT } from "./fragments";

export const defaults = {
  notes: [
    {
      __typename: "Note",
      id: 1,
      title: "first",
      content: "con01"
    }
  ]
};
export const typeDefs = [
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
export const resolvers = {
  Mutation: {},
  Query: {
    note: (_, variable, {cache}) => {
      //dataIdFromObject* dev tool관련인듯,
      const id = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variable.id
      });
      const note = cache.readFragment({fragment: NOTE_FRAGMENT, id})
      return note;
    }
  }
};