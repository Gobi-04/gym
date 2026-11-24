import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import "../../styles/AdminPortal.css";

const defaultMembers = [
  {
    id: "FG-1041",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98204 11820",
    fitnessGoal: "Muscle Building",
    dietaryPreference: "Non-Vegetarian",
    membershipPlan: "Annual - 12 Months",
    membershipStatus: "Active",
    expiryDate: "2027-08-15",
  },
  {
    id: "FG-1042",
    name: "Priya Nair",
    email: "priya.nair@outlook.com",
    phone: "+91 97450 88214",
    fitnessGoal: "Fat Loss",
    dietaryPreference: "Vegetarian",
    membershipPlan: "Quarterly - 3 Months",
    membershipStatus: "Active",
    expiryDate: "2026-12-02",
  },
  {
    id: "FG-1043",
    name: "Rohan Malhotra",
    email: "rohan.m@yahoo.com",
    phone: "+91 98112 39045",
    fitnessGoal: "Strength Training",
    dietaryPreference: "Non-Vegetarian",
    membershipPlan: "Monthly - 1 Month",
    membershipStatus: "Expired",
    expiryDate: "2026-11-12",
  },
  {
    id: "FG-1044",
    name: "Ananya Verma",
    email: "ananya.verma@gmail.com",
    phone: "+91 99100 76512",
    fitnessGoal: "Weight Loss",
    dietaryPreference: "Vegetarian",
    membershipPlan: "Quarterly - 3 Months",
    membershipStatus: "Active",
    expiryDate: "2026-11-29",
  },
  {
    id: "FG-1045",
    name: "Vikramaditya Rao",
    email: "vikram.rao@proton.me",
    phone: "+91 98451 64209",
    fitnessGoal: "Strength Training",
    dietaryPreference: "Non-Vegetarian",
    membershipPlan: "Annual - 12 Months",
    membershipStatus: "Active",
    expiryDate: "2027-08-20",
  },
  {
    id: "FG-1046",
    name: "Meera Krishnan",
    email: "meera.k@gmail.com",
    phone: "+91 94471 23098",
    fitnessGoal: "Fat Loss",
    dietaryPreference: "Non-Vegetarian",
    membershipPlan: "Monthly - 1 Month",
    membershipStatus: "Active",
    expiryDate: "2026-12-01",
  },
  {
    id: "FG-1047",
    name: "Kabir Deshmukh",
    email: "kabir.d@gmail.com",
    phone: "+91 98230 44551",
    fitnessGoal: "Muscle Building",
    dietaryPreference: "Non-Vegetarian",
    membershipPlan: "Monthly - 1 Month",
    membershipStatus: "Expired",
    expiryDate: "2026-11-05",
  },
  {
    id: "FG-1048",
    name: "Sneha Kulkarni",
    email: "sneha.k@gmail.com",
    phone: "+91 98211 99882",
    fitnessGoal: "Weight Loss",
    dietaryPreference: "Non-Vegetarian",
    membershipPlan: "Quarterly - 3 Months",
    membershipStatus: "Active",
    expiryDate: "2026-11-18",
  },
  {
    id: "FG-1049",
    name: "Devansh Joshi",
    email: "devansh.j@yahoo.com",
    phone: "+91 97654 33221",
    fitnessGoal: "Fat Loss",
    dietaryPreference: "Vegetarian",
    membershipPlan: "Monthly - 1 Month",
    membershipStatus: "Active",
    expiryDate: "2026-12-20",
  },
  {
    id: "FG-1050",
    name: "Ishita Banerjee",
    email: "ishita.b@gmail.com",
    phone: "+91 98300 77665",
    fitnessGoal: "Muscle Building",
    dietaryPreference: "Non-Vegetarian",
    membershipPlan: "Quarterly - 3 Months",
    membershipStatus: "Expired",
    expiryDate: "2026-11-14",
  },
];

