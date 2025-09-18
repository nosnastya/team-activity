/**
 * URL State Management Utilities
 * Handles encoding/decoding training session state to/from URL parameters
 */

/**
 * Update URL with current training session state
 */
export const updateUrlWithState = (mysteryCards, scenario) => {
  const url = new URL(window.location);
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
      params.set('scenario_id', scenario.id);
      params.set('scenario_title', encodeURIComponent(scenario.title));
    }
  }
  
  // Update URL without page reload
  window.history.replaceState({}, '', url.toString());
};

/**
 * Parse URL parameters to restore training session state
 */
export const parseUrlState = () => {
  const url = new URL(window.location);
  const params = url.searchParams;
  
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
          participant: decodeURIComponent(card1Name),
          role: decodeURIComponent(card1Role)
        },
        {
          id: 2,
          isRevealed: true,
          participant: decodeURIComponent(card2Name),
          role: decodeURIComponent(card2Role)
        }
      ],
      scenarioId: scenarioId ? parseInt(scenarioId) : null,
      scenarioTitle: scenarioTitle ? decodeURIComponent(scenarioTitle) : null
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
 */
export const generateShareableUrl = (mysteryCards, scenario) => {
  const url = new URL(window.location.origin + window.location.pathname);
  const params = url.searchParams;
  
  if (mysteryCards && mysteryCards.length === 2 && mysteryCards.every(card => card.isRevealed)) {
    params.set('card1_role', encodeURIComponent(mysteryCards[0].role));
    params.set('card1_name', encodeURIComponent(mysteryCards[0].participant));
    params.set('card2_role', encodeURIComponent(mysteryCards[1].role));
    params.set('card2_name', encodeURIComponent(mysteryCards[1].participant));
    
    if (scenario) {
      params.set('scenario_id', scenario.id);
      params.set('scenario_title', encodeURIComponent(scenario.title));
    }
  }
  
  return url.toString();
};

/**
 * Clear URL parameters
 */
export const clearUrlState = () => {
  const url = new URL(window.location);
  const params = url.searchParams;
  
  params.delete('card1_role');
  params.delete('card1_name');
  params.delete('card2_role');
  params.delete('card2_name');
  params.delete('scenario_id');
  params.delete('scenario_title');
  
  window.history.replaceState({}, '', url.toString());
};
