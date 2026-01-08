import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import ProfileModal from '../components/ProfileModal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile/me');
      setProfile(response.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/tasks?${params.toString()}`);
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      // Add new task to the beginning of the list
      setTasks(prev => [response.data.task, ...prev]);
      setShowTaskForm(false);
      setNotification({ type: 'success', message: 'Task created successfully!' });
      setTimeout(() => setNotification(null), 3000);
      // Refresh tasks to ensure we have the latest data
      await fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      setNotification({ type: 'error', message: error.response?.data?.message || 'Failed to create task' });
      setTimeout(() => setNotification(null), 3000);
      throw error;
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      setTasks(prev => prev.map(task => task._id === taskId ? response.data.task : task));
      setEditingTask(null);
      setShowTaskForm(false);
      // Refresh tasks to ensure we have the latest data
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      setNotification({ type: 'success', message: 'Task deleted successfully!' });
      setTimeout(() => setNotification(null), 3000);
      // Refresh tasks to ensure we have the latest data
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setNotification({ type: 'error', message: 'Failed to delete task' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleProfileUpdate = async (profileData) => {
    try {
      const response = await api.put('/profile/me', profileData);
      setProfile(response.data.user);
      setShowProfileModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ status: '', priority: '', search: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome back, {profile?.name || user?.name}!</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowProfileModal(true)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Profile
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Task Stats */}
        {!loading && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
                <p className="text-sm text-gray-600">
                  {tasks.length === 0 
                    ? 'No tasks yet' 
                    : `${tasks.length} task${tasks.length === 1 ? '' : 's'} total`
                  }
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-yellow-600">
                    {tasks.filter(t => t.status === 'pending').length}
                  </div>
                  <div className="text-gray-600">Pending</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </div>
                  <div className="text-gray-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">
                    {tasks.filter(t => t.status === 'completed').length}
                  </div>
                  <div className="text-gray-600">Completed</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task Actions */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => setShowTaskForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors"
          >
            + Add New Task
          </button>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {(filters.status || filters.priority || filters.search) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        )}

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new task.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  + Create Task
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showProfileModal && (
        <ProfileModal
          profile={profile}
          onClose={() => setShowProfileModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onClose={handleCloseTaskForm}
          onSubmit={editingTask ? (data) => handleUpdateTask(editingTask._id, data) : handleCreateTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
