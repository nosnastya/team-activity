import { create } from 'zustand';
import { scenarios, participants, shuffleArray, type Scenario } from '../data/scenarios.ts';
import { updateUrlWithState, parseUrlState, clearUrlState, type UrlState } from '../utils/urlState.ts';

/**
 * Game state management using Zustand
 * Handles participants, roles, scenarios, and game flow
 */

// Type definitions
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
  revealMysteryCard: (cardId: number) => void;
  checkMysteryPair: () => void;
  revealParticipant: (participantId: number) => void;
  checkAndFormPairs: () => void;
  revealScenario: (pairId: string) => void;
  resetGame: () => void;
  startNextPair: () => void;
  canStartNextPair: () => boolean;

  // Getters
  getParticipantById: (id: number) => Participant | undefined;
  getPairById: (id: string) => Pair | undefined;
  getRevealedParticipants: () => Participant[];
  getUnpairedParticipants: () => Participant[];
  areAllParticipantsRevealed: () => boolean;
  getGameStats: () => GameStats;
  getUsedScenarios: () => Scenario[];
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
  
  // Participants state - array of participant objects
  participants: participants.map((name, index) => ({
    id: index + 1,
    name: name,
    role: null,
    isRevealed: false,
    pairId: null,
    scenarioId: null
  })),
  
  // Available scenarios (shuffled at game start)
  availableScenarios: shuffleArray(scenarios),
  
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
      availableScenarios: shuffleArray(scenarios)
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
          isScenarioRevealed: false
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
          availableScenarios: shuffleArray(scenarios)
        }));
      }
    }
  },

  /**
   * Reveal a mystery card with automatic participant and role assignment
   * Ensures one Manager and one Employee are always assigned
   */
  revealMysteryCard: (cardId: number) => {
    const state = get();
    const availableParticipants = participants.filter(name => 
      !state.usedParticipantNames.has(name)
    );
    
    if (availableParticipants.length === 0) {
      return; // No more participants available
    }
    
    // Randomly select participant
    const randomParticipant = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
    
    // Determine role strategically to ensure one Manager and one Employee
    let assignedRole: Role;
    const otherCard = state.mysteryCards.find(card => card.id !== cardId);
    
    if (otherCard?.isRevealed) {
      // Other card is already revealed, assign opposite role
      assignedRole = otherCard.role === ROLES.MANAGER ? ROLES.EMPLOYEE : ROLES.MANAGER;
    } else {
      // First card being revealed, randomly assign role
      assignedRole = Math.random() < 0.5 ? ROLES.MANAGER : ROLES.EMPLOYEE;
    }
    
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
      usedParticipantNames: new Set([...state.usedParticipantNames, randomParticipant])
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
          
          // Update URL with the new pair and scenario
          // Convert to URL-compatible format
          const urlCards = revealedCards.map(card => ({
            id: card.id,
            isRevealed: card.isRevealed,
            participant: card.participant!,
            role: card.role!
          }));
          updateUrlWithState(urlCards, availableScenario);
        }, 2000); // 2 second delay to show the successful pairing
      } else {
        // No more scenarios available
        console.log('No more scenarios available');
      }
    }
  },

  /**
   * Reveal a participant's role (legacy function for backwards compatibility)
   */
  revealParticipant: (participantId: number) => {
    set((state) => ({
      participants: state.participants.map(participant =>
        participant.id === participantId
          ? { ...participant, isRevealed: true }
          : participant
      )
    }));
    
    // Check if we can form any new pairs
    get().checkAndFormPairs();
  },

  /**
   * Check for revealed Manager-Employee pairs and form them
   */
  checkAndFormPairs: () => {
    const state = get();
    const revealedParticipants = state.participants.filter(p => p.isRevealed && !p.pairId);
    const revealedManagers = revealedParticipants.filter(p => p.role === ROLES.MANAGER);
    const revealedEmployees = revealedParticipants.filter(p => p.role === ROLES.EMPLOYEE);
    
    const newPairs: Pair[] = [];
    
    // Form pairs between available managers and employees
    const pairsToForm = Math.min(revealedManagers.length, revealedEmployees.length);
    
    for (let i = 0; i < pairsToForm; i++) {
      const manager = revealedManagers[i];
      const employee = revealedEmployees[i];
      
      // Find an unused scenario (not in usedScenarioIds)
      const availableScenario = state.availableScenarios.find(scenario => 
        !state.usedScenarioIds.has(scenario.id)
      );
      
      if (availableScenario) {
        const pairId = `pair-${manager.id}-${employee.id}`;
        
        newPairs.push({
          id: pairId,
          managerId: manager.id,
          employeeId: employee.id,
          scenarioId: availableScenario.id,
          scenario: availableScenario,
          isScenarioRevealed: false
        });
      }
    }
    
    if (newPairs.length > 0) {
      set((state) => {
        const updatedParticipants = state.participants.map(participant => {
          const pair = newPairs.find(p => 
            p.managerId === participant.id || p.employeeId === participant.id
          );
          
          if (pair) {
            return {
              ...participant,
              pairId: pair.id,
              scenarioId: pair.scenarioId
            };
          }
          
          return participant;
        });
        
        // Mark scenarios as used and hide all previous pairs
        const newUsedScenarioIds = new Set([
          ...state.usedScenarioIds,
          ...newPairs.map(pair => pair.scenarioId)
        ]);
        
        return {
          participants: updatedParticipants,
          pairs: newPairs, // Replace old pairs with new ones (hiding previous scenarios)
          usedScenarioIds: newUsedScenarioIds,
          revealedScenarios: new Set<string>() // Reset revealed scenarios for new pairs
        };
      });
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
   * Get participant by ID
   */
  getParticipantById: (id: number): Participant | undefined => {
    return get().participants.find(p => p.id === id);
  },

  /**
   * Get pair by ID
   */
  getPairById: (id: string): Pair | undefined => {
    return get().pairs.find(p => p.id === id);
  },

  /**
   * Get all revealed participants
   */
  getRevealedParticipants: (): Participant[] => {
    return get().participants.filter(p => p.isRevealed);
  },

  /**
   * Get unpaired revealed participants
   */
  getUnpairedParticipants: (): Participant[] => {
    return get().participants.filter(p => p.isRevealed && !p.pairId);
  },

  /**
   * Check if all participants are revealed
   */
  areAllParticipantsRevealed: (): boolean => {
    return get().participants.every(p => p.isRevealed);
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
    const availableParticipants = participants.filter(name => 
      !state.usedParticipantNames.has(name)
    ).length;
    
    return {
      totalParticipants: state.totalParticipants,
      revealedParticipants: revealedCount,
      formedPairs: pairsCount,
      revealedScenarios: revealedScenariosCount,
      usedScenarios: usedScenariosCount,
      usedParticipants: usedParticipantsCount,
      availableParticipants: availableParticipants,
      availableScenarios: scenarios.length - usedScenariosCount,
      isComplete: availableParticipants < 2 || (scenarios.length - usedScenariosCount) === 0
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
    const availableParticipants = participants.filter(name => 
      !state.usedParticipantNames.has(name)
    );
    const availableScenarios = state.availableScenarios.filter(scenario => 
      !state.usedScenarioIds.has(scenario.id)
    );
    
    return availableParticipants.length >= 2 && availableScenarios.length > 0;
  }
}));

export default useGameStore;
