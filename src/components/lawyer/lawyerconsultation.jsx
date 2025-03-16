"use client"

import React, { useState, useEffect } from "react"
import { toast, Toaster } from "react-hot-toast"
import axios from "axios"
import { useSearchParams } from "next/navigation"

export default function ConsultationDetail({ params }) {
  const searchParams = useSearchParams()
  const consultationId = params.id
  const clientType = searchParams.get("type")
  
  const [consultation, setConsultation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState("")
  
  useEffect(() => {
    if (consultationId && clientType) {
      fetchConsultationDetails()
    }
  }, [consultationId, clientType])
  
  const fetchConsultationDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/lawyer/consultations/${consultationId}?clientType=${clientType}`)
      setConsultation(response.data)
      if (response.data.lawyerNotes) {
        setNotes(response.data.lawyerNotes)
      }
    } catch (error) {
      toast.error("Failed to fetch consultation details")
      console.error("Error fetching consultation details:", error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.patch(`/api/lawyer/consultations/${consultationId}`, {
        clientType,
        status: newStatus
      })
      
      if (response.data.success) {
        toast.success(`Consultation ${newStatus} successfully`)
        fetchConsultationDetails()
      }
    } catch (error) {
      toast.error("Failed to update consultation status")
      console.error("Error updating consultation:", error)
    }
  }
  
  const saveNotes = async () => {
    try {
      const response = await axios.patch(`/api/lawyer/consultations/${consultationId}`, {
        clientType,
        lawyerNotes: notes
      })
      
      if (response.data.success) {
        toast.success("Notes saved successfully")
      }
    } catch (error) {
      toast.error("Failed to save notes")
      console.error("Error saving notes:", error)
    }
  }
  
  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading consultation details...</p>
      </div>
    )
  }
  
  if (!consultation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Consultation not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-center" />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Consultation Details</h1>
          <button 
            onClick={() => window.location.href = "/lawyer/dashboard"}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {consultation.consultationRef}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                consultation.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                consultation.status === "approved" ? "bg-green-100 text-green-800" :
                consultation.status === "completed" ? "bg-blue-100 text-blue-800" :
                "bg-red-100 text-red-800"
              }`}>
                {consultation.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Client Information</h3>
                <div className="space-y-2">
                  {consultation.clientType === "Individual" ? (
                    <p><span className="font-medium">Name:</span> {consultation.name}</p>
                  ) : (
                    <>
                      <p><span className="font-medium">Firm Name:</span> {consultation.firmName}</p>
                      <p><span className="font-medium">Contact Person:</span> {consultation.contactPerson}</p>
                      <p><span className="font-medium">Company Size:</span> {consultation.companySize} employees</p>
                      {consultation.gstNumber && (
                        <p><span className="font-medium">GST Number:</span> {consultation.gstNumber}</p>
                      )}
                      {consultation.registrationNumber && (
                        <p><span className="font-medium">Registration Number:</span> {consultation.registrationNumber}</p>
                      )}
                    </>
                  )}
                  <p><span className="font-medium">Email:</span> {consultation.email}</p>
                  <p><span className="font-medium">Phone:</span> {consultation.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Consultation Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Type:</span> {consultation.consultationType}</p>
                  <p><span className="font-medium">Preferred Date:</span> {formatDate(consultation.preferredDate)}</p>
                  <p><span className="font-medium">Created:</span> {formatDate(consultation.createdAt)}</p>
                  <p><span className="font-medium">Last Updated:</span> {formatDate(consultation.updatedAt)}</p>
                </div>
              </div>
            </div>
            
            {consultation.message && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Client Message</h3>
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-700">{consultation.message}</p>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Lawyer Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add your notes about this consultation here..."
              ></textarea>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={saveNotes}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Save Notes
                </button>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Actions</h3>
              <div className="flex space-x-3">
                {consultation.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange("approved")}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                    >
                      Approve Consultation
                    </button>
                    <button
                      onClick={() => handleStatusChange("cancelled")}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                    >
                      Reject Consultation
                    </button>
                  </>
                )}
                
                {consultation.status === "approved" && (
                  <button
                    onClick={() => handleStatusChange("completed")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                  >
                    Mark as Completed
                  </button>
                )}
                
                {(consultation.status === "approved" || consultation.status === "completed") && (
                  <button
                    onClick={() => window.open(`mailto:${consultation.email}`)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
                  >
                    Contact Client
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}