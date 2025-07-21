import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GroupList from '../components/GroupList';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const { token, user } = useContext(UserContext);

  const fetchGroups = async () => {
    try {
      const groupsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(groupsResponse.data);
      const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyGroups(userResponse.data.groups);
    } catch (error) {
      toast.error('Error fetching groups');
    }
  };

  useEffect(() => {
    if (token) fetchGroups();
  }, [token]);

  const handleJoin = (groupId) => {
    setGroups(groups.filter(group => group._id !== groupId));
    setMyGroups([...myGroups, groups.find(group => group._id === groupId)]);
    fetchGroups(); // Refresh data
  };

  const handleLeave = (groupId) => {
    setMyGroups(myGroups.filter(group => group._id !== groupId));
    setGroups([...groups, myGroups.find(group => group._id === groupId)]);
    fetchGroups(); // Refresh data
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/groups`,
        { name: groupName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyGroups([...myGroups, response.data]);
      setGroupName('');
      toast.success('Group created successfully!');
      fetchGroups(); // Refresh data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating group');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Learning Groups</h2>
      
      <form onSubmit={handleCreateGroup} className="mb-6 max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Create Group
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Available Groups</h3>
      <GroupList groups={groups} myGroups={myGroups} onJoin={handleJoin} onLeave={handleLeave} />
    </div>
  );
}

export default Groups;