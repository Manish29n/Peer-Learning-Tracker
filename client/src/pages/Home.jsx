import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import GroupList from '../components/GroupList';
import GoalCard from '../components/GoalCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [goals, setGoals] = useState([]);
  const { token, user } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const groupsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(groupsResponse.data);

      const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyGroups(userResponse.data.groups);

      const goalsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/goals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(goalsResponse.data);
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const handleJoin = (groupId) => {
    setGroups(groups.filter(group => group._id !== groupId));
    setMyGroups([...myGroups, groups.find(group => group._id === groupId)]);
    fetchData(); // Refresh data
  };

  const handleLeave = (groupId) => {
    setMyGroups(myGroups.filter(group => group._id !== groupId));
    setGroups([...groups, myGroups.find(group => group._id === groupId)]);
    fetchData(); // Refresh data
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal._id !== goalId));
  };

  const handleCompleteGoal = (updatedGoal) => {
    setGoals(goals.map(goal => goal._id === updatedGoal._id ? updatedGoal : goal));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Welcome, {user?.email}</h2>
      
      <h3 className="text-xl font-semibold mb-2">My Groups</h3>
      {myGroups.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {myGroups.map(group => (
            <div key={group._id} className="p-4 bg-white shadow rounded-lg">
              <h4 className="text-lg font-bold">{group.name}</h4>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mb-6">You haven't joined any groups yet.</p>
      )}

      <h3 className="text-xl font-semibold mb-2">My Goals</h3>
      {goals.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {goals.map(goal => (
            <GoalCard
              key={goal._id}
              goal={goal}
              canEdit={false}
              onDelete={handleDeleteGoal}
              onComplete={handleCompleteGoal}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mb-6">No goals set yet.</p>
      )}

      <div className="flex gap-4">
        <Link to="/groups" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
          Go to Groups
        </Link>
        <Link to="/goals" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
          Go to Goals
        </Link>
      </div>
    </div>
  );
}

export default Home;