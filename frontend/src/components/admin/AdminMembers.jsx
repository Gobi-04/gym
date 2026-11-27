import React, { useState, useMemo, useEffect } from "react";
import {
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiEdit2,
  FiChevronDown,
  FiX,
  FiCheck,
  FiCalendar,
  FiMail,
  FiPhone,
  FiActivity,
  FiCoffee,
  FiAward,
} from "react-icons/fi";
import { api } from "../../services/api";
import "../../styles/AdminMembers.css";

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

const formatGoal = (goal) => {
  if (!goal) return "Muscle Building";
  return goal
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const formatDiet = (diet) => {
  if (!diet) return "Non-Vegetarian";
  return diet
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
};

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  return d.toISOString().slice(0, 10);
};

const normalizeMember = (m, idx = 0) => {
  const isNumericId = typeof m.id === "number";
  const displayId = m.memberId || (String(m.id || "").startsWith("FG-") ? m.id : `FG-${1040 + (isNumericId ? m.id : idx + 1)}`);
  const rawStatus = (m.membershipStatus || m.membership_status || m.status || "Active").toLowerCase();
  const statusLabel = rawStatus === "expired" || rawStatus === "cancelled" ? "Expired" : "Active";

  return {
    id: displayId,
    dbId: m.dbId ?? (isNumericId ? m.id : null),
    name: m.name || "Member",
    email: m.email || "—",
    phone: m.phone || "—",
    fitnessGoal: formatGoal(m.fitnessGoal || m.goal),
    dietaryPreference: formatDiet(m.dietaryPreference || m.diet),
    membershipPlan: m.membershipPlan || m.plan_name || m.plan || "Monthly - 1 Month",
    membershipStatus: statusLabel,
    expiryDate: formatDate(m.expiryDate || m.end_date),
  };
};

