// Format timestamp
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3
  });
};

// Format relative time từ log đầu tiên
export const formatRelativeTime = (ms) => {
  if (ms < 1000) return `+${ms}ms`;
  if (ms < 60000) return `+${(ms / 1000).toFixed(1)}s`;
  return `+${(ms / 60000).toFixed(1)}m`;
};

// Format gap time
export const formatGap = (ms) => {
  if (!ms || ms === 0) return '';
  if (ms < 1000) return `(+${ms}ms)`;
  if (ms < 60000) return `(+${(ms / 1000).toFixed(1)}s)`;
  return `(+${(ms / 60000).toFixed(1)}m)`;
};

// Format data object thành string ngắn gọn
export const formatData = (data, maxLength = 100) => {
  if (!data || Object.keys(data).length === 0) return '';

  const str = Object.entries(data)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return `${key}=${JSON.stringify(value)}`;
      }
      return `${key}=${value}`;
    })
    .join(', ');

  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

// Format log thành 1 dòng cho Claude
export const formatLogLine = (log, firstTime, index) => {
  const diff = new Date(log.clientTime).getTime() - firstTime;
  const gap = log.sinceLastEvent || 0;

  let marker = '  ';
  if (log.level === 'error') marker = '❌';
  else if (log.level === 'warn') marker = '⚠️';
  else if (gap > 1000) marker = '🐌';
  else if (gap < 2 && index > 0) marker = '⚡';

  const seq = `#${log.sequence.toString().padStart(4)}`;
  const time = formatRelativeTime(diff).padStart(10);
  const gapStr = formatGap(gap).padStart(12);
  const feature = log.feature.toUpperCase().padEnd(12);
  const event = log.event.padEnd(24);
  const data = formatData(log.data);

  return `${marker} ${seq} ${time} ${gapStr} ${feature} ${event} ${data}`;
};

// Format nhiều logs cho Claude
export const formatLogsForClaude = (logs) => {
  if (!logs || logs.length === 0) return 'No logs found.';

  const firstTime = new Date(logs[0].clientTime).getTime();
  const project = logs[0].project;
  const session = logs[0].sessionId;
  const features = [...new Set(logs.map(l => l.feature))].join(', ');
  const errorCount = logs.filter(l => l.level === 'error').length;
  const warnCount = logs.filter(l => l.level === 'warn').length;

  const header = [
    `=== DEBUG LOG ===`,
    `Project: ${project}`,
    `Session: ${session}`,
    `Features: ${features}`,
    `Total: ${logs.length} logs | Errors: ${errorCount} | Warnings: ${warnCount}`,
    ``,
    `Legend: ❌ Error | ⚠️ Warning | 🐌 Slow (>1s) | ⚡ Fast (<2ms, possible race)`,
    ``,
    `${'MK'.padEnd(2)} ${'#SEQ'.padStart(5)} ${'TIME'.padStart(10)} ${'GAP'.padStart(12)} ${'FEATURE'.padEnd(12)} ${'EVENT'.padEnd(24)} DATA`,
    `${'─'.repeat(100)}`
  ];

  const lines = logs.map((log, index) => formatLogLine(log, firstTime, index));

  return [...header, ...lines].join('\n');
};

// Format anomaly thành text
export const formatAnomaly = (anomaly) => {
  switch (anomaly.type) {
    case 'RACE_CONDITION':
      return `⚡ RACE: ${anomaly.events.map(e => e.event).join(' vs ')} (${anomaly.message})`;
    case 'CONFLICT':
      return `❌ CONFLICT on "${anomaly.target}": ${anomaly.message}`;
    case 'SLOW':
      return `🐌 SLOW at #${anomaly.sequence}: ${anomaly.message}`;
    case 'ERROR':
      return `❌ ERROR at #${anomaly.sequence}: ${anomaly.message}`;
    default:
      return `⚠️ ${anomaly.type}: ${anomaly.message}`;
  }
};

