# Planning Guide

A real-time visualization of the United States national debt that displays the constantly increasing amount with engaging animations and context.

**Experience Qualities**:
1. **Urgent** - The constant motion and scale of numbers should convey the gravity and ongoing nature of national debt
2. **Informative** - Clear presentation of debt metrics with helpful context like per-citizen calculations
3. **Mesmerizing** - Smooth animations and counting effects that draw attention and keep users engaged

**Complexity Level**: Light Application (multiple features with basic state)
  - Single-purpose tool with multiple data views, real-time calculations, and animated state updates

## Essential Features

### Real-Time Debt Counter
- **Functionality**: Displays the current US national debt as a constantly incrementing number
- **Purpose**: Provides immediate visual impact of how quickly the debt grows
- **Trigger**: Automatically starts on page load
- **Progression**: Page loads → Fetch current debt data → Animate counter from 0 to current value → Continue incrementing based on per-second rate
- **Success criteria**: Number updates smoothly every frame, accurately reflects debt growth rate

### Per-Citizen Calculator
- **Functionality**: Shows debt divided by US population
- **Purpose**: Makes the massive number relatable on an individual level
- **Trigger**: Automatically calculated alongside main counter
- **Progression**: Calculate total debt → Divide by current US population → Display as secondary metric
- **Success criteria**: Updates in sync with main counter, clearly labeled

### Contextual Statistics
- **Functionality**: Display additional metrics like debt increase per second, per day, debt-to-GDP ratio
- **Purpose**: Provides context for understanding the scale and growth rate
- **Trigger**: Displayed alongside main counter
- **Progression**: Show supporting statistics → Update in real-time
- **Success criteria**: All metrics visible, properly formatted, update smoothly

### International Debt Comparison
- **Functionality**: Compare U.S. debt with other major economies, sortable by total debt, debt-to-GDP ratio, and per capita
- **Purpose**: Provides global context and helps users understand how U.S. debt compares internationally
- **Trigger**: Displayed below main statistics in tabbed interface
- **Progression**: View default total debt ranking → Switch tabs to see different comparisons → Read country-specific metrics
- **Success criteria**: All countries displayed with accurate data, smooth tab switching, clear visual hierarchy

## Edge Case Handling

- **API Failure**: Display cached data with timestamp warning if API is unavailable
- **Stale Data**: Show last updated timestamp and warning if data is more than 24 hours old
- **Large Number Formatting**: Use commas and proper number formatting for readability
- **Performance**: Throttle updates to maintain 60fps animation without excessive CPU usage

## Design Direction

The design should feel urgent yet authoritative - combining the gravity of financial data with the dynamism of real-time updates. A clean, data-focused interface that lets the numbers speak for themselves while maintaining visual interest through motion and scale. The interface should be minimal but impactful, allowing the shocking magnitude of the debt to be the primary design element.

## Color Selection

Complementary (opposite colors) - Using a serious financial palette with red as the primary accent to convey urgency and warning, balanced with deep navy for authority and credibility.

- **Primary Color**: Deep Navy (oklch(0.25 0.05 250)) - Conveys authority, seriousness, and financial credibility
- **Secondary Colors**: Charcoal Gray (oklch(0.35 0.01 250)) for supporting text and borders - provides professional, subdued contrast
- **Accent Color**: Warning Red (oklch(0.55 0.22 25)) for the main debt counter - grabs attention and conveys urgency
- **Foreground/Background Pairings**:
  - Background (Deep Navy #0a1628): White text (oklch(0.98 0 0)) - Ratio 14.2:1 ✓
  - Card (Slate #1a2942): White text (oklch(0.98 0 0)) - Ratio 11.8:1 ✓
  - Primary (Deep Navy #0a1628): White text (oklch(0.98 0 0)) - Ratio 14.2:1 ✓
  - Secondary (Charcoal #424d5c): White text (oklch(0.98 0 0)) - Ratio 8.9:1 ✓
  - Accent (Warning Red #c94545): White text (oklch(0.98 0 0)) - Ratio 5.1:1 ✓
  - Muted (Dark Slate #2a3748): Light Gray text (oklch(0.75 0.01 250)) - Ratio 4.8:1 ✓

## Font Selection

Typography should balance authority with dynamism - a strong monospace font for the counter creates urgency and precision, while a clean sans-serif handles supporting content professionally.

- **Typographic Hierarchy**:
  - H1 (Main Debt Counter): JetBrains Mono Bold/clamp(2.5rem, 8vw, 6rem)/tight letter spacing/tabular numbers
  - H2 (Section Headers): Inter SemiBold/24px/normal spacing
  - H3 (Metric Labels): Inter Medium/16px/wide spacing/uppercase
  - Body (Statistics): Inter Regular/16px/normal spacing
  - Caption (Timestamps): Inter Regular/14px/normal spacing/muted color

## Animations

Animations should emphasize the relentless, continuous nature of debt growth - the counter should feel alive and unstoppable, with subtle pulses and transitions that maintain urgency without overwhelming.

- **Purposeful Meaning**: The constant counting motion reinforces the 24/7 nature of debt accumulation, while number transitions use smooth interpolation to maintain hypnotic readability
- **Hierarchy of Movement**: Primary focus on the main counter with rapid updates, secondary metrics update more slowly to avoid visual chaos

## Component Selection

- **Components**: 
  - Card for containing each metric section with subtle borders
  - Badge for displaying contextual labels like "Per Second" or "Per Citizen" and country rankings
  - Separator for dividing metric sections
  - Skeleton for loading states during initial data fetch
  - Tabs for switching between different country comparison views (Total Debt, Debt-to-GDP, Per Capita)
  - Progress bars for visual comparison of debt amounts
  - Tailwind modifications: Custom gradient backgrounds, increased font sizes for counter, custom animations for number pulsing
  
- **Customizations**: 
  - Animated number counter component using framer-motion for smooth transitions
  - Custom formatting utilities for large numbers with commas
  - Ticker-style digit animation for individual numbers
  
- **States**: 
  - Loading: Skeleton loaders with pulsing animation
  - Active: Numbers animating smoothly, subtle glow effect on main counter
  - Error: Red warning banner with retry button
  - Stale: Amber warning indicator with timestamp
  
- **Icon Selection**: 
  - TrendingUp (Phosphor) for growth rate indicators
  - Warning (Phosphor) for error/stale states  
  - Calendar (Phosphor) for timestamp display
  - Users (Phosphor) for per-citizen metrics
  - Globe (Phosphor) for international comparison section
  - ChartBar (Phosphor) for total debt tab
  - Coins (Phosphor) for per capita tab
  
- **Spacing**: 
  - Generous padding (p-8, p-12) on main container
  - Medium gaps (gap-6, gap-8) between metric cards
  - Tight spacing (gap-2) within metric groups
  - Extra padding (p-6) on cards for breathing room
  
- **Mobile**: 
  - Stack all cards vertically on mobile
  - Reduce counter font size using clamp() for responsive scaling
  - Collapse secondary metrics into accordion on small screens
  - Maintain full counter visibility as primary focus
  - Touch-friendly spacing (min 44px tap targets)
