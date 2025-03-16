// /app/api/lawyer/consultations/[id]/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { IndividualLegalConsultation, FirmLegalConsultation } from '@/models/lawyerConsultation';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

// Helper to determine which model to use based on client type
const getModelByClientType = (clientType) => {
  return clientType === 'Individual' ? IndividualLegalConsultation : FirmLegalConsultation;
};

// GET function to retrieve a single consultation
export async function GET(request, context) {
  try {
    await connectDB();
    
    // Properly access params by using context.params
    const { id } = context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid consultation ID' }, { status: 400 });
    }
    
    const { searchParams } = new URL(request.url);
    const clientType = searchParams.get('clientType');
    
    if (!clientType || !['Individual', 'Firm'].includes(clientType)) {
      return NextResponse.json({ error: 'Invalid client type' }, { status: 400 });
    }
    
    const Model = getModelByClientType(clientType);
    const consultation = await Model.findById(id);
    
    if (!consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
    }
    
    return NextResponse.json(consultation.toJSON());
  } catch (error) {
    console.error('Error fetching consultation details:', error);
    return NextResponse.json({ error: 'Failed to fetch consultation details' }, { status: 500 });
  }
}

// PATCH function to update consultation status or add lawyer notes
export async function PATCH(request, context) {
  try {
    await connectDB();
    
    // Properly access params by using context.params
    const { id } = context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid consultation ID' }, { status: 400 });
    }
    
    const body = await request.json();
    const { clientType, status, lawyerNotes } = body;
    
    if (!clientType || !['Individual', 'Firm'].includes(clientType)) {
      return NextResponse.json({ error: 'Invalid client type' }, { status: 400 });
    }
    
    // Validate the status if provided
    if (status && !['pending', 'approved', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    
    const Model = getModelByClientType(clientType);
    
    // Prepare update data
    const updateData = {};
    if (status) updateData.status = status;
    if (lawyerNotes !== undefined) updateData.lawyerNotes = lawyerNotes;
    
    // Add lawyerNotes field to schemas if not already there
    if (!Model.schema.paths.lawyerNotes) {
      Model.schema.add({
        lawyerNotes: {
          type: String,
          trim: true
        }
      });
    }
    
    // Update the consultation
    const updatedConsultation = await Model.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedConsultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Consultation updated successfully',
      consultation: updatedConsultation.toJSON()
    });
  } catch (error) {
    console.error('Error updating consultation:', error);
    return NextResponse.json({ error: 'Failed to update consultation' }, { status: 500 });
  }
}