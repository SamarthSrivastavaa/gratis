import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import MessageModel from '@/models/MessageModel';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const skip = parseInt(searchParams.get('skip')) || 0;

    // Validate query parameters
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 100' },
        { status: 400 }
      );
    }

    if (skip < 0) {
      return NextResponse.json(
        { error: 'Skip must be 0 or greater' },
        { status: 400 }
      );
    }

    // Build query
    let query = {};
    if (walletAddress) {
      // Validate wallet address format
      if (walletAddress.length < 26 || walletAddress.length > 42) {
        return NextResponse.json(
          { error: 'Invalid wallet address format' },
          { status: 400 }
        );
      }
      query.walletAddress = walletAddress.trim();
    }

    // Get total count for pagination
    const totalCount = await MessageModel.countDocuments(query);

    // Get messages with pagination
    const messages = await MessageModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select('-__v'); // Exclude version key

    return NextResponse.json({
      success: true,
      data: messages,
      pagination: {
        currentPage: Math.floor(skip / limit) + 1,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        limit,
        skip,
        hasNextPage: skip + limit < totalCount,
        hasPrevPage: skip > 0
      }
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}