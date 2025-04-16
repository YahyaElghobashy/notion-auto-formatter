# NotionFlex UI Components

This directory contains the UI components for the NotionFlex application, built according to the design guidelines.

## Component Structure

The components are organized into the following directories:

- **common**: Reusable UI components used throughout the application
- **editor**: Components specific to the content editor
- **notion**: Notion integration components
- **preview**: Components for preview functionality

## Common Components

- **Button.jsx**: Multi-purpose button component with various styles and states
- **Layout.jsx**: Main layout wrapper with header, footer, and navigation
- **Modal.jsx**: Modal dialog component for confirmations and settings
- **Tooltip.jsx**: Tooltip component for user guidance

## Editor Components

- **BlockContextMenu.jsx**: Right-click menu for block operations using Radix UI
- **DraggableBlock.jsx**: Interactive block component with drag & drop using Framer Motion
- **EditorToolbar.jsx**: Toolbar with formatting and document controls
- **FormatMenu.jsx**: Dropdown menu for text formatting options using Headless UI

## Preview Components

- **PreviewPanel.jsx**: Side panel for content preview with animations

## UI/UX Implementation

The UI is implemented using the following libraries and frameworks:

- **TailwindCSS**: Primary styling system with custom theme configuration
- **HeadlessUI**: For accessible UI primitives like dropdowns and modals
- **RadixUI**: For complex interactive components with accessibility
- **Framer Motion**: For fluid animations and micro-interactions

## Design Principles

1. **Clarity Over Decoration**: Clean, functional interface with purpose-driven visuals
2. **Responsive Feedback**: Immediate visual confirmation of user actions
3. **Progressive Disclosure**: Interface reveals complexity as needed
4. **Consistency & Patterns**: Coherent visual language throughout the application
5. **Efficient Workflows**: Minimal steps for common tasks

## Brand Colors

- **Primary**: Deep Indigo (#4851D9)
- **Secondary**: Soft Mint (#C3F0D8)
- **Accent**: Bright Coral (#FF6B6B)
- **Neutrals**: Slate (#2D3748), Light Gray (#F7FAFC), Medium Gray (#E2E8F0)

## Typography

- **Primary**: Inter (sans-serif)
- **Secondary**: Playfair Display (serif)

## Usage

Components can be imported directly:

```jsx
import Button from '../components/common/Button';
import Layout from '../components/common/Layout';
import EditorToolbar from '../components/editor/EditorToolbar';
``` 