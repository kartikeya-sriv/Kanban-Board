import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from './KanbanBoard.jsx';
import GroupingOptions from './GroupingOptions.jsx';
import SortingOptions from './SortingOptions.jsx';
import './App.css';

function App() {
  // Define state variables
  const [tickets, setTickets] = useState([]);
  const [users,setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortOption, setSortOption] = useState('priority');


  useEffect(() => {
    const API = 'https://api.quicksell.co/v1/internal/frontend-assignment';

    const fetchApiData = async () => {
      try {
        const response = await axios.get(API);
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApiData();
  }, []);

  // Group and sort the tickets based on user's choices
  const groupedAndSortedTickets = () => {
    // Clone the original tickets array to avoid modifying it
    const clonedTickets = [...tickets];
    
    
    if (groupingOption === 'status') {
      // Group by status
      const groupedByStatus = {};

      clonedTickets.forEach((ticket) => {
        const status = ticket.status;
        if (!groupedByStatus[status]) {
          groupedByStatus[status] = [];
        }
        groupedByStatus[status].push(ticket);
      });

      return groupedByStatus;
    } else if (groupingOption === 'user') {
      // Group by user
      const groupedByUser = {};

      clonedTickets.forEach((ticket) => {
        const user = ticket.userId;
        if (!groupedByUser[user]) {
          groupedByUser[user] = [];
        }
        groupedByUser[user].push(ticket);
      });

      return groupedByUser;
    } else if (groupingOption === 'priority') {
      // Group by priority
      const groupedByPriority = {};

      clonedTickets.forEach((ticket) => {
        const priority = ticket.priority;
        if (!groupedByPriority[priority]) {
          groupedByPriority[priority] = [];
        }
        groupedByPriority[priority].push(ticket);
      });

      return groupedByPriority;
    }

    // Default to grouping by status
    // return groupedByStatus;
  };

  const sortedTickets = [...tickets]; // Clone the original array to avoid modifying it

  if (sortOption === 'priority') {
    // Sort by priority
    sortedTickets.sort((a, b) => b.priority - a.priority);
  } else if (sortOption === 'title') {
    // Sort by title
    sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
  }
  const groupedTickets = {};

  sortedTickets.forEach((ticket) => {
    const key = groupingOption === 'priority' ? ticket.priority : ticket.title;
    if (!groupedTickets[key]) {
      groupedTickets[key] = [];
    }
    groupedTickets[key].push(ticket);
  });


  // Implement local storage for view state
  useEffect(() => {
    const savedGroupingOption = localStorage.getItem('groupingOption');
    const savedSortOption = localStorage.getItem('sortOption');

    if (savedGroupingOption) {
      setGroupingOption(savedGroupingOption);
    }
    if (savedSortOption) {
      setSortOption(savedSortOption);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('sortOption', sortOption);
  }, [groupingOption, sortOption]);

  // Return your UI components here
  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <GroupingOptions
        groupingOption={groupingOption}
        onGroupingOptionChange={(e) => setGroupingOption(e.target.value)}
      />
      <SortingOptions
        sortOption={sortOption}
        onSortOptionChange={(e) => setSortOption(e.target.value)}
      />
      <KanbanBoard groupedTickets={groupedAndSortedTickets()} users={users} groupingOption={groupingOption}/>
    </div>
  );
}

export default App;
