import { create } from 'zustand';
import { scenarios, participants, shuffleArray, type Scenario } from '../data/scenarios.ts';
import { parseUrlState, clearUrlState, type UrlState } from '../utils/urlState.ts';

/**
 * Game state management using Zustand
 * Handles participants, roles, scenarios, and game flow
 */

// Type definitions (kept for backwards compatibility, but not actively used in mystery card mode)
export interface Participant {
  id: number;
  name: string;
  role: string | null;
  isRevealed: boolean;
  pairId: string | null;
  scenarioId: number | null;
}


export interface MysteryCard {
  id: number;
  isRevealed: boolean;
  participant: string | null;
  role: string | null;
}

export interface Pair {
  id: string;
  managerId: number;
  employeeId: number;
  managerName?: string;
  employeeName?: string;
  scenarioId: number;
  scenario: Scenario;
  isScenarioRevealed: boolean;
}

export interface GameStats {
  totalParticipants: number;
  revealedParticipants: number;
  formedPairs: number;
  revealedScenarios: number;
  usedScenarios: number;
  usedParticipants: number;
  availableParticipants: number;
  availableScenarios: number;
  isComplete: boolean;
}


export type GamePhase = 'role-selection' | 'scenario-assignment' | 'playing';

export interface GameStore {
  // State
  totalParticipants: number;
  participants: Participant[];
  selectedParticipants: string[]; // List of available participant names for this session
  selectedScenarios: Scenario[]; // List of available scenarios for this session
  availableScenarios: Scenario[];
  pairs: Pair[];
  gamePhase: GamePhase;
  revealedScenarios: Set<string>;
  usedScenarioIds: Set<number>;
  usedParticipantNames: Set<string>;
  mysteryCards: MysteryCard[];

  // Actions
  initializeGame: () => void;
  initializeFromUrl: (urlState: UrlState) => void;
  setSelectedParticipants: (participants: string[]) => void;
  setSelectedScenarios: (scenarios: Scenario[]) => void;
  revealMysteryCard: (cardId: number) => void;
  checkMysteryPair: () => void;
  revealScenario: (pairId: string) => void;
  resetGame: () => void;
  startNextPair: () => void;
  canStartNextPair: () => boolean;

  // Getters
  getPairById: (id: string) => Pair | undefined;
  getGameStats: () => GameStats;
  getUsedScenarios: () => Scenario[];
  getAvailableParticipantNames: () => string[];
}

const TOTAL_PARTICIPANTS = participants.length;
const ROLES = {
  MANAGER: 'Manager',
  EMPLOYEE: 'Employee'
} as const;

type Role = typeof ROLES[keyof typeof ROLES];

