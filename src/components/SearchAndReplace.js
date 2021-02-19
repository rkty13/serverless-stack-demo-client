import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import LoaderButton from "./LoaderButton";
import "./SearchAndReplace.css";

export default function SearchAndReplace({
  query,
  replace,
  setQuery,
  setReplace,
  onSubmit,
  isLoading,
  resultsCount
}) {
  const submitDisabled = !query.length || !replace.length || resultsCount === 0;

  return (
    <Dropdown className="SearchAndReplace">
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
          <LoaderButton
            isLoading={isLoading}
            onClick={onSubmit}
            variant="primary"
            className="input"
            disabled={submitDisabled}
          >
            Replace All
          </LoaderButton>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  )
}
