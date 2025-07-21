import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function GroupList({ groups, myGroups, onJoin, onLeave }) {
  const { token } = useContext(UserContext);

  const handleJoin = async (groupId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/groups/join/${groupId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onJoin(groupId);
      toast.success('Joined group successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error joining group');
    }
  };

  const handleLeave = async (groupId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/groups/leave/${groupId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onLeave(groupId);
      toast.success('Left group successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error leaving group');
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map(group => (
        <div key={group._id} className="p-4 bg-white shadow rounded-lg transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-bold">{group.name}</h3>
          {myGroups.some(g => g._id === group._id) ? (
            <button
              onClick={() => handleLeave(group._id)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
            >
              Leave
            </button>
          ) : (
            <button
              onClick={() => handleJoin(group._id)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Join
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default GroupList;