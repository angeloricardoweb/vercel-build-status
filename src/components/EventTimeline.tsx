import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import {
  TimelineEvent,
  getEventIcon,
  getEventTitle,
  getEventStyle,
} from './eventMeta';

function getProjectKey(event: TimelineEvent) {
  return event.meta?.projectName || event.projectId || 'sem-projeto';
}

function getProjectLabel(event: TimelineEvent) {
  return event.meta?.projectName || event.projectId || 'Projeto não identificado';
}

function groupEventsByProject(events: TimelineEvent[]) {
  const groups = new Map<string, { label: string; events: TimelineEvent[] }>();

  for (const event of events) {
    const key = getProjectKey(event);
    const existing = groups.get(key);

    if (existing) {
      existing.events.push(event);
    } else {
      groups.set(key, {
        label: getProjectLabel(event),
        events: [event],
      });
    }
  }

  return Array.from(groups.values()).sort((a, b) => {
    const aLatest = new Date(a.events[0].createdAt).getTime();
    const bLatest = new Date(b.events[0].createdAt).getTime();
    return bLatest - aLatest;
  });
}

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

      <p className="mt-1 text-[11px] text-gray-400">{event.type}</p>

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

function ProjectTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max items-stretch px-2">
        {events.map((event, index) => {
          const style = getEventStyle(event.type);
          const isTop = index % 2 === 0;
          const time = format(new Date(event.createdAt), "dd 'de' MMMM 'às' HH:mm", {
            locale: ptBR,
          });

          return (
            <div
              key={event._id}
              className="flex w-56 shrink-0 flex-col items-center sm:w-64"
            >
              <div className="flex h-36 w-full items-end justify-center px-2 pb-2 sm:h-40">
                {isTop && (
                  <div className="flex w-full flex-col items-center">
                    <TimelineCard event={event} />
                    <div className="h-3 w-px bg-gray-300" />
                  </div>
                )}
              </div>

              <div className="relative flex h-5 w-full items-center justify-center">
                <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-gray-200" />
                <div
                  className={`relative z-10 h-4 w-4 rounded-full ${style.dot} ring-4 ${style.ring}`}
                />
              </div>

              <div className="mt-1 max-w-[10rem] text-center text-[11px] font-medium text-gray-500 sm:max-w-none">
                {time}
              </div>

              <div className="flex h-36 w-full items-start justify-center px-2 pt-2 sm:h-40">
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

export default function EventTimeline({ events }: { events: TimelineEvent[] }) {
  const projectGroups = groupEventsByProject(events);

  return (
    <div className="space-y-6">
      {projectGroups.map((group) => (
        <section
          key={group.label}
          className="rounded-lg border border-gray-200 bg-gray-50/50"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-2">
              <FolderGit2 className="h-5 w-5 shrink-0 text-gray-500" />
              <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                {group.label}
              </h3>
            </div>
            <span className="shrink-0 text-xs text-gray-500 sm:text-sm">
              {group.events.length} evento{group.events.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="px-2 py-4 sm:px-4">
            <ProjectTimeline events={group.events} />
          </div>
        </section>
      ))}
    </div>
  );
}
