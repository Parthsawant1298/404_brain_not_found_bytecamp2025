"use client"

import axios from "axios";
import { Calendar, Clock, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LawyerDashboard() {
  const router = useRouter();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("pending");
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState({
    date: "",
    time: "",
    duration: 60,
    platform: "Google Meet",
    meetLink: ""
  });

  // Fetch consultations on component mount
  useEffect(() => {
    fetchConsultations();
  }, []);

  // Fetch consultations based on selected tab
  useEffect(() => {
    fetchConsultations();
  }, [selectedTab]);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/lawyer/consultations?status=${selectedTab}`);
      setConsultations(Array.isArray(response.data) ? response.data : (response.data.data || []));
    } catch (error) {
      toast.error("Failed to fetch consultations");
      console.error("Error fetching consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle status change (approve/reject/complete)
  const handleStatusChange = async (id, clientType, newStatus) => {
    try {
      const response = await axios.patch(`/api/lawyer/consultations/${id}`, {
        clientType,
        status: newStatus
      });
      
      if (response.data.success) {
        toast.success(`Consultation ${newStatus} successfully`);
        fetchConsultations();
      }
    } catch (error) {
      toast.error("Failed to update consultation status");
      console.error("Error updating consultation:", error);
    }
  };

  // Open meeting modal
  const openMeetingModal = (consultation) => {
    setSelectedConsultation(consultation);
    
    // Pre-populate with a date 3 days from now
    const suggestedDate = new Date();
    suggestedDate.setDate(suggestedDate.getDate() + 3);
    
    setMeetingDetails({
      date: suggestedDate.toISOString().split('T')[0],
      time: "14:00", // Default to 2:00 PM
      duration: 60,
      platform: "Google Meet",
      meetLink: ""
    });
    
    setShowMeetingModal(true);
  };

  // Handle meeting input changes
  const handleMeetingInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format date and time for email display
  const formatDateForEmail = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTimeForEmail = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString;
    }
  };

  // Schedule meeting and send email notification using Web3Forms
  const scheduleVirtualMeeting = async (e) => {
    e.preventDefault();
    
    if (!meetingDetails.meetLink) {
      toast.error("Please enter a Google Meet link");
      return;
    }
    
    try {
      // Get client information
      const clientName = selectedConsultation.clientType === "Individual" 
        ? selectedConsultation.name 
        : `${selectedConsultation.firmName} (${selectedConsultation.contactPerson})`;
      
      // Get client email from consultation data
      const clientEmail = selectedConsultation.email;
      
      if (!clientEmail) {
        toast.error("Client email not found");
        return;
      }
      
      // Create email message with meeting details
      const emailMessage = `
Dear ${clientName},

I'm writing to confirm our upcoming legal consultation.

Meeting Details:
- Date: ${formatDateForEmail(meetingDetails.date)}
- Time: ${formatTimeForEmail(meetingDetails.time)}
- Duration: ${meetingDetails.duration} minutes
- Platform: Google Meet
- Meeting Link: ${meetingDetails.meetLink}

Please join the meeting by clicking on the link above at the scheduled time.

If you need to reschedule or have any questions, please reply to this email.

Best regards,
Your Legal Team
      `;
      
      // Send email notification using Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "cc5d4001-c283-4af7-b38f-2a16932a23d9",
          name: "Legal Consultation Scheduling",
          email: clientEmail,
          subject: `Legal Consultation: ${selectedConsultation.consultationRef}`,
          message: emailMessage,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Save meeting details to the consultation
        await axios.patch(`/api/lawyer/consultations/${selectedConsultation._id}`, {
          clientType: selectedConsultation.clientType,
          virtualMeeting: {
            date: `${meetingDetails.date}T${meetingDetails.time}:00`,
            duration: meetingDetails.duration,
            platform: meetingDetails.platform,
            meetLink: meetingDetails.meetLink
          }
        });
        
        toast.success("Meeting scheduled and email sent successfully");
        setShowMeetingModal(false);
        fetchConsultations();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to schedule meeting");
      console.error("Error scheduling meeting:", error);
    }
  };

  // Filter consultations by client type
  const filteredConsultations = filter === "all" 
    ? consultations 
    : consultations.filter(consultation => consultation.clientType === filter);

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Lawyer Dashboard</h1>

        {/* Tabs for consultation status */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {["pending", "approved", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 capitalize font-medium text-sm ${
                selectedTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter by client type */}
        <div className="mb-6 flex items-center">
          <span className="mr-3 text-sm font-medium">Filter by:</span>
          <div className="flex space-x-2">
            {["all", "Individual", "Firm"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 text-sm rounded-md ${
                  filter === type
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type === "all" ? "All" : type}
              </button>
            ))}
          </div>
        </div>

        {/* Consultations list */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-500">Loading consultations...</div>
          ) : filteredConsultations.length === 0 ? (
            <div className="py-20 text-center text-gray-500">No {selectedTab} consultations found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preferred Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Virtual Meeting
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredConsultations.map((consultation) => (
                    <tr key={consultation._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {consultation.consultationRef}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {consultation.clientType === "Individual" 
                          ? consultation.name 
                          : `${consultation.firmName} (${consultation.contactPerson})`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {consultation.consultationType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(consultation.preferredDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {consultation.virtualMeeting ? (
                          <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            <Video className="h-3 w-3 mr-1" />
                            Scheduled
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Not scheduled
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(consultation.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {selectedTab === "pending" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(consultation._id, consultation.clientType, "approved")}
                                className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-md"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleStatusChange(consultation._id, consultation.clientType, "cancelled")}
                                className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {selectedTab === "approved" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(consultation._id, consultation.clientType, "completed")}
                                className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => openMeetingModal(consultation)}
                                className="text-purple-600 hover:text-purple-900 bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded-md flex items-center"
                              >
                                <Video className="h-4 w-4 mr-1" />
                                Schedule
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Virtual Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Video className="h-5 w-5 mr-2 text-blue-500" />
              Schedule Virtual Meeting
            </h2>
            
            <form onSubmit={scheduleVirtualMeeting}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <div className="text-gray-900 font-medium">
                  {selectedConsultation.clientType === "Individual" 
                    ? selectedConsultation.name 
                    : `${selectedConsultation.firmName} (${selectedConsultation.contactPerson})`}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Email: {selectedConsultation.email || "Not available"}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Date</label>
                <div className="relative">
                  <Calendar className="h-5 w-5 absolute top-3 left-3 text-gray-400" />
                  <input 
                    type="date" 
                    name="date"
                    value={meetingDetails.date}
                    onChange={handleMeetingInputChange}
                    className="pl-10 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Time</label>
                <div className="relative">
                  <Clock className="h-5 w-5 absolute top-3 left-3 text-gray-400" />
                  <input 
                    type="time" 
                    name="time"
                    value={meetingDetails.time}
                    onChange={handleMeetingInputChange}
                    className="pl-10 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <select
                  name="duration"
                  value={meetingDetails.duration}
                  onChange={handleMeetingInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>120 minutes</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Meet Link</label>  
                <input 
                  type="url" 
                  name="meetLink"
                  value={meetingDetails.meetLink}
                  onChange={handleMeetingInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter the meeting link"
                  required
                />
                <button 
                  type="button"
                  onClick={() => window.open('https://meet.google.com/new', '_blank')} 
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Google Meet
                </button>
                <p className="mt-1 text-xs text-gray-500">
                  Create a meeting in Google Meet and paste the link above
                </p>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMeetingModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Schedule & Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}