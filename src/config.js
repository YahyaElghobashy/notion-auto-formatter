/**
 * Application configuration
 */
export const config = {
  notion: {
    apiVersion: '2022-06-28',
    integrationKey: process.env.REACT_APP_NOTION_INTEGRATION_KEY || '',
    baseUrl: 'https://api.notion.com/v1'
  },
  editor: {
    defaultFontSize: '16px',
    defaultFontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxNestedLevel: 5
  },
  templates: {
    storageKey: 'notion-auto-formatter-templates'
  },
  ui: {
    themes: {
      light: 'light',
      dark: 'dark'
    },
    defaultTheme: 'light'
  }
}; 