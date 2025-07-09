import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BuildEvent from '@/models/BuildEvent';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type');
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Construir filtros
    const filters: Record<string, unknown> = {};
    
    if (type) filters.type = type;
    if (projectId) filters.projectId = projectId;
    if (status) filters.status = status;
    
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) {
        (filters.createdAt as Record<string, unknown>).$gte = new Date(startDate);
      }
      if (endDate) {
        (filters.createdAt as Record<string, unknown>).$lte = new Date(endDate);
      }
    }

    // Calcular skip para paginação
    const skip = (page - 1) * limit;

    // Buscar eventos
    const events = await BuildEvent.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Contar total de eventos
    const total = await BuildEvent.countDocuments(filters);

    // Calcular estatísticas
    const stats = await BuildEvent.aggregate([
      { $match: filters },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 