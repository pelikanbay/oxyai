import { useState, useEffect, useCallback } from 'react';

const GHOST_MODE_KEY = 'recyeai_ghost_mode';

export const useGhostMode = () => {
  const [isGhostMode, setIsGhostMode] = useState(() => {
    const stored = localStorage.getItem(GHOST_MODE_KEY);
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem(GHOST_MODE_KEY, String(isGhostMode));
  }, [isGhostMode]);

  const toggleGhostMode = useCallback(() => {
    setIsGhostMode(prev => !prev);
  }, []);

  const enableGhostMode = useCallback(() => {
    setIsGhostMode(true);
  }, []);

  const disableGhostMode = useCallback(() => {
    setIsGhostMode(false);
  }, []);

  return {
    isGhostMode,
    toggleGhostMode,
    enableGhostMode,
    disableGhostMode,
  };
};
