type Direction = 'right' | 'left' | 'down' | 'up-right';

const rotation: Record<Direction, number> = {
  right: 0,
  down: 90,
  left: 180,
  'up-right': -45,
};

/**
 * One arrow, drawn once and rotated. Rotation lives on the inner group so
 * CSS can still transform the svg itself for hover nudges.
 */
export default function Arrow({ dir = 'right' }: { dir?: Direction }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <g transform={`rotate(${rotation[dir]} 8 8)`}>
        <path
          d="M2.5 8h11M9.5 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
