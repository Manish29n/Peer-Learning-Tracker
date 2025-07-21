import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GoalCard from '../components/GoalCard';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [deadline, setDeadline] = useState('');
  const { token } = useContext(UserContext);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/goals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(response.data);
    } catch (error) {
      toast.error('Error fetching goals');
    }
  };

  useEffect(() => {
    if (token) fetchGoals();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/goals`,
        { title, progress, deadline },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals([...goals, response.data]);
      setTitle('');
      setProgress(0);
      setDeadline('');
      toast.success('Goal created successfully!');
      fetchGoals(); // Refresh data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating goal');
    }
  };

  const handleEditGoal = (updatedGoal) => {
    setGoals(goals.map(g => g._id === updatedGoal._id ? updatedGoal : g));
    fetchGoals(); // Refresh data
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal._id !== goalId));
    fetchGoals(); // Refresh data
  };

  const handleCompleteGoal = (updatedGoal) => {
    setGoals(goals.map(goal => goal._id === updatedGoal._id ? updatedGoal : goal));
    fetchGoals(); // Refresh data
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">My Learning Goals</h2>
      <form onSubmit={handleSubmit} className="mb-6 max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Goal Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            min="0"
            max="100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Add Goal
        </button>
      </form>
      <div className="grid gap-4">
        {goals.map(goal => (
          <GoalCard
            key={goal._id}
            goal={goal}
            onEdit={handleEditGoal}
            onDelete={handleDeleteGoal}
            onComplete={handleCompleteGoal}
          />
        ))}
      </div>
    </div>
  );
}

export default Goals;