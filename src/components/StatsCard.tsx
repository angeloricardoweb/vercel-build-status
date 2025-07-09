import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Activity
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  change?: number;
}

export default function StatsCard({ title, value, icon, color, change }: StatsCardProps) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-1">
              <TrendingUp className={`w-4 h-4 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export function StatsGrid({ stats }: { stats: Array<{ _id: string; count: number }> }) {
  const getStatsData = () => {
    const totalEvents = stats.reduce((sum, stat) => sum + stat.count, 0);
    const successfulDeploys = stats.find(s => s._id === 'deployment.succeeded')?.count || 0;
    const failedDeploys = stats.find(s => s._id === 'deployment.error')?.count || 0;
    const pendingDeploys = stats.find(s => s._id === 'deployment.created')?.count || 0;

    return {
      total: totalEvents,
      successful: successfulDeploys,
      failed: failedDeploys,
      pending: pendingDeploys,
    };
  };

  const data = getStatsData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total de Eventos"
        value={data.total}
        icon={<Activity className="w-6 h-6 text-blue-600" />}
        color="bg-blue-100"
      />
      <StatsCard
        title="Deploys Sucesso"
        value={data.successful}
        icon={<CheckCircle className="w-6 h-6 text-green-600" />}
        color="bg-green-100"
      />
      <StatsCard
        title="Deploys Falharam"
        value={data.failed}
        icon={<XCircle className="w-6 h-6 text-red-600" />}
        color="bg-red-100"
      />
      <StatsCard
        title="Deploys Pendentes"
        value={data.pending}
        icon={<Clock className="w-6 h-6 text-yellow-600" />}
        color="bg-yellow-100"
      />
    </div>
  );
} 