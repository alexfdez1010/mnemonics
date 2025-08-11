declare module "canvas-confetti" {
  export interface ConfettiOrigin {
    x?: number;
    y?: number;
  }

  export interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    scalar?: number;
    zIndex?: number;
    origin?: ConfettiOrigin;
    colors?: string[];
    shapes?: string[];
    disableForReducedMotion?: boolean;
  }

  export interface CreateOptions {
    resize?: boolean;
    useWorker?: boolean;
  }

  export type ConfettiFn = (options?: ConfettiOptions) => void;

  declare const confetti: ConfettiFn & {
    create: (canvas: HTMLCanvasElement | null, options?: CreateOptions) => ConfettiFn;
    reset: () => void;
  };

  export default confetti;
}
