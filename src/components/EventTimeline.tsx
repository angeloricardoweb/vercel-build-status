import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ExternalLink } from 'lucide-react';
import {
  TimelineEvent,
  getEventIcon,
  getEventTitle,
  getEventStyle,
} from './eventMeta';

function TimelineCard({ event }: { event: TimelineEvent }) {
  const style = getEventStyle(event.type);
  const commit = event?.payload?.deployment?.meta?.githubCommitMessage;
  const deployUrl = event.url || event.meta?.deploymentUrl;

  return (
    <div
      className={`w-full rounded-lg border ${style.border} bg-white p-3 shadow-sm`}
    >
      <div className="flex items-center gap-2">
        {getEventIcon(event.type, 'w-4 h-4 shrink-0')}
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {getEventTitle(event.type)}
        </h3>
      </div>

      <p className="mt-1 text-xs font-medium text-gray-700 truncate">
        {event.meta?.projectName || event.projectId || 'Projeto não identificado'}
      </p>

      {commit && (
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
          <span className="font-medium">Commit:</span> {commit}
        </p>
      )}

      {deployUrl && (
        <a
          href={`https://${deployUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
        >
          Ver Deploy
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      )}
    </div>
  );
}

export default function EventTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max items-stretch px-2">
        {events.map((event, index) => {
          const style = getEventStyle(event.type);
          const isTop = index % 2 === 0;
          const time = format(new Date(event.createdAt), "dd/MM HH:mm", {
            locale: ptBR,
          });

          return (
            <div
              key={event._id}
              className="flex w-64 shrink-0 flex-col items-center"
            >
              {/* Slot superior */}
              <div className="flex h-40 w-full items-end justify-center px-2 pb-2">
                {isTop && (
                  <div className="flex w-full flex-col items-center">
                    <TimelineCard event={event} />
                    <div className="h-3 w-px bg-gray-300" />
                  </div>
                )}
              </div>

              {/* Eixo */}
              <div className="relative flex h-5 w-full items-center justify-center">
                <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-gray-200" />
                <div
                  className={`relative z-10 h-4 w-4 rounded-full ${style.dot} ring-4 ${style.ring}`}
                />
              </div>

              {/* Horário */}
              <div className="mt-1 text-center text-[11px] font-medium text-gray-500">
                {time}
              </div>

              {/* Slot inferior */}
              <div className="flex h-40 w-full items-start justify-center px-2 pt-2">
                {!isTop && (
                  <div className="flex w-full flex-col items-center">
                    <div className="h-3 w-px bg-gray-300" />
                    <TimelineCard event={event} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
