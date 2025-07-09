'use client';

import { useState } from 'react';
import { Filter, Calendar } from 'lucide-react';

interface EventFiltersProps {
  onFiltersChange: (filters: {
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
}

const eventTypes = [
  { value: '', label: 'Todos os eventos' },
  { value: 'deployment.created', label: 'Deploy Iniciado' },
  { value: 'deployment.succeeded', label: 'Deploy Concluído' },
  { value: 'deployment.error', label: 'Deploy Falhou' },
  { value: 'deployment.cancelled', label: 'Deploy Cancelado' },
  { value: 'deployment.promoted', label: 'Deploy Promovido' },
  { value: 'project.created', label: 'Projeto Criado' },
  { value: 'project.removed', label: 'Projeto Removido' },
  { value: 'attack.detected', label: 'Ataque Detectado' },
];

const statusOptions = [
  { value: '', label: 'Todos os status' },
  { value: 'succeeded', label: 'Sucesso' },
  { value: 'error', label: 'Erro' },
  { value: 'cancelled', label: 'Cancelado' },
];

export default function EventFilters({ onFiltersChange }: EventFiltersProps) {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = () => {
    onFiltersChange({
      type: type || undefined,
      status: status || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  const clearFilters = () => {
    setType('');
    setStatus('');
    setStartDate('');
    setEndDate('');
    onFiltersChange({});
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <Filter className="w-4 h-4" />
          <span>{showFilters ? 'Ocultar' : 'Mostrar'} filtros</span>
        </button>
      </div>

      {showFilters && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Evento
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {eventTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Inicial
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Final
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 