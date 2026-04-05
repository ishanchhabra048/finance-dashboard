/**
 * CSV and JSON export utilities.
 * Triggers browser download via Blob + anchor click.
 */

/**
 * Export transactions as CSV file.
 */
export const exportCSV = (transactions) => {
  const headers = 'Date,Description,Category,Type,Amount';
  const rows = transactions.map(
    (t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
  );
  const csvContent = [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, 'transactions.csv');
};

/**
 * Export transactions as JSON file.
 */
export const exportJSON = (transactions) => {
  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  triggerDownload(blob, 'transactions.json');
};

/**
 * Internal: trigger browser download for a Blob.
 */
const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
