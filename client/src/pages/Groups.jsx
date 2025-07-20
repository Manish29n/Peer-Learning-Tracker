import { useState, useEffect } from 'react';
import axios from 'axios';
import GroupList from '../components/GroupList';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Groups() {
  const [groups, setGroups] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/groups', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, [token]);

  const handleJoin = (groupId) => {
    setGroups(groups.filter(group => group._id !== groupId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Learning Groups</h2>
      <GroupList groups={groups} onJoin={handleJoin} />
    </div>
  );
}

export default Groups;