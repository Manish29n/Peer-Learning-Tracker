import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function GroupList({ groups, onJoin }) {
  const { token } = useContext(UserContext);

  const handleJoin = async (groupId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/groups/join/${groupId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onJoin(groupId);
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map(group => (
        <div key={group._id} className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-bold">{group.name}</h3>
          <button
            onClick={() => handleJoin(group._id)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Join
          </button>
        </div>
      ))}
    </div>
  );
}

export default GroupList;