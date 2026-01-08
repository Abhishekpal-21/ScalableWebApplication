const TaskList = ({ tasks, onEdit, onDelete, onUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    onUpdate(taskId, { status: newStatus });
  };

  if (tasks.length === 0) {
    return null; // Empty state is handled by Dashboard
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 flex-1">{task.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Status:</label>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task._id, e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
