"use client"
import { useState } from "react"

// Using the existing component definitions from the provided code
const LoadingSpinner = () => (
  <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
)

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>{children}</div>
)

const CardContent = ({ children, className = "" }) => <div className={`px-6 py-4 ${className}`}>{children}</div>

const Button = ({ children, onClick, disabled, variant = "primary", className = "" }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm focus:outline-none"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-50",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} disabled:cursor-not-allowed`}
    >
      {disabled && variant === "primary" ? <LoadingSpinner /> : children}
    </button>
  )
}

const Input = ({ label, value, onChange, placeholder, className = "" }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
      placeholder-gray-400 ${className}`}
    />
  </div>
)

const TextArea = ({ label, value, onChange, placeholder, rows = 4, className = "" }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
      placeholder-gray-400 ${className}`}
    />
  </div>
)

const Tabs = ({ tabs, activeTab, onTabChange }) => (
  <div className="border-b border-gray-200 mb-6">
    <nav className="-mb-px flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`py-2 px-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab.id
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  </div>
)

const downloadDocument = (content, templateName, docType) => {
  if (!content) {
    throw new Error(`No ${docType} document content to download`)
  }

  const timestamp = new Date().toISOString().split('T')[0]
  const fileName = `${templateName.toLowerCase()}-${docType}-${timestamp}.txt`
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function LegalDocumentGenerator() {
  const [loading, setLoading] = useState(false)
  const [document, setDocument] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [formData, setFormData] = useState({})
  const [aiInstructions, setAiInstructions] = useState("")
  const [aiTemperature, setAiTemperature] = useState(0.7)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("generate")
  const [enhancedDocument, setEnhancedDocument] = useState("")

  // Template definitions remain the same
  const TEMPLATES = {
    SERVICE_AGREEMENT: {
      name: "Service Agreement",
      fields: [
        "SERVICE_PROVIDER_NAME",
        "SERVICE_PROVIDER_ADDRESS",
        "CLIENT_NAME",
        "CLIENT_ADDRESS", 
        "DATE",
        "SERVICES",
        "ADDITIONAL_SERVICES_1",
        "ADDITIONAL_SERVICES_2",
        "AMOUNT",
        "TOTAL_COST",
        "AMOUNT_DUE_SIGNING",
        "AMOUNT_DUE_COMPLETION",
        "INVOICE_PERIOD",
        "PAYMENT_DAYS",
        "PAYMENT_METHOD_1",
        "PAYMENT_METHOD_2",
        "PAYMENT_METHOD_3",
        "PAYMENT_METHOD_4",
        "TERM_LENGTH",
        "NOTICE_PERIOD",
        "GOVERNING_LAW",
        "CUSTOMER_NOTICE_ADDRESS_1",
        "CUSTOMER_NOTICE_ADDRESS_2",
        "CUSTOMER_NOTICE_ADDRESS_3",
        "CUSTOMER_NOTICE_ADDRESS_4",
        "PROVIDER_NOTICE_ADDRESS_1",
        "PROVIDER_NOTICE_ADDRESS_2",
        "PROVIDER_NOTICE_ADDRESS_3",
        "PROVIDER_NOTICE_ADDRESS_4",
        "CUSTOMER_NAME",
        "PROVIDER_NAME",
        "CUSTOMER_SIGNING_DATE",
        "PROVIDER_SIGNING_DATE"
      ],
    },
    EMPLOYMENT_AGREEMENT: {
      name: "Employment Agreement",
      fields: [
        "COMPANY_NAME",
        "COMPANY_ADDRESS",
        "EMPLOYEE_NAME",
        "GUARDIAN_NAME",
        "AGE",
        "EMPLOYEE_ADDRESS",
        "DAY",
        "MONTH",
        "YEAR",
        "POSITION",
        "PROBATION_DAYS_NUM",
        "PROBATION_DAYS_WORD",
        "EMPLOYEE_RESPONSIBILITIES",
        "SALARY_AMOUNT",
        "CASUAL_LEAVE_DAYS_NUM",
        "CASUAL_LEAVE_DAYS_WORD",
        "SICK_LEAVE_DAYS_NUM",
        "SICK_LEAVE_DAYS_WORD",
        "PUBLIC_HOLIDAYS_NUM",
        "PUBLIC_HOLIDAYS_WORD",
        "CONFIDENTIAL_INFORMATION_SPECIFICS",
        "COMPETING_BUSINESS_DESCRIPTION",
        "TERMINATION_NOTICE_MONTHS_NUM",
        "TERMINATION_NOTICE_MONTHS_WORD",
        "RESIGNATION_NOTICE_MONTHS_NUM",
        "RESIGNATION_NOTICE_MONTHS_WORD",
        "EMPLOYEE_NOTICE_ADDRESS",
        "EMPLOYER_NOTICE_ADDRESS",
        "GOVERNING_LAW_STATE",
        "GOVERNING_LAW_COUNTRY",
        "JURISDICTION_LOCATION",
        "JURISDICTION_COUNTRY",
        "EMPLOYEE_SIGNATORY_NAME",
        "EMPLOYEE_DESIGNATION",
        "EMPLOYER_REPRESENTATIVE_NAME"
      ],
    },
    
    RENTAL_AGREEMENT: {
      name: "Rental Agreement",
      fields: [
        "DATE",
        "LANDLORD_NAME",
        "LANDLORD_FATHER_NAME",
        "LANDLORD_ADDRESS",
        "TENANT_COMPANY_NAME",
        "DIRECTOR_NAME",
        "PROPERTY_NUMBER",
        "PROPERTY_ADDRESS",
        "RENT_AMOUNT",
        "LEASE_START_DATE",
        "SIGNING_PLACE"
      ],
    },
    POWER_OF_ATTORNEY: {
      name: "Power of Attorney",
      fields: [
        "PRINCIPAL_NAME", 
        "PRINCIPAL_ADDRESS", 
        "ATTORNEY_NAME", 
        "ATTORNEY_ADDRESS",
        "ALTERNATE_AGENT_NAME", 
        "ALTERNATE_AGENT_ADDRESS",
        "SUBSTITUTE_AGENT_NAME",
        "SUBSTITUTE_AGENT_ADDRESS"
      ],
    },
    LAST_WILL_AND_TESTAMENT: {
      name: "Last Will and Testament",
      fields: [
        "Testator",
        "City",
        "State",
        "MARRIED_TO",
        "CHILDREN_NAMES",
        "Executor",
        "Successor_Executor",
        "Backup_successor_Executor",
        "EXECUTOR_COMPENSATION_AMOUNT",
        "EXECUTOR_PAYMENT_METHOD",
        "SPECIAL_POWERS",
        "NAME_1",
        "PROPERTY_1",
        "NAME_2",
        "PROPERTY_2",
        "NAME_3",
        "PROPERTY_3",
        "MONEY_NAME_1",
        "MONEY_AMOUNT_1",
        "MONEY_NAME_2",
        "MONEY_AMOUNT_2",
        "MONEY_NAME_3",
        "MONEY_AMOUNT_3",
        "PERCENTAGE_NAME_1",
        "PERCENTAGE_AMOUNT_1",
        "PERCENTAGE_NAME_2",
        "PERCENTAGE_AMOUNT_2",
        "PERCENTAGE_NAME_3",
        "PERCENTAGE_AMOUNT_3",
        "NON_PROFIT_NAME",
        "ADDRESS",
        "DONATION_AMOUNT",
        "HONOREE_NAME",
        "SIGNING_DAY",
        "SIGNING_MONTH",
        "SIGNING_YEAR",
        "FIRST_WITNESS_NAME",
        "FIRST_WITNESS_ADDRESS",
        "SECOND_WITNESS_NAME",
        "SECOND_WITNESS_ADDRESS"
      ],
    },
    'NON_DISCLOSURE_AGREEMENT': {
  name: "Non-Disclosure Agreement",
  fields: [
    "AGREEMENT_DAY",
    "AGREEMENT_MONTH",
    "AGREEMENT_YEAR",
    "PARTY_1_NAME",
    "PARTY_1_ADDRESS",
    "PARTY_1_SHORT_NAME",
    "COMPANY_NAME",
    "COMPANY_ADDRESS",
    "PROPOSED_TRANSACTION",
    "SURVIVAL_YEARS_AFTER_TERMINATION",
    "SURVIVAL_YEARS_AFTER_EXPIRY",
    "PARTY_1_SIGNATORY_NAME",
    "PARTY_1_SIGNATORY_DESIGNATION",
    "PARTY_1_SIGNING_PLACE",
    "PARTY_1_SIGNING_DATE",
    "PARTY_1_SECOND_SIGNATORY_NAME",
    "PARTY_1_SECOND_SIGNATORY_DESIGNATION",
    "PARTY_1_SECOND_SIGNING_PLACE",
    "PARTY_1_SECOND_SIGNING_DATE",
    "COMPANY_SIGNATORY_NAME",
    "COMPANY_SIGNATORY_DESIGNATION",
    "COMPANY_SIGNING_PLACE",
    "COMPANY_SIGNING_DATE",
    "COMPANY_SECOND_SIGNATORY_NAME",
    "COMPANY_SECOND_SIGNATORY_DESIGNATION",
    "COMPANY_SECOND_SIGNING_PLACE",
    "COMPANY_SECOND_SIGNING_DATE"
  ],
  },
  'LEGAL_NOTICE': {
  name: "Legal Notice",
  fields: [
    "ADVOCATE_NAME",
    "ADVOCATE_ADDRESS",
    "ADVOCATE_CONTACT",
    "ADVOCATE_EMAIL",
    "RECIPIENT_NAME",
    "RECIPIENT_ADDRESS",
    "NOTICE_DATE",
    "CLIENT_NAME",
    "CLIENT_FATHER_NAME",
    "CLIENT_ADDRESS",
    "MARRIAGE_DAY",
    "MARRIAGE_MONTH",
    "MATRIMONIAL_HOME",
    "NOTICE_TYPE", // Can be either "MUTUAL_CONSENT" or "DESERTION"
    // For desertion template only
    "LEFT_DATE",
    "FATHERS_HOUSE_ADDRESS",
    "FIRST_VISIT_LOCATION",
    "LAST_VISIT_LOCATION",
    "LAST_VISIT_DATE"
  ],
},
}

  const dummyData = {
    SERVICE_AGREEMENT: {
      SERVICE_PROVIDER_NAME: "ABC Consulting LLC",
      SERVICE_PROVIDER_ADDRESS: "123 Business Avenue, Suite 400, San Francisco, CA 94103",
      CLIENT_NAME: "XYZ Corp",
      CLIENT_ADDRESS: "456 Enterprise Drive, Chicago, IL 60611",
      DATE: "March 15, 2025",
      SERVICES: "IT consulting and cloud infrastructure development",
      ADDITIONAL_SERVICES_1: "Software implementation and integration services",
      ADDITIONAL_SERVICES_2: "Technical support and maintenance",
      AMOUNT: "$45,000",
      TOTAL_COST: "$45,000",
      AMOUNT_DUE_SIGNING: "$22,500",
      AMOUNT_DUE_COMPLETION: "$22,500",
      INVOICE_PERIOD: "30",
      PAYMENT_DAYS: "15",
      PAYMENT_METHOD_1: "Wire transfer to ABC Consulting LLC, Bank of America Account #7654321",
      PAYMENT_METHOD_2: "Corporate check payable to ABC Consulting LLC",
      PAYMENT_METHOD_3: "ACH transfer using the provided account details",
      PAYMENT_METHOD_4: "Credit card payments accepted with 3% processing fee",
      TERM_LENGTH: "6 months",
      NOTICE_PERIOD: "30",
      GOVERNING_LAW: "California",
      CUSTOMER_NOTICE_ADDRESS_1: "XYZ Corp",
      CUSTOMER_NOTICE_ADDRESS_2: "Attn: Legal Department",
      CUSTOMER_NOTICE_ADDRESS_3: "456 Enterprise Drive",
      CUSTOMER_NOTICE_ADDRESS_4: "Chicago, IL 60611",
      PROVIDER_NOTICE_ADDRESS_1: "ABC Consulting LLC",
      PROVIDER_NOTICE_ADDRESS_2: "Attn: Contracts Manager",
      PROVIDER_NOTICE_ADDRESS_3: "123 Business Avenue, Suite 400",
      PROVIDER_NOTICE_ADDRESS_4: "San Francisco, CA 94103",
      CUSTOMER_NAME: "Sarah Johnson, Chief Technology Officer",
      PROVIDER_NAME: "Michael Chen, Managing Director",
      CUSTOMER_SIGNING_DATE: "March 15, 2025",
      PROVIDER_SIGNING_DATE: "March 15, 2025"
    },
  
    EMPLOYMENT_AGREEMENT: {
      COMPANY_NAME: "Tech Innovations Inc.",
      COMPANY_ADDRESS: "1250 Silicon Valley Boulevard, Suite 300, Palo Alto, CA 94304",
      EMPLOYEE_NAME: "Jane Doe",
      GUARDIAN_NAME: "Robert Doe",
      AGE: "32",
      EMPLOYEE_ADDRESS: "452 Oak Tree Lane, Apartment 8B, San Jose, CA 95128",
      DAY: "15th",
      MONTH: "March",
      YEAR: "2025",
      POSITION: "Senior Software Engineer",
      PROBATION_DAYS_NUM: "90",
      PROBATION_DAYS_WORD: "ninety",
      EMPLOYEE_RESPONSIBILITIES: "- Lead the backend development team for cloud infrastructure projects\n- Architect scalable software solutions for enterprise clients\n- Perform code reviews and ensure code quality standards\n- Mentor junior developers and provide technical guidance\n- Participate in Agile development cycles and sprint planning\n- Collaborate with product managers to define technical requirements",
      SALARY_AMOUNT: "$120,000",
      CASUAL_LEAVE_DAYS_NUM: "12",
      CASUAL_LEAVE_DAYS_WORD: "twelve",
      SICK_LEAVE_DAYS_NUM: "8",
      SICK_LEAVE_DAYS_WORD: "eight",
      PUBLIC_HOLIDAYS_NUM: "10",
      PUBLIC_HOLIDAYS_WORD: "ten",
      CONFIDENTIAL_INFORMATION_SPECIFICS: "proprietary algorithms, client information, system architecture documents, unreleased product specifications, and internal development roadmaps",
      COMPETING_BUSINESS_DESCRIPTION: "cloud software development, enterprise solution architecture, or AI-driven analytics platforms",
      TERMINATION_NOTICE_MONTHS_NUM: "2",
      TERMINATION_NOTICE_MONTHS_WORD: "two",
      RESIGNATION_NOTICE_MONTHS_NUM: "1",
      RESIGNATION_NOTICE_MONTHS_WORD: "one",
      EMPLOYEE_NOTICE_ADDRESS: "452 Oak Tree Lane, Apartment 8B, San Jose, CA 95128",
      EMPLOYER_NOTICE_ADDRESS: "Tech Innovations Inc., 1250 Silicon Valley Boulevard, Suite 300, Palo Alto, CA 94304, Attn: Human Resources Department",
      GOVERNING_LAW_STATE: "California",
      GOVERNING_LAW_COUNTRY: "United States of America",
      JURISDICTION_LOCATION: "Santa Clara County",
      JURISDICTION_COUNTRY: "United States of America",
      EMPLOYEE_SIGNATORY_NAME: "Jane Doe",
      EMPLOYEE_DESIGNATION: "Senior Software Engineer",
      EMPLOYER_REPRESENTATIVE_NAME: "Michael Chen, Chief Technology Officer"
    },
    RENTAL_AGREEMENT: {
      DATE: "March 15, 2025",
      LANDLORD_NAME: "John Smith",
      LANDLORD_FATHER_NAME: "Robert Smith",
      LANDLORD_ADDRESS: "456 Landlord Street, Cityville, ST 54321",
      TENANT_COMPANY_NAME: "Tech Innovations Inc.",
      DIRECTOR_NAME: "Sarah Johnson",
      PROPERTY_NUMBER: "A-123",
      PROPERTY_ADDRESS: "789 Office Boulevard, Suite 500, Businesstown, ST 98765",
      RENT_AMOUNT: "75,000",
      LEASE_START_DATE: "April 1, 2025",
      SIGNING_PLACE: "Cityville"
    },
    POWER_OF_ATTORNEY: {
      PRINCIPAL_NAME: "Alice Brown",
      PRINCIPAL_ADDRESS: "456 Oak Ave, Somewhere, ST 67890",
      ATTORNEY_NAME: "Robert Green",
      ATTORNEY_ADDRESS: "789 Maple Lane, Elsewhere, ST 12345",
      ALTERNATE_AGENT_NAME: "Sarah Johnson",
      ALTERNATE_AGENT_ADDRESS: "321 Pine Street, Anytown, ST 54321",
      SUBSTITUTE_AGENT_NAME: "Daniel Wilson",
      SUBSTITUTE_AGENT_ADDRESS: "654 Cedar Road, Somecity, ST 98765"
    },
    LAST_WILL_AND_TESTAMENT: {
      Testator: "James Michael Wilson",
      City: "Boulder",
      State: "Colorado",
      MARRIED_TO: "Elizabeth Anne Wilson",
      CHILDREN_NAMES: "Nathan James Wilson (age 27), Sarah Elizabeth Wilson (age 24), and Emma Grace Wilson (age 19)",
      Executor: "Elizabeth Anne Wilson",
      Successor_Executor: "Nathan James Wilson",
      Backup_successor_Executor: "Andrew Thomas Parker",
      EXECUTOR_COMPENSATION_AMOUNT: "10,000",
      EXECUTOR_PAYMENT_METHOD: "paying from the principal of my residuary estate according to all applicable laws",
      SPECIAL_POWERS: "authority to sell my real estate without court approval if deemed necessary for the proper administration of my estate",
      NAME_1: "Elizabeth Anne Wilson",
      PROPERTY_1: "all personal effects, jewelry, clothing, furniture, and household items located in our primary residence",
      NAME_2: "Nathan James Wilson",
      PROPERTY_2: "my collection of rare books, my grandfather's pocket watch, and all fishing equipment",
      NAME_3: "Sarah Elizabeth Wilson",
      PROPERTY_3: "my collection of artwork, family photographs, and my mother's antique china set",
      MONEY_NAME_1: "Emma Grace Wilson",
      MONEY_AMOUNT_1: "25,000",
      MONEY_NAME_2: "Boulder Community Hospital",
      MONEY_AMOUNT_2: "15,000",
      MONEY_NAME_3: "University of Colorado Scholarship Fund",
      MONEY_AMOUNT_3: "10,000",
      PERCENTAGE_NAME_1: "Elizabeth Anne Wilson",
      PERCENTAGE_AMOUNT_1: "50",
      PERCENTAGE_NAME_2: "Nathan James Wilson",
      PERCENTAGE_AMOUNT_2: "25",
      PERCENTAGE_NAME_3: "Sarah Elizabeth Wilson",
      PERCENTAGE_AMOUNT_3: "25",
      NON_PROFIT_NAME: "Rocky Mountain Conservancy",
      ADDRESS: "1895 Fall River Road, Estes Park, CO 80517",
      DONATION_AMOUNT: "20,000",
      HONOREE_NAME: "Richard Edward Wilson",
      SIGNING_DAY: "15th",
      SIGNING_MONTH: "March",
      SIGNING_YEAR: "2025",
      FIRST_WITNESS_NAME: "Margaret Jean Thompson",
      FIRST_WITNESS_ADDRESS: "2380 Pine Street, Boulder, CO 80302",
      SECOND_WITNESS_NAME: "Robert Alan Davis",
      SECOND_WITNESS_ADDRESS: "145 Spruce Avenue, Boulder, CO 80304"
    },
    NON_DISCLOSURE_AGREEMENT: {
      AGREEMENT_DAY: "15th",
      AGREEMENT_MONTH: "March",
      AGREEMENT_YEAR: "2025",
      PARTY_1_NAME: "TechInnovate Solutions Pvt. Ltd.",
      PARTY_1_ADDRESS: "412 Prestige Tech Park, Outer Ring Road, Bengaluru 560103, Karnataka, India",
      PARTY_1_SHORT_NAME: "TechInnovate",
      COMPANY_NAME: "GlobalVision Enterprises Ltd.",
      COMPANY_ADDRESS: "Tower B, 8th Floor, Cyber City Complex, Gurugram 122002, Haryana, India",
      PROPOSED_TRANSACTION: "joint development of artificial intelligence solutions for supply chain optimization and predictive analytics integration with existing enterprise resource planning systems",
      SURVIVAL_YEARS_AFTER_TERMINATION: "three (3)",
      SURVIVAL_YEARS_AFTER_EXPIRY: "two (2)",
      PARTY_1_SIGNATORY_NAME: "Rajiv Sharma",
      PARTY_1_SIGNATORY_DESIGNATION: "Chief Executive Officer",
      PARTY_1_SIGNING_PLACE: "Bengaluru",
      PARTY_1_SIGNING_DATE: "15-03-2025",
      PARTY_1_SECOND_SIGNATORY_NAME: "Priya Mehta",
      PARTY_1_SECOND_SIGNATORY_DESIGNATION: "Chief Legal Officer",
      PARTY_1_SECOND_SIGNING_PLACE: "Bengaluru",
      PARTY_1_SECOND_SIGNING_DATE: "15-03-2025",
      COMPANY_SIGNATORY_NAME: "Vikram Malhotra",
      COMPANY_SIGNATORY_DESIGNATION: "Managing Director",
      COMPANY_SIGNING_PLACE: "Gurugram",
      COMPANY_SIGNING_DATE: "18-03-2025",
      COMPANY_SECOND_SIGNATORY_NAME: "Anjali Gupta",
      COMPANY_SECOND_SIGNATORY_DESIGNATION: "VP, Business Development",
      COMPANY_SECOND_SIGNING_PLACE: "Gurugram",
      COMPANY_SECOND_SIGNING_DATE: "18-03-2025"
    },
    LEGAL_NOTICE: {
      ADVOCATE_NAME: "Adv. Rajesh Kumar Singh",
      ADVOCATE_ADDRESS: "Chamber No. 412, District Court Complex, Civil Lines, New Delhi - 110054",
      ADVOCATE_CONTACT: "+91 98765 43210",
      ADVOCATE_EMAIL: "advocate.rksingh@legalmail.com",
      RECIPIENT_NAME: "Mrs. Priya Sharma",
      RECIPIENT_ADDRESS: "C-42, Sector 15, Noida, Uttar Pradesh - 201301",
      NOTICE_DATE: "15th March, 2025",
      CLIENT_NAME: "Vikram Sharma",
      CLIENT_FATHER_NAME: "Rajendra Sharma",
      CLIENT_ADDRESS: "A-14, Vasant Kunj, New Delhi - 110070",
      MARRIAGE_DAY: "12th",
      MARRIAGE_MONTH: "April, 2020",
      MATRIMONIAL_HOME: "A-14, Vasant Kunj, New Delhi - 110070",
      NOTICE_TYPE: "MUTUAL_CONSENT",
      // For desertion template
      LEFT_DATE: "10th January, 2023",
      FATHERS_HOUSE_ADDRESS: "C-42, Sector 15, Noida, Uttar Pradesh - 201301",
      FIRST_VISIT_LOCATION: "Noida",
      LAST_VISIT_LOCATION: "Noida",
      LAST_VISIT_DATE: "5th February, 2025"
    },
    
  }

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    setDocument("")
    setFormData(dummyData[templateId])
    setError("")
  }

  const handleDownload = (docType) => {
    try {
      const content = docType === "enhanced" ? enhancedDocument : document
      const templateName = selectedTemplate ? TEMPLATES[selectedTemplate].name : "document"
      downloadDocument(content, templateName, docType)
      setError("")
    } catch (err) {
      console.error("Download error:", err)
      setError(err.message || `Failed to download ${docType} document. Please try again.`)
    }
  }

  const handleGenerate = async () => {
    if (!selectedTemplate) {
      setError("Please select a template")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docType: selectedTemplate,
          inputs: formData,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to generate document")
      setDocument(data.document)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEnhance = async () => {
    if (!document || !aiInstructions) {
      setError("Please provide both a document and enhancement instructions")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document: document,
          instructions: aiInstructions,
          temperature: aiTemperature,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to enhance document")
      setEnhancedDocument(data.enhanced)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Responsive Split Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Responsive Left Sidebar */}
          <div className="w-full md:w-80 md:min-h-[calc(100vh-64px)] md:border-r bg-white p-4 md:p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Document Templates</h2>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  {Object.entries(TEMPLATES).map(([key, template]) => (
                    <div
                      key={key}
                      onClick={() => handleTemplateSelect(key)}
                      className={`p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === key
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-200"
                      }`}
                    >
                      <h3 className="font-medium text-sm md:text-base">{template.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Main Content */}
          <div className="flex-1 md:min-h-[calc(100vh-64px)] p-2 sm:p-4 md:p-6">
            {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>}

            {selectedTemplate ? (
              <Card>
                <CardContent>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-xl font-semibold text-center sm:text-left w-full sm:w-auto">{TEMPLATES[selectedTemplate].name}</h2>
                    <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 w-full sm:w-auto">
                      <Button variant="outline" className="w-full sm:w-auto">Preview</Button>
                      <Button variant="outline" onClick={() => setActiveTab("enhance")} className="w-full sm:w-auto">
                        AI Edit
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto">Edit</Button>
                      <Button variant="outline" className="w-full sm:w-auto">Copy</Button>
                      {activeTab === "generate" ? (
                        <Button 
                          variant="outline" 
                          onClick={() => handleDownload("generated")} 
                          disabled={!document}
                          className="w-full sm:w-auto"
                        >
                          Download Generated
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => handleDownload("enhanced")} 
                          disabled={!enhancedDocument}
                          className="w-full sm:w-auto"
                        >
                          Download Enhanced
                        </Button>
                      )}
                    </div>
                  </div>

                  <Tabs
                    tabs={[
                      { id: "generate", label: "Generate Document" },
                      { id: "enhance", label: "AI Enhancement" },
                    ]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />

                  {activeTab === "generate" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        {TEMPLATES[selectedTemplate].fields.map((fieldName) => (
                          <Input
                            key={fieldName}
                            label={fieldName.replace(/_/g, " ").toLowerCase()}
                            value={formData[fieldName] || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                [fieldName]: e.target.value,
                              }))
                            }
                            placeholder={`Enter ${fieldName.toLowerCase().replace(/_/g, " ")}`}
                          />
                        ))}
                        <div className="mt-6">
                          <Button onClick={handleGenerate} disabled={loading} className="w-full">
                            {loading ? "Generating..." : "Generate Document"}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <TextArea
                          value={document}
                          onChange={(e) => setDocument(e.target.value)}
                          placeholder="Generated document will appear here..."
                          rows={20}
                          className="font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "enhance" && (
                    <div className="space-y-6">
                      <TextArea
                        label="Enhancement Instructions"
                        value={aiInstructions}
                        onChange={(e) => setAiInstructions(e.target.value)}
                        placeholder="Enter instructions for enhancing the document..."
                        rows={6}
                      />
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <label className="flex items-center gap-2 w-full sm:w-auto">
                          <span className="text-sm font-medium text-gray-700">AI Temperature:</span>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={aiTemperature}
                            onChange={(e) => setAiTemperature(Number.parseFloat(e.target.value))}
                            className="w-32"
                          />
                          <span className="text-sm text-gray-500">{aiTemperature}</span>
                        </label>
                        <Button 
                          onClick={handleEnhance} 
                          disabled={loading || !document} 
                          className="w-full sm:w-auto sm:ml-auto"
                        >
                          {loading ? "Enhancing..." : "Enhance Document"}
                        </Button>
                      </div>
                      <TextArea
                        value={enhancedDocument}
                        onChange={(e) => setEnhancedDocument(e.target.value)}
                        placeholder="Enhanced document will appear here..."
                        rows={20}
                        className="font-mono"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="text-center text-gray-500 py-12">Select a template from the sidebar to get started</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
  
                       