# Role-Play Game: Manager & Employee Coaching Scenarios

✨ [Live Here](https://nosnastya.github.io/team-activity/) ✨

A modern, interactive React application for conducting coaching role-play exercises between managers and employees. Built with React, TypeScript, TailwindCSS, and Zustand for state management.

## Features

- **Mystery Card Selection**: Two mystery cards with magical shimmer animations reveal participants and roles
- **Automatic Role Assignment**: Ensures one Manager and one Employee per pair
- **8 Realistic Coaching Scenarios**: Detailed scenarios covering common managerial moments
- **Role-Specific Guides**: Separate coaching guides for managers and employees
- **Coaching Cheat Sheet**: Quick reference guide with DO's, DON'Ts, and Power Moves
- **URL State Sharing**: Share specific role-play sessions via URL
- **Dark Mode Support**: Full dark theme with smooth transitions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Progress Tracking**: Track used participants and scenarios across multiple sessions

## How to Play

1. **View Introduction**: Read the objectives, scenarios, and coaching tips on the home page
2. **Start Game**: Click "Start Role-Play Game" to begin
3. **Reveal Mystery Cards**: Click two mystery cards to reveal participants and their roles (one Manager, one Employee)
4. **Get Scenario**: A coaching scenario is automatically assigned to the pair
5. **Review Guides**: Click the scenario card to reveal detailed coaching guides for both roles
6. **Role-Play**: Conduct the coaching conversation using the provided briefs and tips
7. **Next Pair**: Click "Next Pair" to continue with new participants and scenarios
8. **Share Session**: Use the "Share Session" button to generate a shareable URL

## Game Mechanics

- **Mystery Mode**: Only 2 cards visible at a time with suspenseful reveal animations
- **Smart Pairing**: Automatically ensures one Manager and one Employee per pair
- **Scenario Assignment**: Randomly assigns unused scenarios to prevent repeats
- **Participant Tracking**: Prevents reusing participants across multiple rounds
- **URL Persistence**: Game state can be restored from URL parameters
- **Session Sharing**: Generate shareable links for specific role-play sessions

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── IntroPage.jsx          # Introduction page with objectives and scenarios
│   ├── CheatSheet.jsx         # Coaching tips reference guide
│   ├── GameBoard.jsx          # Main game orchestration component
│   ├── MysteryCard.jsx        # Mystery card with reveal animation
│   ├── ScenarioCard.jsx       # Initial scenario reveal card
│   ├── ManagerCard.jsx        # Manager-specific coaching guide
│   ├── EmployeeCard.jsx       # Employee-specific coaching guide
│   └── ThemeToggle.jsx        # Dark/light mode toggle
├── store/
│   └── gameStore.ts           # Zustand state management (TypeScript)
├── data/
│   └── scenarios.ts           # Coaching scenarios data (TypeScript)
├── utils/
│   ├── urlState.ts            # URL state management utilities
│   └── textUtils.ts           # Text manipulation utilities
├── contexts/
│   └── ThemeContext.jsx       # Theme context provider
└── App.jsx                    # Main application component with routing
```

## Coaching Scenarios

The application includes 8 detailed coaching scenarios:

1. **🔍 Persona Discovery** - Finding Your Spark
2. **🎯 Adaptive Feedback** - The Sensitive Star
3. **⏰ Coaching for Improvement** - The Deadline Dilemma
4. **🛑 Handling Resistance** - Breaking Through the Wall
5. **🚀 Career Growth Conversation** - Mapping the Future
6. **💎 Positive Feedback** - The Hidden Gem
7. **⚠️ Clear Negative Feedback** - Time for Real Talk

Each scenario includes:
- Employee persona and behavioral summary
- Manager coaching objectives and brief
- Employee role brief and suggested phrases
- DO's and DON'Ts for effective coaching
- Power move (key coaching question/statement)
- Key skills to practice

## Technologies Used

- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe code for better maintainability
- **Vite**: Fast build tool and development server
- **TailwindCSS v3**: Utility-first CSS framework with custom animations
- **Zustand**: Lightweight state management
- **CSS 3D Transforms**: For card flip and reveal animations
- **GitHub Pages**: Automated deployment via GitHub Actions

## Customization

### Adding New Scenarios
Edit `src/data/scenarios.ts` to add more scenarios. Each scenario should include:
- `id`, `title`, `catchyName`, `description`
- `objective`, `employeeRole`, `keySkills`
- `managerBrief`, `employeeBrief`, `employeePhrases`
- `coachingTips` (dos, donts, powerMove)

### Adding Participants
Modify the `participants` array in `src/data/scenarios.ts`.

### Styling Customization
Update `tailwind.config.js` for theme changes, colors, and animations.

## Browser Support

- Modern browsers supporting CSS transforms and flexbox
- Responsive design works on screens from 320px width and up
- Optimized for both touch and mouse interactions

## Performance

- Lightweight bundle with code splitting
- Smooth 60fps animations
- Optimized re-renders with Zustand
- Efficient DOM updates with React

## Development

The application is built with modularity and extensibility in mind:
- Components are self-contained and reusable
- State management is centralized and predictable
- Clean separation of concerns between UI and logic
- Comprehensive commenting for easy maintenance

---

Ready to use! Just run `npm run dev` and navigate to the provided localhost URL to start the role-play game.