const useGameStore = create<GameStore>((set, get) => ({
  // Game configuration
  totalParticipants: TOTAL_PARTICIPANTS,
  
  // Selected participants for this session (defaults to all)
  selectedParticipants: [...participants],
  
  // Selected scenarios for this session (defaults to all)
  selectedScenarios: [...scenarios],
  
  // Participants state - array of participant objects
  participants: participants.map((name, index) => ({
    id: index + 1,
    name: name,
    role: null,
    isRevealed: false,
    pairId: null,
    scenarioId: null
  })),
  
  // Available scenarios (not shuffled)
  availableScenarios: scenarios,
  
  // Pairs of participants (Manager + Employee)
  pairs: [],
  
  // Current game phase
  gamePhase: 'role-selection',
  
  // Revealed scenarios
  revealedScenarios: new Set<string>(),
  
  // Used scenario IDs (to prevent reuse)
  usedScenarioIds: new Set<number>(),
  
  // Used participant names (to prevent repeats)
  usedParticipantNames: new Set<string>(),
  
  // Mystery cards (only 2 at a time)
  mysteryCards: [
    { id: 1, isRevealed: false, participant: null, role: null },
    { id: 2, isRevealed: false, participant: null, role: null }
  ],

  /**
   * Initialize the game with randomized roles
   * Ensures exactly 5 Managers and 5 Employees
   */
  initializeGame: () => {
    // Check if we should restore from URL state
    const urlState = parseUrlState();
    
    if (urlState.hasUrlState) {
      get().initializeFromUrl(urlState);
      return;
    }
    
    // Normal initialization
    const numManagers = Math.floor(TOTAL_PARTICIPANTS / 2);
    const numEmployees = TOTAL_PARTICIPANTS - numManagers;
    
    const roles: Role[] = [
      ...Array(numManagers).fill(ROLES.MANAGER),
      ...Array(numEmployees).fill(ROLES.EMPLOYEE)
    ];
    const shuffledRoles = shuffleArray(roles);

    set(() => ({
      participants: participants.map((name, index) => ({
        id: index + 1,
        name: name,
        role: shuffledRoles[index],
        isRevealed: false,
        pairId: null,
        scenarioId: null
      })),
      pairs: [],
      gamePhase: 'role-selection' as GamePhase,
      revealedScenarios: new Set<string>(),
      usedScenarioIds: new Set<number>(),
      usedParticipantNames: new Set<string>(),
      mysteryCards: [
        { id: 1, isRevealed: false, participant: null, role: null },
        { id: 2, isRevealed: false, participant: null, role: null }
      ],
      availableScenarios: scenarios
    }));
    
    // Clear any existing URL state
    clearUrlState();
  },

  /**
   * Initialize game from URL parameters
   */
  initializeFromUrl: (urlState: UrlState) => {
    const { mysteryCards, scenarioId } = urlState;
    
    // Find the scenario by ID
    const scenario = scenarios.find(s => s.id === scenarioId);
    
    if (scenario && mysteryCards) {
      // Mark participants as used
      const usedNames = new Set([mysteryCards[0].participant!, mysteryCards[1].participant!]);
      
      // Create pair immediately
      const managerCard = mysteryCards.find(card => card.role === ROLES.MANAGER);
      const employeeCard = mysteryCards.find(card => card.role === ROLES.EMPLOYEE);
      
      if (managerCard && employeeCard) {
        const pairId = `url-pair-${managerCard.id}-${employeeCard.id}`;
        const newPair: Pair = {
          id: pairId,
          managerId: managerCard.id,
          employeeId: employeeCard.id,
          managerName: managerCard.participant!,
          employeeName: employeeCard.participant!,
          scenarioId: scenario.id,
          scenario: scenario,
          isScenarioRevealed: true // Auto-reveal when loading from URL
        };
        
        set(() => ({
          participants: participants.map((name, index) => ({
            id: index + 1,
            name: name,
            role: null,
            isRevealed: false,
            pairId: null,
            scenarioId: null
          })),
          mysteryCards: mysteryCards,
          pairs: [newPair],
          gamePhase: 'role-selection' as GamePhase,
          revealedScenarios: new Set<string>(),
          usedScenarioIds: new Set([scenario.id]),
          usedParticipantNames: usedNames,
          availableScenarios: scenarios
        }));
      }
    }
  },

  /**
   * Set selected participants for the game session
   */
  setSelectedParticipants: (selectedParticipants: string[]) => {
    set({ selectedParticipants });
  },

  /**
   * Set selected scenarios for the game session
   */
  setSelectedScenarios: (selectedScenarios: Scenario[]) => {
    set({ 
      selectedScenarios,
      availableScenarios: selectedScenarios 
    });
  },

  /**
   * Reveal a mystery card with automatic participant and role assignment
   * Ensures one Manager and one Employee are always assigned
   */
  revealMysteryCard: (cardId: number) => {
    const state = get();
    // Use selected participants instead of all participants
    let availableParticipants = state.selectedParticipants.filter(name => 
      !state.usedParticipantNames.has(name)
    );
    
    // If only 1 participant left, randomly select from already used participants for the 8th person
    if (availableParticipants.length === 1) {
      const usedParticipants = state.selectedParticipants.filter(name => 
        state.usedParticipantNames.has(name)
      );
      // Add a random used participant to available list for the second card
      if (usedParticipants.length > 0) {
        const randomUsedParticipant = usedParticipants[Math.floor(Math.random() * usedParticipants.length)];
        availableParticipants.push(randomUsedParticipant);
      }
    }
    
    if (availableParticipants.length === 0) {
      return; // No more participants available
    }
    
    // Randomly select participant
    const randomParticipant = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
    
    // Determine role strategically to ensure one Manager and one Employee
    // First card (id: 1) is always Employee, second card (id: 2) is always Manager
    let assignedRole: Role;
    const otherCard = state.mysteryCards.find(card => card.id !== cardId);
    
    if (otherCard?.isRevealed) {
      // Other card is already revealed, assign opposite role
      assignedRole = otherCard.role === ROLES.MANAGER ? ROLES.EMPLOYEE : ROLES.MANAGER;
    } else {
      // First card being revealed - always assign Employee to card 1, Manager to card 2
      assignedRole = cardId === 1 ? ROLES.EMPLOYEE : ROLES.MANAGER;
    }
    
    // Only add to usedParticipantNames if this is a new participant (not a reuse)
    const isNewParticipant = !state.usedParticipantNames.has(randomParticipant);
    
    set((state) => ({
      mysteryCards: state.mysteryCards.map(card =>
        card.id === cardId
          ? { 
              ...card, 
              isRevealed: true, 
              participant: randomParticipant, 
              role: assignedRole 
            }
          : card
      ),
      usedParticipantNames: isNewParticipant 
        ? new Set([...state.usedParticipantNames, randomParticipant])
        : state.usedParticipantNames
    }));
    
    // Check if both cards are revealed to form a pair
    get().checkMysteryPair();
  },

  /**
   * Check if both mystery cards are revealed and automatically form a pair and assign scenario
   */
  checkMysteryPair: () => {
    const state = get();
    const revealedCards = state.mysteryCards.filter(card => card.isRevealed);
    
    if (revealedCards.length === 2) {
      const [card1, card2] = revealedCards;
      
      // Find available scenario
      const availableScenario = state.availableScenarios.find(scenario => 
        !state.usedScenarioIds.has(scenario.id)
      );
      
      if (availableScenario) {
        // Determine which card is manager and which is employee
        const managerCard = card1.role === ROLES.MANAGER ? card1 : card2;
        const employeeCard = card1.role === ROLES.EMPLOYEE ? card1 : card2;
        
        const pairId = `mystery-pair-${managerCard.id}-${employeeCard.id}`;
        
        const newPair: Pair = {
          id: pairId,
          managerId: managerCard.id,
          employeeId: employeeCard.id,
          managerName: managerCard.participant!,
          employeeName: employeeCard.participant!,
          scenarioId: availableScenario.id,
          scenario: availableScenario,
          isScenarioRevealed: false
        };
        
        // Short delay before forming pair for dramatic effect
        setTimeout(() => {
          set((state) => ({
            pairs: [newPair], // Replace any existing pairs
            usedScenarioIds: new Set([...state.usedScenarioIds, availableScenario.id]),
            revealedScenarios: new Set<string>()
            // Keep mystery cards revealed - they will be reset when user clicks "Next Pair"
          }));
        }, 2000); // 2 second delay to show the successful pairing
      }
      // If no more scenarios available, pair is formed but no scenario assigned
    }
  },


  /**
   * Reveal a scenario for a pair
   */
  revealScenario: (pairId: string) => {
    set((state) => ({
      pairs: state.pairs.map(pair =>
        pair.id === pairId
          ? { ...pair, isScenarioRevealed: true }
          : pair
      ),
      revealedScenarios: new Set([...state.revealedScenarios, pairId])
    }));
  },

  /**
   * Reset the entire game
   */
  resetGame: () => {
    clearUrlState();
    get().initializeGame();
  },

  /**
   * Get pair by ID
   */
  getPairById: (id: string): Pair | undefined => {
    return get().pairs.find(p => p.id === id);
  },

  /**
   * Get game statistics
   */
  getGameStats: (): GameStats => {
    const state = get();
    const revealedCount = state.participants.filter(p => p.isRevealed).length;
    const pairsCount = state.pairs.length;
    const revealedScenariosCount = state.revealedScenarios.size;
    const usedScenariosCount = state.usedScenarioIds.size;
    const usedParticipantsCount = state.usedParticipantNames.size;
    // Use selectedParticipants instead of all participants
    const availableParticipants = state.selectedParticipants.filter(name => 
      !state.usedParticipantNames.has(name)
    ).length;
    
    // Check if game is complete considering odd participant reuse
    const canFormAnotherPair = availableParticipants >= 2 || 
                                (availableParticipants === 1 && state.usedParticipantNames.size > 0);
    const isComplete = !canFormAnotherPair || (state.selectedScenarios.length - usedScenariosCount) === 0;
    
    return {
      totalParticipants: state.selectedParticipants.length,
      revealedParticipants: revealedCount,
      formedPairs: pairsCount,
      revealedScenarios: revealedScenariosCount,
      usedScenarios: usedScenariosCount,
      usedParticipants: usedParticipantsCount,
      availableParticipants: availableParticipants,
      availableScenarios: state.selectedScenarios.length - usedScenariosCount,
      isComplete: isComplete
    };
  },

  /**
   * Get list of used scenario titles (for debugging/info)
   */
  getUsedScenarios: (): Scenario[] => {
    const state = get();
    return scenarios.filter(scenario => state.usedScenarioIds.has(scenario.id));
  },

  /**
   * Start next pair - reset mystery cards and hide current pairs to allow new selection
   */
  startNextPair: () => {
    set(() => ({
      // Reset mystery cards for new selection
      mysteryCards: [
        { id: 1, isRevealed: false, participant: null, role: null },
        { id: 2, isRevealed: false, participant: null, role: null }
      ],
      // Hide current pairs (but keep used scenarios tracked)
      pairs: [],
      // Reset revealed scenarios for new pairs
      revealedScenarios: new Set<string>()
    }));
    
    // Clear URL state for fresh start
    clearUrlState();
  },

  /**
   * Check if there are enough participants and scenarios for another round
   */
  canStartNextPair: (): boolean => {
    const state = get();
    // Use selectedParticipants instead of all participants
    const availableParticipants = state.selectedParticipants.filter(name => 
      !state.usedParticipantNames.has(name)
    );
    const availableScenarios = state.availableScenarios.filter(scenario => 
      !state.usedScenarioIds.has(scenario.id)
    );
    
    // Allow next pair if:
    // - At least 2 participants available, OR
    // - 1 participant available AND at least 1 used participant (can reuse)
    const canFormPair = availableParticipants.length >= 2 || 
                        (availableParticipants.length === 1 && state.usedParticipantNames.size > 0);
    
    return canFormPair && availableScenarios.length > 0;
  },

  /**
   * Get list of available participant names for tooltip
   */
  getAvailableParticipantNames: (): string[] => {
    const state = get();
    return state.selectedParticipants.filter(name => 
      !state.usedParticipantNames.has(name)
    );
  }
}));

export default useGameStore;
