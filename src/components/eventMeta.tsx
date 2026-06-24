import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  GitBranch,
  Shield,
  Building,
  Rocket,
} from 'lucide-react';

export interface TimelineEvent {
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
  payload?: {
    deployment?: {
      meta?: {
        githubCommitMessage?: string;
        githubCommitAuthorName?: string;
      };
    };
  };
}

export const getEventIcon = (type: string, className = 'w-5 h-5') => {
  switch (type) {
    case 'deployment.succeeded':
      return <CheckCircle className={`${className} text-green-500`} />;
    case 'deployment.error':
      return <XCircle className={`${className} text-red-500`} />;
    case 'deployment.created':
      return <Clock className={`${className} text-blue-500`} />;
    case 'deployment.promoted':
      return <Rocket className={`${className} text-indigo-500`} />;
    case 'deployment.cancelled':
      return <AlertCircle className={`${className} text-yellow-500`} />;
    case 'project.created':
    case 'project.removed':
      return <GitBranch className={`${className} text-purple-500`} />;
    case 'attack.detected':
      return <Shield className={`${className} text-orange-500`} />;
    default:
      return <Building className={`${className} text-gray-500`} />;
  }
};

export const getEventTitle = (type: string) => {
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

interface EventStyle {
  dot: string;
  ring: string;
  border: string;
  badge: string;
}

export const getEventStyle = (type: string): EventStyle => {
  switch (type) {
    case 'deployment.succeeded':
      return {
        dot: 'bg-green-500',
        ring: 'ring-green-100',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-800',
      };
    case 'deployment.error':
      return {
        dot: 'bg-red-500',
        ring: 'ring-red-100',
        border: 'border-red-200',
        badge: 'bg-red-100 text-red-800',
      };
    case 'deployment.created':
      return {
        dot: 'bg-blue-500',
        ring: 'ring-blue-100',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-800',
      };
    case 'deployment.promoted':
      return {
        dot: 'bg-indigo-500',
        ring: 'ring-indigo-100',
        border: 'border-indigo-200',
        badge: 'bg-indigo-100 text-indigo-800',
      };
    case 'deployment.cancelled':
      return {
        dot: 'bg-yellow-500',
        ring: 'ring-yellow-100',
        border: 'border-yellow-200',
        badge: 'bg-yellow-100 text-yellow-800',
      };
    case 'project.created':
    case 'project.removed':
      return {
        dot: 'bg-purple-500',
        ring: 'ring-purple-100',
        border: 'border-purple-200',
        badge: 'bg-purple-100 text-purple-800',
      };
    case 'attack.detected':
      return {
        dot: 'bg-orange-500',
        ring: 'ring-orange-100',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-800',
      };
    default:
      return {
        dot: 'bg-gray-400',
        ring: 'ring-gray-100',
        border: 'border-gray-200',
        badge: 'bg-gray-100 text-gray-800',
      };
  }
};
