/**
 * URL State Management Utilities
 * Handles encoding/decoding training session state to/from URL parameters
 */

import type { Scenario } from '../data/scenarios.ts';

export interface MysteryCard {
  id: number;
  isRevealed: boolean;
  participant: string;
  role: string;
}

export interface UrlState {
  hasUrlState: boolean;
  mysteryCards?: MysteryCard[] | null;
  scenarioId?: number | null;
  scenarioTitle?: string | null;
}

/**
 * Update URL with current training session state
 */
export const updateUrlWithState = (mysteryCards: MysteryCard[], scenario: Scenario): void => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  
  // Clear existing params
  params.delete('card1_role');
  params.delete('card1_name');
  params.delete('card2_role');
  params.delete('card2_name');
  params.delete('scenario_id');
  params.delete('scenario_title');
  
  if (mysteryCards && mysteryCards.length === 2 && mysteryCards.every(card => card.isRevealed)) {
    // Add mystery cards to URL
    params.set('card1_role', encodeURIComponent(mysteryCards[0].role));
    params.set('card1_name', encodeURIComponent(mysteryCards[0].participant));
    params.set('card2_role', encodeURIComponent(mysteryCards[1].role));
    params.set('card2_name', encodeURIComponent(mysteryCards[1].participant));
    
    // Add scenario if available
    if (scenario) {
      params.set('scenario_id', scenario.id.toString());
      params.set('scenario_title', encodeURIComponent(scenario.title));
    }
  }
  
  // Update URL without page reload
  window.history.replaceState({}, '', url.toString());
};

/**
 * Parse URL parameters to restore training session state
 * For hash routing, query params come after the hash: #/game?params
 */
export const parseUrlState = (): UrlState => {
  // With hash routing, query params are after the hash
  // URL format: https://example.com/#/game?card1_role=...
  const hash = window.location.hash; // e.g., "#/game?card1_role=..."
  const queryIndex = hash.indexOf('?');
  
  if (queryIndex === -1) {
    return {
      hasUrlState: false,
      mysteryCards: null,
      scenarioId: null,
      scenarioTitle: null
    };
  }
  
  const queryString = hash.substring(queryIndex + 1);
  const params = new URLSearchParams(queryString);
  
  const card1Role = params.get('card1_role');
  const card1Name = params.get('card1_name');
  const card2Role = params.get('card2_role');
  const card2Name = params.get('card2_name');
  const scenarioId = params.get('scenario_id');
  const scenarioTitle = params.get('scenario_title');
  
  // Check if we have complete card data
  if (card1Role && card1Name && card2Role && card2Name) {
    return {
      hasUrlState: true,
      mysteryCards: [
        {
          id: 1,
          isRevealed: true,
          participant: card1Name,
          role: card1Role
        },
        {
          id: 2,
          isRevealed: true,
          participant: card2Name,
          role: card2Role
        }
      ],
      scenarioId: scenarioId ? parseInt(scenarioId) : null,
      scenarioTitle: scenarioTitle || null
    };
  }
  
  return {
    hasUrlState: false,
    mysteryCards: null,
    scenarioId: null,
    scenarioTitle: null
  };
};

/**
 * Generate shareable URL for current session
 * Uses hash routing for GitHub Pages compatibility
 */
export const generateShareableUrl = (mysteryCards: MysteryCard[], scenario: Scenario): string => {
  // Get base URL without hash
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const params = new URLSearchParams();
  
  if (mysteryCards && mysteryCards.length === 2 && mysteryCards.every(card => card.isRevealed)) {
    params.set('card1_role', mysteryCards[0].role);
    params.set('card1_name', mysteryCards[0].participant);
    params.set('card2_role', mysteryCards[1].role);
    params.set('card2_name', mysteryCards[1].participant);
    
    if (scenario) {
      params.set('scenario_id', scenario.id.toString());
      params.set('scenario_title', scenario.title);
    }
  }
  
  // Use hash routing: base/#/game?params
  return `${baseUrl}#/game?${params.toString()}`;
};

/**
 * Clear URL parameters
 */
export const clearUrlState = (): void => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  
  params.delete('card1_role');
  params.delete('card1_name');
  params.delete('card2_role');
  params.delete('card2_name');
  params.delete('scenario_id');
  params.delete('scenario_title');
  
  window.history.replaceState({}, '', url.toString());
};
