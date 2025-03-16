// /app/api/lawyer/consultations/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { IndividualLegalConsultation, FirmLegalConsultation } from '@/models/lawyerConsultation';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

// GET function to retrieve consultations with optional status filter
export async function GET(request) {
  try {
    await connectDB();
    
    // Extract query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    
    // Prepare filter
    const filter = status !== 'all' ? { status } : {};
    
    // Fetch both individual and firm consultations
    const individualConsultations = await IndividualLegalConsultation.find(filter).sort({ createdAt: -1 });
    const firmConsultations = await FirmLegalConsultation.find(filter).sort({ createdAt: -1 });
    
    // Combine and prepare the response
    const allConsultations = [
      ...individualConsultations.map(doc => doc.toJSON()),
      ...firmConsultations.map(doc => doc.toJSON())
    ];
    
    // Sort by creation date (newest first)
    allConsultations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return NextResponse.json(allConsultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json({ error: 'Failed to fetch consultations' }, { status: 500 });
  }
}