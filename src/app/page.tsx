'use client';

import { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import EventFilters from '@/components/EventFilters';
import { StatsGrid } from '@/components/StatsCard';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface Event {
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
}

interface ApiResponse {
  events: Event[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: Array<{ _id: string; count: number }>;
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<Array<{ _id: string; count: number }>>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  const fetchEvents = async (page = 1, newFilters = filters) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...newFilters,
      });

      const response = await fetch(`/api/events?${params}`);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar eventos');
      }

      const data: ApiResponse = await response.json();
      
      setEvents(data.events);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    fetchEvents(1, newFilters);
  };

  const handlePageChange = (newPage: number) => {
    fetchEvents(newPage, filters);
  };

  const handleRefresh = () => {
    fetchEvents(pagination.page, filters);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <h3 className="text-lg font-medium text-red-800">Erro ao carregar dados</h3>
            </div>
            <p className="mt-2 text-red-700">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Monitor de Builds Vercel
              </h1>
              <p className="mt-2 text-gray-600">
                Acompanhe o status dos seus deploys em tempo real
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <StatsGrid stats={stats} />

        {/* Filtros */}
        <EventFilters onFiltersChange={handleFiltersChange} />

        {/* Lista de Eventos */}
        <div className="bg-white border rounded-lg">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Eventos Recentes
            </h2>
            {pagination.total > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {pagination.total} evento{pagination.total !== 1 ? 's' : ''} encontrado{pagination.total !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Carregando eventos...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum evento encontrado
                </h3>
                <p className="text-gray-600">
                  Configure um webhook na Vercel para começar a receber eventos.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </div>

          {/* Paginação */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Página {pagination.page} de {pagination.pages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-50"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
