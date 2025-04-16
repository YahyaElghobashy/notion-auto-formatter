# Notion Auto-Formatter Developer Guide

## Development Environment Setup

1. Clone the repository
```
git clone https://github.com/yahyaelghobashy/notion-auto-formatter.git
cd notion-auto-formatter
```

2. Install dependencies
```
npm install
```

3. Create environment file
```
cp .env.example .env
```

4. Add your Notion integration key to the `.env` file
```
NOTION_INTEGRATION_KEY=your_key_here
```

5. Start the development server
```
npm start
```

## Project Structure

- `src/api`: Notion API integration
- `src/components`: React components
- `src/contexts`: React context providers
- `src/hooks`: Custom React hooks
- `src/services`: Core services
- `src/utils`: Utility functions
- `docs`: Documentation
- `tests`: Test files

## Adding New Block Types

1. Create a new component in `src/components/editor/blocks`
```jsx
// Example: MyNewBlock.jsx
import React from 'react';
import { useBlockOperations } from '../../../hooks/useBlockOperations';

export const MyNewBlock = ({ id, content, ...props }) => {
  const { updateBlock } = useBlockOperations();
  
  const handleChange = (newContent) => {
    updateBlock(id, { content: newContent });
  };
  
  return (
    <div className="my-new-block">
      {/* Block implementation */}
    </div>
  );
};
```

2. Register the block in `src/components/editor/BlockRenderer.jsx`
3. Add conversion logic in `src/services/blockConverter.js`
4. Add the block to the toolbar in `src/components/editor/EditorToolbar.jsx`
5. Create tests in `tests/unit/components/blocks/MyNewBlock.test.js`

## Notion API Integration

### Adding New API Endpoints

Add the endpoint to `src/api/notion.js`
```javascript
export const myNewEndpoint = async (params) => {
  const response = await fetch(`https://api.notion.com/v1/my/endpoint`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_INTEGRATION_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2021-08-16'
    },
    body: JSON.stringify(params)
  });
  
  return await response.json();
};
```

Create a custom hook in `src/hooks` if needed
Add error handling in `src/utils/apiUtils.js`

## Testing

### Running Tests
```
npm test                 # Run all tests
npm test -- --watch      # Run in watch mode
npm test -- --coverage   # Generate coverage report
```

### Writing Tests
```javascript
// Example test
import { render, screen, fireEvent } from '@testing-library/react';
import { MyNewBlock } from '../../../src/components/editor/blocks/MyNewBlock';

describe('MyNewBlock', () => {
  it('renders correctly', () => {
    render(<MyNewBlock id="test-id" content="Test content" />);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('handles changes', () => {
    const mockUpdateBlock = jest.fn();
    jest.mock('../../../hooks/useBlockOperations', () => ({
      useBlockOperations: () => ({
        updateBlock: mockUpdateBlock
      })
    }));
    
    render(<MyNewBlock id="test-id" content="Test content" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New content' } });
    expect(mockUpdateBlock).toHaveBeenCalledWith('test-id', { content: 'New content' });
  });
});
```

## Building for Production
```
npm run build
```
The build artifacts will be stored in the `build/` directory.

## Contributing
Please see `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## Integration Key Handling

1. **Security Note**: The Notion integration key should never be hardcoded in the application. It should be:
   - Stored in environment variables for development
   - Retrieved securely at runtime in production
   - Never committed to version control

2. **Implementation in config.js**:
   ```javascript
   // src/config.js
   export const config = {
     notion: {
       apiVersion: '2022-06-28',
       integrationKey: process.env.REACT_APP_NOTION_INTEGRATION_KEY || '',
       baseUrl: 'https://api.notion.com/v1'
     },
     // Other configuration options
   };
   ```

3. **Authentication Service**:
   ```javascript
   // src/api/auth.js
   import { config } from '../config';

   export const getAuthHeaders = () => {
     return {
       'Authorization': `Bearer ${config.notion.integrationKey}`,
       'Content-Type': 'application/json',
       'Notion-Version': config.notion.apiVersion
     };
   };
   ``` 