import React, { useMemo } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function NotesList({ notes, query }) {
  const filteredNotes = useMemo(() => {
    if (!query || query.length === 0) {
      return notes;
    }

    return notes.filter(({ content }) => content.includes(query))
  }, [notes, query]);

  return (
    <>
      <LinkContainer to="/notes/new">
        <ListGroup.Item action className="py-3 text-nowrap text-truncate">
          <BsPencilSquare size={17} />
          <span className="ml-2 font-weight-bold">Create a new note</span>
        </ListGroup.Item>
      </LinkContainer>
      {filteredNotes.map(({ noteId, content, createdAt }) => (
        <LinkContainer key={noteId} to={`/notes/${noteId}`}>
          <ListGroup.Item action>
            <span className="font-weight-bold">
              {content.trim().split("\n")[0]}
            </span>
            <br />
            <span className="text-muted">
              Created: {new Date(createdAt).toLocaleString()}
            </span>
          </ListGroup.Item>
        </LinkContainer>
      ))}
    </>
  );
}