function AdminMembers({ members }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Merge external props members if provided, otherwise default to full 10-member dataset
  const memberList = useMemo(() => {
    if (members && Array.isArray(members) && members.length > 5) {
      return members;
    }
    return defaultMembers;
  }, [members]);

  // Filter logic
  const filteredMembers = useMemo(() => {
    return memberList.filter((m) => {
      // Search term matching ID, name, email, or phone
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesQuery =
          m.id?.toLowerCase().includes(query) ||
          m.name?.toLowerCase().includes(query) ||
          m.email?.toLowerCase().includes(query) ||
          m.phone?.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Goal filter
      if (selectedGoal !== "All" && m.fitnessGoal !== selectedGoal) {
        return false;
      }

      // Diet filter
      if (selectedDiet !== "All" && m.dietaryPreference !== selectedDiet) {
        return false;
      }

      // Plan filter
      if (selectedPlan !== "All" && m.membershipPlan !== selectedPlan) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "All") {
        const currentStatus = m.membershipStatus?.toLowerCase();
        if (currentStatus !== selectedStatus.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [
    memberList,
    searchTerm,
    selectedGoal,
    selectedDiet,
    selectedPlan,
    selectedStatus,
  ]);

  return (
    <div className="admin-member-management-page">
      {/* Page Header */}
      <div className="admin-members-header-row">
        <div className="admin-heading-block">
          <h1>Member Management</h1>
          <p>
            Search, filter, inspect, and update registered FITGUIDE member
            profiles and memberships.
          </p>
        </div>
        <div className="admin-members-count-badge">
          Showing <strong>{filteredMembers.length}</strong> of{" "}
          <strong>{memberList.length}</strong> registered members
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="admin-members-filter-bar">
        {/* Search Input */}
        <div className="admin-members-search-box">
          <FiSearch className="admin-members-search-icon" />
          <input
            type="text"
            placeholder="Search ID, name, email, or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Fitness Goal Dropdown */}
        <div className="admin-filter-dropdown-wrap">
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
          >
            <option value="All">All Fitness Goals</option>
            <option value="Muscle Building">Muscle Building</option>
            <option value="Fat Loss">Fat Loss</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Weight Loss">Weight Loss</option>
          </select>
        </div>

        {/* Dietary Preference Dropdown */}
        <div className="admin-filter-dropdown-wrap">
          <select
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
          >
            <option value="All">All Dietary Prefs</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        {/* Plan Dropdown */}
        <div className="admin-filter-dropdown-wrap">
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            <option value="All">All Plans</option>
            <option value="Monthly - 1 Month">Monthly - 1 Month</option>
            <option value="Quarterly - 3 Months">Quarterly - 3 Months</option>
            <option value="Annual - 12 Months">Annual - 12 Months</option>
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="admin-filter-dropdown-wrap">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Members Data Table */}
      <div className="admin-members-table-card">
        <div className="admin-members-table-wrapper">
          <table className="admin-members-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Member Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Fitness Goal</th>
                <th>Dietary Preference</th>
                <th>Membership Plan</th>
                <th>Membership Status</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((m) => {
                  const isActive =
                    m.membershipStatus?.toLowerCase() === "active";
                  return (
                    <tr key={m.id}>
                      <td className="member-id-cell">{m.id}</td>
                      <td className="member-name-cell">{m.name}</td>
                      <td className="member-email-cell">{m.email}</td>
                      <td className="member-phone-cell">{m.phone}</td>
                      <td className="member-goal-cell">{m.fitnessGoal}</td>
                      <td className="member-diet-cell">
                        {m.dietaryPreference}
                      </td>
                      <td className="member-plan-cell">{m.membershipPlan}</td>
                      <td className="member-status-cell">
                        <span
                          className={`member-status-indicator ${
                            isActive ? "status-active" : "status-expired"
                          }`}
                        >
                          {isActive ? (
                            <FiCheckCircle className="status-icon" />
                          ) : (
                            <FiXCircle className="status-icon" />
                          )}
                          <span>{m.membershipStatus}</span>
                        </span>
                      </td>
                      <td className="member-expiry-cell">{m.expiryDate}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="admin-no-results-cell">
                    No registered members found matching your search and
                    filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminMembers;
