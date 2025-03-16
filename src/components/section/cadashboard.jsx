"use client"

import React, { useState, useEffect } from "react"
import { toast, Toaster } from "react-hot-toast"
import axios from "axios"

export default function CADashboard() {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("pending")

  // Fetch consultations on component mount
  useEffect(() => {
    fetchConsultations()
  }, [])

  // Fetch consultations based on selected tab
  useEffect(() => {
    fetchConsultations()
  }, [selectedTab])

  const fetchConsultations = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/ca/consultations?status=${selectedTab}`)
      setConsultations(response.data)
    } catch (error) {
      toast.error("Failed to fetch consultations")
      console.error("Error fetching consultations:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle status change (approve/reject/complete)
  const handleStatusChange = async (id, clientType, newStatus) => {
    try {
      const response = await axios.patch(`/api/ca/consultations/${id}`, {
        clientType,
        status: newStatus
      })
      
      if (response.data.success) {
        toast.success(`Consultation ${newStatus} successfully`)
        fetchConsultations()
      }
    } catch (error) {
      toast.error("Failed to update consultation status")
      console.error("Error updating consultation:", error)
    }
  }

  // Filter consultations by client type
  const filteredConsultations = filter === "all" 
    ? consultations 
    : consultations.filter(consultation => consultation.clientType === filter)

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">CA Dashboard</h1>

        {/* Tabs for consultation status */}
        <div className="flex border-b border-gray-200 mb-6">
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
                          <button
                            onClick={() => handleStatusChange(consultation._id, consultation.clientType, "completed")}
                            className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md"
                          >
                            Mark Completed
                          </button>
                        )}
                        <button
                          onClick={() => window.location.href = `/ca/consultation/${consultation._id}?type=${consultation.clientType}`}
                          className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}