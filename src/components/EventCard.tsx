import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  ExternalLink,
  GitBranch,
  Shield,
  Building
} from 'lucide-react';

interface EventCardProps {
  event: {
    _id: string;
    eventId: string;
    type: string;
    createdAt: string;
    status?: string;
    url?: string;
    projectId?: string;
    deploymentId?: string;
    meta?: {
      projectName?: string;
      deploymentUrl?: string;
    };
  };
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'deployment.succeeded':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'deployment.error':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'deployment.created':
      return <Clock className="w-5 h-5 text-blue-500" />;
    case 'deployment.cancelled':
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case 'project.created':
    case 'project.removed':
      return <GitBranch className="w-5 h-5 text-purple-500" />;
    case 'attack.detected':
      return <Shield className="w-5 h-5 text-orange-500" />;
    default:
      return <Building className="w-5 h-5 text-gray-500" />;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'deployment.succeeded':
      return 'border-green-200 bg-green-50';
    case 'deployment.error':
      return 'border-red-200 bg-red-50';
    case 'deployment.created':
      return 'border-blue-200 bg-blue-50';
    case 'deployment.cancelled':
      return 'border-yellow-200 bg-yellow-50';
    case 'project.created':
    case 'project.removed':
      return 'border-purple-200 bg-purple-50';
    case 'attack.detected':
      return 'border-orange-200 bg-orange-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

const getEventTitle = (type: string) => {
  switch (type) {
    case 'deployment.created':
      return 'Deploy Iniciado';
    case 'deployment.succeeded':
      return 'Deploy Concluído';
    case 'deployment.error':
      return 'Deploy Falhou';
    case 'deployment.cancelled':
      return 'Deploy Cancelado';
    case 'deployment.promoted':
      return 'Deploy Promovido';
    case 'project.created':
      return 'Projeto Criado';
    case 'project.removed':
      return 'Projeto Removido';
    case 'attack.detected':
      return 'Ataque Detectado';
    default:
      return type;
  }
};

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = format(new Date(event.createdAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
  
  return (
    <div className={`border rounded-lg p-4 ${getEventColor(event.type)}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {getEventIcon(event.type)}
          <div>
            <h3 className="font-semibold text-gray-900">
              {getEventTitle(event.type)}
            </h3>
            <p className="text-sm text-gray-600">
              {event.meta?.projectName || event.projectId || 'Projeto não identificado'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">{formattedDate}</p>
          {event.status && (
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              event.status === 'succeeded' ? 'bg-green-100 text-green-800' :
              event.status === 'error' ? 'bg-red-100 text-red-800' :
              event.status === 'cancelled' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {event.status}
            </span>
          )}
        </div>
      </div>
      
      {/* {event.deploymentId && (
        <div className="mt-3 text-sm text-gray-600">
          <span className="font-medium">Deploy ID:</span> {event.deploymentId}
        </div>
      )} */}
      
      {(event.url || event.meta?.deploymentUrl) && (
        <div className="mt-3">
          <a
            href={`https://${event.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            Ver Deploy
            <ExternalLinkerror className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
} 