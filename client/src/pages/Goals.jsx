import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GoalCard from '../components/GoalCard';
import { UserContext } from '../context/UserContext';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [deadline, setDeadline] = useState('');
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('${import.meta.env.VITE_API_URL}/api/goals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    fetchGoals();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '${import.meta.env.VITE_API_URL}/api/goals',
        { title, progress, deadline },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals([...goals, response.data]);
      setTitle('');
      setProgress(0);
      setDeadline('');
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Learning Goals</h2>
      <form onSubmit={handleSubmit} className="mb-6 max-w-md mx-auto p-6 bg-white shadow rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium">Goal Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Progress (%)</label>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
            max="100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Add Goal
        </button>
      </form>
      <div className="grid gap-4">
        {goals.map(goal => (
          <GoalCard key={goal._id} goal={goal} />
        ))}
      </div>
    </div>
  );
}

export default Goals;