# Design Guidelines: Ashok Redi Billing App

## Design Approach
**System-Based Approach**: Following Material Design principles adapted for POS efficiency, prioritizing speed, clarity, and minimal cognitive load. This is a utility-first application where every millisecond and pixel serves the core billing workflow.

## Typography System

**Primary Font**: Proxima Nova (fallback: Manrope, system-ui)

**Hierarchy**:
- App Title: text-2xl font-bold (display only, not interactive focus)
- Search Input: text-lg font-medium (most prominent interactive element)
- Menu Item Names: text-base font-semibold
- Prices: text-lg font-bold (tabular numbers)
- Bill Item Names: text-sm font-medium
- Bill Quantities/Prices: text-sm font-semibold (tabular)
- Total Label: text-xl font-bold
- Total Amount: text-3xl font-bold (tabular)
- Autocomplete Suggestions: text-base font-normal

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Micro spacing (between related elements): 2-4
- Component internal padding: 4-6
- Section spacing: 6-8
- Page margins: 4-6

**Single-Page POS Layout**:

1. **Header Section** (sticky, always visible):
   - App title/branding: top-left
   - Compact height: h-16
   - Padding: px-4 py-3

2. **Search Section** (hero focus area):
   - Auto-focused search bar dominates viewport
   - Large touch target: h-14 on mobile, h-16 on desktop
   - Generous padding: px-6
   - Full-width container with max-w-2xl centered
   - Margin below: mb-6

3. **Autocomplete Dropdown** (appears below search):
   - Directly attached to search input (no gap)
   - Shadow-lg for clear separation
   - Rounded-lg matching search bar
   - Max height with scroll: max-h-80 overflow-y-auto
   - Each suggestion: py-3 px-4 (large touch targets)
   - Hover state clearly visible

4. **Bill Section** (main content area):
   - Two-column layout on desktop (lg:grid-cols-2): Items list | Summary
   - Single column on mobile (stacked)
   - Card-style container: rounded-lg shadow-md
   - Padding: p-6
   - Minimum height to prevent layout shift: min-h-96

5. **Bill Items List**:
   - Each item row: flex justify-between items-center
   - Row height: py-4
   - Border between items: border-b (except last)
   - Remove button: absolute right position, w-8 h-8

6. **Total Section** (sticky bottom or within bill card):
   - Bold visual separation: border-t-2 pt-4
   - Padding: p-6
   - Prominent total display with large text

7. **Pay Button** (sticky bottom):
   - Full-width on mobile: w-full
   - Centered max-width on desktop: max-w-md mx-auto
   - Large touch target: h-14
   - Bottom margin for breathing room: mb-6

## Responsive Breakpoints

- **Mobile (base)**: Single column, full-width elements, 4-unit margins
- **Tablet (md: 768px)**: Same layout, increased padding (6-unit margins)
- **Desktop (lg: 1024px)**: Two-column bill section, max-w-7xl container, 8-unit margins

## Component Library

### Search Input
- Large, rounded input field: rounded-xl
- Border width: border-2
- Clear placeholder text: "Search menu items..."
- Always focused on page load
- Icon: Search magnifying glass (left-aligned, from Heroicons)

### Autocomplete Suggestions
- List items with hover states
- Price aligned to right
- Click-to-add interaction
- Keyboard navigation support (up/down arrows, Enter to select)
- Dividers between suggestions

### Bill Item Row
- Three-column layout: Name | Quantity | Price+Remove
- Quantity display: "x2" format, muted styling
- Remove button: Circle with X icon (Heroicons x-mark)
- Smooth removal animation: fade-out + slide-up

### Bill Summary Card
- Subtotal row (if needed later)
- Total row: extra bold, larger text
- Clear visual hierarchy through size and weight

### Pay Button
- Rounded button: rounded-lg
- Bold text: font-bold text-base
- No icon needed (text clarity is king)

## Interaction Patterns

**Search Behavior**:
- Auto-focus on page load
- 2-3 character minimum triggers autocomplete
- Debounce: 150ms for smooth typing
- Single match: highlight suggestion, Enter auto-adds
- Multiple matches: show all, click or arrow-keys to select
- Clear input after adding item

**Adding Items**:
- Instant feedback: item appears in bill immediately
- Smooth entry animation: fade-in + slide-down (200ms)
- Focus returns to search input
- If item already in bill: increment quantity instead of duplicate

**Removing Items**:
- Click X button removes item
- Smooth exit animation: fade-out + slide-up (200ms)
- Total updates instantly

**Total Calculation**:
- Updates in real-time as items added/removed
- No loading states (instant calculation)
- Clear currency formatting (₹ symbol, 2 decimals)

## Animations

Use minimal, purposeful animations:
- Item entry: 200ms ease-out fade + transform
- Item removal: 200ms ease-in fade + transform
- Autocomplete appear: 150ms ease-out opacity
- Button press: scale-95 transform (100ms)

## Accessibility

- Search input: aria-label="Search menu items"
- Autocomplete: role="listbox", aria-expanded states
- Bill items: Semantic list markup
- Remove buttons: aria-label="Remove [item name]"
- Total: aria-live="polite" for screen reader updates
- Keyboard navigation: Tab through all interactive elements
- Focus indicators: ring-2 on all focusable elements

## Images

**No images required**. This is a functional POS interface focused on text-based menu items and numerical data. Visual clarity comes from typography, spacing, and layout structure.

## Performance Priorities

- Instant search feedback (< 100ms perceived delay)
- Smooth 60fps animations
- No layout shifts when adding/removing items
- Total recalculates without re-rendering entire bill