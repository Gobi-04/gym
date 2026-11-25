const API_BASE_URL = 'http://localhost:5001/api';

export const api = {

  // ======================================================
  // AUTH & MEMBER
  // ======================================================

  async register(userData) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to register');
    return data;
  },

  async login(loginIdentifier, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: loginIdentifier, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to login');
    return data;
  },

  async getUser(userId) {
    const res = await fetch(`${API_BASE_URL}/auth/user/${userId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch user');
    return data;
  },

  // ======================================================
  // CONTACT
  // ======================================================

  async submitContact(contactData) {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry');
    return data;
  },

  // ======================================================
  // FITNESS
  // ======================================================

  async updateFitnessProfile(userId, goal, diet) {
    const res = await fetch(`${API_BASE_URL}/fitness/onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, goal, diet }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update fitness profile');
    return data;
  },

  // ======================================================
  // PLANS (PUBLIC)
  // ======================================================

  async getPlans() {
    const res = await fetch(`${API_BASE_URL}/plans`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch plans');
    return data;
  },

  // ======================================================
  // ADMIN AUTH
  // ======================================================

  async adminLogin(email, password) {
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Admin authentication failed');
    return data;
  },

  // ======================================================
  // ADMIN DASHBOARD
  // ======================================================

  async getAdminStats() {
    const res = await fetch(`${API_BASE_URL}/admin/stats`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch admin statistics');
    return data;
  },

  // ======================================================
  // ADMIN — MEMBER MANAGEMENT
  // ======================================================

  async getAdminMembers() {
    const res = await fetch(`${API_BASE_URL}/admin/members`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch members');
    return data;
  },

  async getAdminMember(id) {
    const res = await fetch(`${API_BASE_URL}/admin/members/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch member');
    return data;
  },

  async updateAdminMember(id, memberData) {
    const res = await fetch(`${API_BASE_URL}/admin/members/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update member');
    return data;
  },

  async deleteMember(id) {
    const res = await fetch(`${API_BASE_URL}/admin/members/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete member');
    return data;
  },

  // ======================================================
  // ADMIN — PLAN MANAGEMENT
  // ======================================================

  async getAdminPlans() {
    const res = await fetch(`${API_BASE_URL}/admin/plans`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch plans');
    return data;
  },

  async createAdminPlan(planData) {
    const res = await fetch(`${API_BASE_URL}/admin/plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create plan');
    return data;
  },

  async updateAdminPlan(id, planData) {
    const res = await fetch(`${API_BASE_URL}/admin/plans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update plan');
    return data;
  },

  async deleteAdminPlan(id) {
    const res = await fetch(`${API_BASE_URL}/admin/plans/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete plan');
    return data;
  },

  // ======================================================
  // ADMIN — PAYMENT MANAGEMENT
  // ======================================================

  async getAdminPayments() {
    const res = await fetch(`${API_BASE_URL}/admin/payments`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch payments');
    return data;
  },

  async updatePaymentStatus(id, status) {
    const res = await fetch(`${API_BASE_URL}/admin/payments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update payment status');
    return data;
  },

  // ======================================================
  // ADMIN — WORKOUT MANAGEMENT
  // ======================================================

  async getAdminWorkouts(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE_URL}/admin/workouts${params ? '?' + params : ''}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch workouts');
    return data;
  },

  async createAdminWorkout(workoutData) {
    const res = await fetch(`${API_BASE_URL}/admin/workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create workout');
    return data;
  },

  async updateAdminWorkout(id, workoutData) {
    const res = await fetch(`${API_BASE_URL}/admin/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update workout');
    return data;
  },

  async deleteAdminWorkout(id) {
    const res = await fetch(`${API_BASE_URL}/admin/workouts/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete workout');
    return data;
  },

  async getWorkoutCategories() {
    const res = await fetch(`${API_BASE_URL}/admin/workout-categories`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch workout categories');
    return data;
  },

  // ======================================================
  // ADMIN — DIET PLAN MANAGEMENT
  // ======================================================

  async getAdminDietPlans(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE_URL}/admin/diet-plans${params ? '?' + params : ''}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch diet plans');
    return data;
  },

  async createAdminDietPlan(dietData) {
    const res = await fetch(`${API_BASE_URL}/admin/diet-plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dietData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create diet plan');
    return data;
  },

  async updateAdminDietPlan(id, dietData) {
    const res = await fetch(`${API_BASE_URL}/admin/diet-plans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dietData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update diet plan');
    return data;
  },

  async deleteAdminDietPlan(id) {
    const res = await fetch(`${API_BASE_URL}/admin/diet-plans/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete diet plan');
    return data;
  },

  // ======================================================
  // ADMIN — CONTACT INQUIRIES
  // ======================================================

  async getAdminInquiries() {
    const res = await fetch(`${API_BASE_URL}/admin/inquiries`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch inquiries');
    return data;
  },

  async deleteAdminInquiry(id) {
    const res = await fetch(`${API_BASE_URL}/admin/inquiries/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete inquiry');
    return data;
  },
};
