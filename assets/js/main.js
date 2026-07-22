// Quantum OPS Elite - Master API Controller
const API_URL = "https://script.google.com/macros/s/AKfycbzVMhcd0iINvnGEJbRyuxG1CwKMFVs7UvHj_eHpWTf9L_WxOVXdyxFKe0Ws9bv8pbKY/exec";

// Local storage session helpers
const getSession = () => JSON.parse(localStorage.getItem("quantum_user") || "{}");
const setSession = (userData) => localStorage.setItem("quantum_user", JSON.stringify(userData));

/**
 * Universal Fetch API Helper
 */
async function apiCall(action, payload = {}) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, payload })
    });
    return await response.json();
  } catch (error) {
    console.error(`[Quantum API Error - ${action}]:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch All Dashboard Data
 */
async function loadDashboard() {
  const session = getSession();
  if (!session.companyId) {
    console.warn("No active company ID found. Please log in.");
    return;
  }

  const res = await apiCall("GET_DASHBOARD_DATA", { companyId: session.companyId });
  if (res.success) {
    console.log("Dashboard Data Loaded:", res.data);
    // You can now populate your UI elements with res.data
  }
}