function AdminMembers({ members = [] }) {
  // Member List State (only real registered members, no dummy defaults)
  const [memberList, setMemberList] = useState(() => {
    if (members && Array.isArray(members) && members.length > 0) {
      return members.map(normalizeMember);
    }
    return [];
  });

  // Sync with backend API on mount (falls back to props if backend is offline)
  useEffect(() => {
    let cancelled = false;
    api
      .getAdminMembers()
      .then((res) => {
        if (!cancelled && Array.isArray(res)) {
          setMemberList(res.map(normalizeMember));
        }
      })
      .catch(() => {
        if (!cancelled && Array.isArray(members)) {
          setMemberList(members.map(normalizeMember));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [members]);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Modal & Menu States
  const [viewingMember, setViewingMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const saveMemberList = (updatedList) => {
    setMemberList(updatedList);
    localStorage.setItem("fitguideMembersList", JSON.stringify(updatedList));
  };

  // Filter logic
  const filteredMembers = useMemo(() => {
    return memberList.filter((m) => {
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesQuery =
          m.id?.toLowerCase().includes(query) ||
          m.name?.toLowerCase().includes(query) ||
          m.email?.toLowerCase().includes(query) ||
          m.phone?.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      if (selectedGoal !== "All" && m.fitnessGoal !== selectedGoal) {
        return false;
      }

      if (selectedDiet !== "All" && m.dietaryPreference !== selectedDiet) {
        return false;
      }

      if (selectedPlan !== "All" && m.membershipPlan !== selectedPlan) {
        return false;
      }

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

  // Actions
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingMember) return;
    const updated = memberList.map((m) =>
      m.id === editingMember.id ? editingMember : m
    );
    saveMemberList(updated);
    if (editingMember.dbId) {
      try {
        await api.updateAdminMember(editingMember.dbId, {
          name: editingMember.name,
          email: editingMember.email,
          phone: editingMember.phone,
          plan_name: editingMember.membershipPlan,
          membership_status: editingMember.membershipStatus.toLowerCase(),
          goal: editingMember.fitnessGoal.toLowerCase().replace(/\s+/g, "-"),
          diet: editingMember.dietaryPreference.toLowerCase(),
        });
      } catch {
        // already saved locally
      }
    }
    setEditingMember(null);
    showToast(`Member ${editingMember.name} updated successfully!`);
  };

  const handleToggleStatus = async (id) => {
    let targetMember = null;
    let nextStatus = "Active";
    const updated = memberList.map((m) => {
      if (m.id === id) {
        nextStatus = m.membershipStatus === "Active" ? "Expired" : "Active";
        targetMember = { ...m, membershipStatus: nextStatus };
        return targetMember;
      }
      return m;
    });
    saveMemberList(updated);
    if (targetMember?.dbId) {
      try {
        await api.updateAdminMember(targetMember.dbId, {
          membership_status: nextStatus.toLowerCase(),
        });
      } catch {
        // already saved locally
      }
    }
    showToast("Member status updated!");
  };

  const handleQuickRenew = async (id) => {
    let targetMember = null;
    const updated = memberList.map((m) => {
      if (m.id === id) {
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 30);
        const yyyy = nextDate.getFullYear();
        const mm = String(nextDate.getMonth() + 1).padStart(2, "0");
        const dd = String(nextDate.getDate()).padStart(2, "0");
        targetMember = {
          ...m,
          membershipStatus: "Active",
          expiryDate: `${yyyy}-${mm}-${dd}`,
        };
        return targetMember;
      }
      return m;
    });
    saveMemberList(updated);
    if (targetMember?.dbId) {
      try {
        await api.updateAdminMember(targetMember.dbId, {
          membership_status: "active",
        });
      } catch {
        // already saved locally
      }
    }
    showToast("Membership renewed for 30 days!");
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      const target = memberList.find((m) => m.id === id);
      const updated = memberList.filter((m) => m.id !== id);
      saveMemberList(updated);
      if (target?.dbId) {
        try {
          await api.deleteMember(target.dbId);
        } catch {
          // already removed locally
        }
      }
      showToast("Member deleted successfully.");
    }
  };

  return (
    <div className="admin-member-management-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast-banner">
          <FiCheck /> {toastMessage}
        </div>
      )}

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
                <th className="actions-header-cell">Actions</th>
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
                      <td className="admin-actions-cell">
                        <div className="admin-actions-group">
                          {/* View Button */}
                          <button
                            type="button"
                            className="admin-action-btn admin-view-btn"
                            onClick={() => setViewingMember(m)}
                            title="View Member Details"
                          >
                            <FiEye />
                            <span>View</span>
                          </button>

                          {/* Edit Button */}
                          <button
                            type="button"
                            className="admin-action-btn admin-edit-btn"
                            onClick={() => setEditingMember({ ...m })}
                            title="Edit Member"
                          >
                            <FiEdit2 />
                            <span>Edit</span>
                          </button>

                          {/* Dropdown Options */}
                          <div className="admin-dropdown-menu-wrapper">
                            <button
                              type="button"
                              className="admin-action-btn admin-more-btn"
                              onClick={() =>
                                setOpenMenuId(
                                  openMenuId === m.id ? null : m.id
                                )
                              }
                              title="More Options"
                            >
                              <FiChevronDown />
                            </button>

                            {openMenuId === m.id && (
                              <div className="admin-row-dropdown-popover">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleToggleStatus(m.id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  {m.membershipStatus === "Active"
                                    ? "Mark Expired"
                                    : "Mark Active"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleQuickRenew(m.id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  Quick Renew (+30d)
                                </button>
                                <button
                                  type="button"
                                  className="popover-danger-btn"
                                  onClick={() => {
                                    handleDeleteMember(m.id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  Delete Member
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="admin-no-results-cell">
                    No registered members found matching your search and
                    filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW MEMBER MODAL */}
      {viewingMember && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setViewingMember(null)}
        >
          <div
            className="admin-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-top">
              <div className="admin-modal-title-wrap">
                <span className="admin-modal-id-badge">
                  {viewingMember.id}
                </span>
                <h2>{viewingMember.name}</h2>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setViewingMember(null)}
              >
                <FiX />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-modal-info-grid">
                <div className="admin-modal-info-item">
                  <span className="info-label">
                    <FiMail /> Email Address
                  </span>
                  <span className="info-val">{viewingMember.email}</span>
                </div>
                <div className="admin-modal-info-item">
                  <span className="info-label">
                    <FiPhone /> Mobile Number
                  </span>
                  <span className="info-val">{viewingMember.phone}</span>
                </div>
                <div className="admin-modal-info-item">
                  <span className="info-label">
                    <FiActivity /> Fitness Goal
                  </span>
                  <span className="info-val">{viewingMember.fitnessGoal}</span>
                </div>
                <div className="admin-modal-info-item">
                  <span className="info-label">
                    <FiCoffee /> Dietary Preference
                  </span>
                  <span className="info-val">
                    {viewingMember.dietaryPreference}
                  </span>
                </div>
                <div className="admin-modal-info-item">
                  <span className="info-label">
                    <FiAward /> Membership Tier
                  </span>
                  <span className="info-val">
                    {viewingMember.membershipPlan}
                  </span>
                </div>
                <div className="admin-modal-info-item">
                  <span className="info-label">
                    <FiCalendar /> Expiry Date
                  </span>
                  <span className="info-val">{viewingMember.expiryDate}</span>
                </div>
              </div>

              <div className="admin-modal-status-highlight">
                <span className="status-highlight-label">Current Status:</span>
                <span
                  className={`member-status-indicator ${
                    viewingMember.membershipStatus === "Active"
                      ? "status-active"
                      : "status-expired"
                  }`}
                >
                  {viewingMember.membershipStatus === "Active" ? (
                    <FiCheckCircle />
                  ) : (
                    <FiXCircle />
                  )}
                  <strong>{viewingMember.membershipStatus}</strong>
                </span>
              </div>
            </div>

            <div className="admin-modal-foot">
              <button
                type="button"
                className="admin-modal-secondary-btn"
                onClick={() => setViewingMember(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="admin-modal-primary-btn"
                onClick={() => {
                  setEditingMember({ ...viewingMember });
                  setViewingMember(null);
                }}
              >
                <FiEdit2 /> Edit Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MEMBER MODAL */}
      {editingMember && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setEditingMember(null)}
        >
          <div
            className="admin-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-top">
              <div className="admin-modal-title-wrap">
                <span className="admin-modal-id-badge">
                  {editingMember.id}
                </span>
                <h2>Edit Member Details</h2>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setEditingMember(null)}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="admin-modal-body">
                <div className="admin-modal-edit-fields">
                  <div className="admin-edit-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={editingMember.name}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="admin-edit-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={editingMember.email}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="admin-edit-field">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      value={editingMember.phone}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="admin-edit-field">
                    <label>Fitness Goal</label>
                    <select
                      value={editingMember.fitnessGoal}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          fitnessGoal: e.target.value,
                        })
                      }
                    >
                      <option value="Muscle Building">Muscle Building</option>
                      <option value="Fat Loss">Fat Loss</option>
                      <option value="Strength Training">Strength Training</option>
                      <option value="Weight Loss">Weight Loss</option>
                    </select>
                  </div>

                  <div className="admin-edit-field">
                    <label>Dietary Preference</label>
                    <select
                      value={editingMember.dietaryPreference}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          dietaryPreference: e.target.value,
                        })
                      }
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                    </select>
                  </div>

                  <div className="admin-edit-field">
                    <label>Membership Plan</label>
                    <select
                      value={editingMember.membershipPlan}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          membershipPlan: e.target.value,
                        })
                      }
                    >
                      <option value="Monthly - 1 Month">Monthly - 1 Month</option>
                      <option value="Quarterly - 3 Months">
                        Quarterly - 3 Months
                      </option>
                      <option value="Annual - 12 Months">
                        Annual - 12 Months
                      </option>
                    </select>
                  </div>

                  <div className="admin-edit-field">
                    <label>Membership Status</label>
                    <select
                      value={editingMember.membershipStatus}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          membershipStatus: e.target.value,
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>

                  <div className="admin-edit-field">
                    <label>Expiry Date</label>
                    <input
                      type="date"
                      value={editingMember.expiryDate}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          expiryDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="admin-modal-foot">
                <button
                  type="button"
                  className="admin-modal-secondary-btn"
                  onClick={() => setEditingMember(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-modal-primary-btn">
                  <FiCheck /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMembers;
