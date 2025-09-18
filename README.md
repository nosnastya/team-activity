# Role-Play Game: Manager & Employee Scenarios



Live At: [https://nosnastya.github.io/team-activity/]

A modern, interactive React application for conducting role-play exercises between managers and employees. Built with React, TailwindCSS, and Zustand for state management.

## Features

- **Interactive Participant Cards**: Click to reveal roles with smooth flip animations
- **Automatic Pairing**: Managers and employees are automatically paired when both roles are revealed
- **10 Realistic Scenarios**: Pre-loaded scenarios covering common workplace situations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean design with hover effects, animations, and visual feedback
- **Game Flow Management**: Clear progress tracking and game completion status

## How to Play

1. **Start the Game**: 10 participant cards are displayed face-down
2. **Reveal Roles**: Click cards to reveal whether each participant is a Manager or Employee
3. **Automatic Pairing**: When a Manager and Employee are both revealed, they're automatically paired
4. **Reveal Scenarios**: Click on scenario cards to reveal role-play scenarios for each pair
5. **Role-Play**: Each pair gets specific briefs for their discussion

## Game Mechanics

- **Roles**: Exactly 5 Managers and 5 Employees (randomized each game)
- **Scenarios**: 10 unique scenarios covering various workplace situations
- **Pairing**: Automatic pairing ensures each Manager gets paired with an Employee
- **State Management**: Game state persists during the session

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
│   ├── ParticipantCard.jsx    # Individual participant card with flip animation
│   ├── ScenarioCard.jsx       # Scenario display and interaction
│   └── GameBoard.jsx          # Main game orchestration component
├── store/
│   └── gameStore.js           # Zustand state management
├── data/
│   └── scenarios.js           # Mock scenario data
└── App.jsx                    # Main application component
```

## Scenario Topics

The application includes 10 realistic workplace scenarios:
- Performance Review Discussion
- Promotion Request
- Remote Work Request
- Conflict Resolution
- Salary Negotiation
- Project Deadline Crisis
- Career Development Planning
- Work-Life Balance Concerns
- Skill Gap Discussion
- Team Leadership Opportunity

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **CSS 3D Transforms**: For card flip animations

## Customization

### Adding New Scenarios
Edit `src/data/scenarios.js` to add more scenarios or modify existing ones.

### Changing Participant Count
Modify `TOTAL_PARTICIPANTS` in `src/store/gameStore.js` (ensure even numbers for proper pairing).

### Styling Customization
Update `tailwind.config.js` for theme changes or modify component styles directly.

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
