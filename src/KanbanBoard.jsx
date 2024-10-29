// KanbanBoard.js
import React from 'react';
import './KanbanBoard.css';

function KanbanBoard({ groupedTickets, users, groupingOption }) {
  console.log(users);

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group, index) => (
        <div key={index} className="kanban-column">
          <h2>{groupingOption === "user" ? users[index].name : group}</h2>
          {groupedTickets[group].map((item,index2) => (
            <div key={item.id} className="kanban-ticket">
              {groupingOption === "user" ? (
                // Display user information
                <>
                  <h3>Name: {users[index].name}</h3>
                  <p>ID: {item.id}</p>
                  <p>Available: {item.available ? "Yes" : "No"}</p>
                </>
              ) : (
                // Display ticket information
                <>
                  <h3>Title: {item.title}</h3>
                  <p>ID: {item.id}</p>
                  <p>Tag: {item.tag.join(', ')}</p>
                  <p>User ID: {item.userId}</p>
                  <p>Status: {item.status}</p>
                  <p>Priority: {item.priority}</p>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
