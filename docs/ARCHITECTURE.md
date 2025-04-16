# Notion Auto-Formatter Architecture

## System Overview

The Notion Auto-Formatter is built on a modular architecture with clear separation of concerns:

![Architecture Diagram]

### Core Components

1. **Notion API Layer**: Handles all communication with the Notion API
2. **Editor Engine**: Manages the creation and manipulation of content blocks
3. **Preview System**: Renders content as it would appear in Notion
4. **Export Service**: Converts editor content to Notion API format
5. **Template System**: Manages saving and loading of templates

## Data Flow

1. User authenticates with Notion credentials
2. User selects workspace and target page (or creates new)
3. User creates content using the visual editor
4. Preview component renders content in real-time
5. On export, the content is converted to Notion block format
6. The export service sends the formatted content to the Notion API
7. Success/error feedback is provided to the user

## State Management

The application uses React Context for global state management:

- **AuthContext**: Manages Notion authentication
- **EditorContext**: Handles editor state and block operations
- **NotionContext**: Provides access to Notion workspaces and pages

## Block Architecture

Blocks are the fundamental unit of content in the editor:

- Each block has a unique ID
- Blocks can contain other blocks (nesting)
- Blocks are represented as React components for editing
- Blocks have a corresponding Notion API representation

## Services

- **blockConverter**: Converts between editor format and Notion API format
- **notionExporter**: Handles the export process to Notion
- **templateService**: Manages saving and loading templates
- **markdownConverter**: Provides bidirectional conversion with Markdown

## Security Considerations

- Notion API token is stored securely
- No content is stored on servers (client-side only)
- All API requests use HTTPS
- Content validation prevents injection attacks 