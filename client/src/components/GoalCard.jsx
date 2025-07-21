import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function GoalCard({ goal, onEdit, onDelete, onComplete, canEdit = true }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(goal.title);
  const [progress, setProgress] = useState(goal.progress);
  const [deadline, setDeadline] = useState(goal.deadline.split('T')[0]);
  const { token } = useContext(UserContext);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/goals/${goal._id}`,
        { title, progress: Number(progress), deadline },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onEdit(response.data);
      setIsEditing(false);
      toast.success('Goal updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating goal');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/goals/${goal._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onDelete(goal._id);
        toast.success('Goal deleted successfully!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting goal');
      }
    }
  };

  const handleComplete = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/goals/${goal._id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onComplete(response.data);
      toast.success('Goal marked as completed!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error marking goal as completed');
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto mb-4 transition-all duration-300 hover:shadow-xl">
      {isEditing && canEdit ? (
        <form onSubmit={handleEdit}>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Goal Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className={`text-lg font-bold text-blue-600 ${goal.completed ? 'line-through text-gray-500' : ''}`}>
            {goal.title}
          </h3>
          <p>Progress: {goal.progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className={`h-2.5 rounded-full ${goal.completed ? 'bg-green-600' : 'bg-blue-600'}`}
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
          <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
          {goal.completed ? (
            <p className="text-green-600 font-semibold mt-2">Completed!</p>
          ) : (
            <div className="flex gap-2 mt-2">
              {canEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-200"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
              <button
                onClick={handleComplete}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
              >
                Mark as Completed
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GoalCard;