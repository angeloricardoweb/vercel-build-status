import connectDB from '../src/lib/mongodb';
import BuildEvent from '../src/models/BuildEvent';

async function cleanupExpiredEvents() {
  try {
    console.log('🧹 Iniciando limpeza de eventos expirados...');
    
    await connectDB();
    
    // Remover eventos que expiraram (mais de 25 horas)
    const cutoffDate = new Date(Date.now() - 25 * 60 * 60 * 1000);
    
    const result = await BuildEvent.deleteMany({
      createdAt: { $lt: cutoffDate }
    });
    
    console.log(`✅ Limpeza concluída!`);
    console.log(`   Eventos removidos: ${result.deletedCount}`);
    console.log(`   Data de corte: ${cutoffDate.toISOString()}`);
    
    // Estatísticas atuais
    const totalEvents = await BuildEvent.countDocuments();
    const recentEvents = await BuildEvent.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
    
    console.log(`📊 Estatísticas:`);
    console.log(`   Total de eventos: ${totalEvents}`);
    console.log(`   Eventos nas últimas 24h: ${recentEvents}`);
    
  } catch (error) {
    console.error('❌ Erro na limpeza:', error);
  } finally {
    process.exit(0);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  cleanupExpiredEvents().catch(console.error);
}

export { cleanupExpiredEvents }; 