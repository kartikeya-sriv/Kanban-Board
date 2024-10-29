// GroupingOptions.js
import React from 'react';
import './GroupingOptions.css';

function GroupingOptions({ groupingOption, onGroupingOptionChange }) {
  return (
    <div className="grouping-options">
      <label>Group by:</label>
      <select value={groupingOption} onChange={onGroupingOptionChange}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default GroupingOptions;
