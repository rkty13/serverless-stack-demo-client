import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import NotesList from "../components/NotesList";
import SearchAndReplace from "../components/SearchAndReplace";
import LoadingIndicator from "../components/LoadingIndicator";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [replace, setReplace] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function updateNoteContent(id, newContent) {
    return API.put("notes", `/notes/${id}`, {
      body: {
        content: newContent
      }
    });
  }

  function updateNotes() {
    return notes.map(async note => {
      const { noteId, content } = note;

      if (!content.includes(query)) {
        return note;
      }

      const replacedContent = content.replaceAll(query, replace);

      await updateNoteContent(noteId, replacedContent);

      return {
        ...note,
        content: replacedContent
      }
    })
  }

  async function onSubmitReplace() {
    try {
      if (!isAuthenticated) {
        return;
      }

      setIsLoading(true);

      const newNotes = updateNotes();
      const updatedNotes = await Promise.all(newNotes);

      setQuery("");
      setReplace("");
      setNotes(updatedNotes);
    } catch (e) {
      onError(e);
    }

    setIsLoading(false);
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
        <div className="pt-3">
          <Link to="/login" className="btn btn-info btn-lg mr-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <div className="pb-3 mt-4 mb-3 border-bottom header">
          <h2>Your Notes</h2>
          <SearchAndReplace
            query={query}
            setQuery={setQuery}
            replace={replace}
            setReplace={setReplace}
            onSubmit={onSubmitReplace}
            isLoading={isLoading}
          />
        </div>
        <ListGroup>
          {isLoading ? <LoadingIndicator /> : <NotesList notes={notes} query={query} />}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
