import { NextResponse } from 'next/server';
import MessageModel from '@/models/MessageModel';
import dbConnect from '@/lib/dbConnect';

export async function POST(request) {
  try {
    // Connect to database first
    await dbConnect();
    
    // Parse the request body
    const body = await request.json();
    const { walletAddress, content } = body;

    // Validate required fields
    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    // Validate wallet address format (basic check)
    if (walletAddress.length < 26 || walletAddress.length > 42) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.length > 1000) {
      return NextResponse.json(
        { error: 'Message content is too long. Maximum 1000 characters allowed.' },
        { status: 400 }
      );
    }

    // Create new message
    const newMessage = new MessageModel({
      walletAddress: walletAddress.trim(),
      content: content.trim(),
      createdAt: new Date()
    });

    // Save message to database
    const savedMessage = await newMessage.save();

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        data: {
          id: savedMessage._id,
          walletAddress: savedMessage.walletAddress,
          content: savedMessage.content,
          createdAt: savedMessage.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error sending message:', error);
    
    // Handle specific database errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }

    if (error.name === 'MongoError' && error.code === 11000) {
      return NextResponse.json(
        { error: 'Duplicate message detected' },
        { status: 409 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

