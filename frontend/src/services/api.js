const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // 1. Auth & Member registration
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

  // 2. Member login
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

  // 3. Contact inquiry submission
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

  // 4. Update fitness goals & diet
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

  // 5. Fetch available membership plans
  async getPlans() {
    const res = await fetch(`${API_BASE_URL}/plans`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch plans');
    return data;
  },

  // 6. Fetch user details and membership
  async getUser(userId) {
    const res = await fetch(`${API_BASE_URL}/auth/user/${userId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch user');
    return data;
  },

  // 7. Admin Authentication
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

  // 8. Admin Dashboard Statistics
  async getAdminStats() {
    const res = await fetch(`${API_BASE_URL}/admin/stats`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch admin statistics');
    return data;
  },

  // 9. Admin Fetch Members
  async getAdminMembers() {
    const res = await fetch(`${API_BASE_URL}/admin/members`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch members');
    return data;
  },

  // 10. Admin Delete Member
  async deleteMember(id) {
    const res = await fetch(`${API_BASE_URL}/admin/members/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete member');
    return data;
  },

  // 11. Admin Fetch Payments
  async getAdminPayments() {
    const res = await fetch(`${API_BASE_URL}/admin/payments`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch payments');
    return data;
  },

  // 12. Admin Fetch Contact Inquiries
  async getAdminInquiries() {
    const res = await fetch(`${API_BASE_URL}/admin/inquiries`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch inquiries');
    return data;
  }
};
