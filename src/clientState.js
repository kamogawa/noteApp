import { NOTE_FRAGMENT } from "./fragments";
import { GET_NOTES } from "./queries";

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
    editNote(id: Int!, title: String!, content: String!)
  }
  type Note {
    id: Int!
    title: String!
    content: String!
  }
  `
];
export const resolvers = {
  Mutation: {
    cretateNote: (_, variable, {cache}) => {
      const { notes } = cache.readQuery({
        query: GET_NOTES
      });
      const { title, content } = variable;
      const newNote = {
        __typename: "Note",
        title,
        content,
        id: notes.length +1
      }
      cache.writeData({
        data: {
          notes: [newNote, ...notes]
        }
      });
      return newNote;
    },
    editNote: (_, {id, title, content}, {cache}) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note",
        id
      });
      const note = cache.readFragment({fragment: NOTE_FRAGMENT, id: noteId})
      const updatedNote = {
        ...note,
        title,
        content
      };
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updatedNote
      });
      return updatedNote;
    }
  },
  Query: {
    note: (_, variable, {cache}) => {
      //dataIdFromObject* dev tool관련인듯,
      const id = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variable.id
      });
      const note = cache.readFragment({fragment: NOTE_FRAGMENT, id});

      return note;
    }
  }
};