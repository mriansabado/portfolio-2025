import { useEffect, useState } from 'react';

export interface RocketControlsState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

const initialState: RocketControlsState = {
  forward: false,
  backward: false,
  left: false,
  right: false
};

const keyMap: Record<string, keyof RocketControlsState> = {
  ArrowUp: 'backward',
  ArrowDown: 'forward',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};

const useRocketControls = (disabled: boolean, touchControls?: RocketControlsState) => {
  const [controls, setControls] = useState<RocketControlsState>(initialState);

  useEffect(() => {
    if (disabled) {
      setControls(initialState);
      return;
    }

    const setKeyState = (value: boolean) => (event: KeyboardEvent) => {
      const control = keyMap[event.key];
      if (!control) {
        return;
      }

      setControls((current) => {
        if (current[control] === value) {
          return current;
        }

        return { ...current, [control]: value };
      });
    };

    const handleKeyDown = setKeyState(true);
    const handleKeyUp = setKeyState(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [disabled]);

  return {
    forward: controls.forward || touchControls?.forward || false,
    backward: controls.backward || touchControls?.backward || false,
    left: controls.left || touchControls?.left || false,
    right: controls.right || touchControls?.right || false
  };
};

export default useRocketControls;
