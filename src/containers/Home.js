import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import debounce from "lodash.debounce";
import NotesList from "../components/NotesList";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";

const DEBOUNCE_WAIT = 500;

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

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

  const setQueryDebounced = debounce(setQuery, DEBOUNCE_WAIT);

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
          <InputGroup className="search">
            <Form.Control
              placeholder="Search"
              onChange={e => setQueryDebounced(e.target.value)}
            />
          </InputGroup>
        </div>
        <ListGroup>{!isLoading && <NotesList notes={notes} query={query} />}</ListGroup>
      </div>
    );
  }
  
  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
