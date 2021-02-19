import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SearchAndReplace.css";

export default function SearchAndReplace({ query, replace, setQuery, setReplace, onSubmit }) {
  return (
    <Dropdown as={InputGroup.Append} className="SearchAndReplace">
      <Dropdown.Toggle>
        Search and Replace
      </Dropdown.Toggle>
      <Dropdown.Menu className="py-3 px-3" align="right">
        <Form>
        <Form.Control
          placeholder="Search"
          className="mb-2 input"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Form.Control
          placeholder="Replace"
          className="mb-2 input"
          value={replace}
          onChange={e => setReplace(e.target.value)}
        />
        <Button onClick={onSubmit} variant="secondary">
          Replace All
        </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  )
}
