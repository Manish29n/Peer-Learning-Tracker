function GoalCard({ goal }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg w-full max-w-md mx-auto mb-4">
      <h3 className="text-lg font-bold">{goal.title}</h3>
      <p>Progress: {goal.progress}%</p>
      <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
    </div>
  );
}

export default GoalCard;