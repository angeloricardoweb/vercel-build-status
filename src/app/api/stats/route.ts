import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BuildEvent from '@/models/BuildEvent';

export async function GET() {
  try {
    await connectDB();

    // Estatísticas gerais
    const totalEvents = await BuildEvent.countDocuments();
    
    // Eventos por tipo
    const eventsByType = await BuildEvent.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Eventos das últimas 24h
    const last24h = await BuildEvent.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    // Eventos que expiram nas próximas 6h
    const expiringSoon = await BuildEvent.countDocuments({
      expiresAt: { 
        $gte: new Date(), 
        $lte: new Date(Date.now() + 6 * 60 * 60 * 1000) 
      }
    });

    // Eventos por região
    const eventsByRegion = await BuildEvent.aggregate([
      { $group: { _id: '$region', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Eventos mais recentes
    const recentEvents = await BuildEvent.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('eventId type createdAt region status');

    return NextResponse.json({
      success: true,
      stats: {
        total: totalEvents,
        last24h,
        expiringSoon,
        byType: eventsByType,
        byRegion: eventsByRegion,
        recent: recentEvents
      },
      expiration: {
        ttlHours: 25,
        description: 'Eventos expiram automaticamente após 25 horas'
      }
    });

  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 