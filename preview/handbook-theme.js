// Remember only an explicit theme choice. First-time readers see the light edition.
try {
  const theme = localStorage.getItem('tutorial-theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch { /* The default also works without browser storage. */ }
