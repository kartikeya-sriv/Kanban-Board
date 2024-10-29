// SortingOptions.js
import React from 'react';
import './SortingOptions.css';

function SortingOptions({ sortOption, onSortOptionChange }) {
  return (
    <div className="sorting-options">
      <label>Sort by:</label>
      <select value={sortOption} onChange={onSortOptionChange}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}

export default SortingOptions;
