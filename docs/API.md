# Notion Auto-Formatter API Documentation

## Notion API Integration

The tool interacts with the Notion API for the following operations:

### Authentication

- The tool uses the Notion integration key for authentication
- All requests include the integration key as a bearer token
- Key is stored securely in the application

### Workspace Operations

#### Get Workspaces

```javascript
GET /v1/users/me
```

Returns the current user and their workspaces.

#### Get Pages

```javascript
GET /v1/search
```

Returns pages and databases accessible to the integration.

### Page Operations

#### Create Page

```javascript
POST /v1/pages
```

Creates a new page with the specified content.

#### Update Page

```javascript
PATCH /v1/pages/{page_id}
```

Updates an existing page with new content.

### Block Operations

#### Get Block Children

```javascript
GET /v1/blocks/{block_id}/children
```

Retrieves the children of a block.

#### Append Block Children

```javascript
PATCH /v1/blocks/{block_id}/children
```

Appends children to a block.

## Internal API

The application exposes the following internal services:

### NotionService

```javascript
// Initialize service
const notionService = new NotionService(integrationKey);

// Get workspaces
const workspaces = await notionService.getWorkspaces();

// Get pages
const pages = await notionService.getPages(query);

// Create page
const page = await notionService.createPage(parentId, content);

// Export content
const result = await notionService.exportContent(pageId, blocks);
```

### BlockConverterService

```javascript
// Convert editor blocks to Notion format
const notionBlocks = BlockConverterService.toNotionFormat(editorBlocks);

// Convert Notion blocks to editor format
const editorBlocks = BlockConverterService.toEditorFormat(notionBlocks);
```

### TemplateService

```javascript
// Save template
const templateId = await TemplateService.saveTemplate(name, blocks);

// Load template
const template = await TemplateService.loadTemplate(templateId);

// Get all templates
const templates = await TemplateService.getAllTemplates();
``` 