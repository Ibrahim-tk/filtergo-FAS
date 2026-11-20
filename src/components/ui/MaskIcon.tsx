import Box, { type BoxProps } from '@mui/material/Box';

type Props = Omit<BoxProps, 'children'> & {
  /** URL of an SVG (import it with `?url` or a plain asset import). */
  src: string;
  size?: number;
};

/**
 * Renders any monochrome SVG as a CSS mask so it takes `color` (currentColor).
 * Used for the FilterGo sidebar icons so active/inactive states only change color.
 */
export function MaskIcon({ src, size = 20, sx, ...rest }: Props) {
  return (
    <Box
      aria-hidden
      {...rest}
      sx={[
        {
          width: size,
          height: size,
          flexShrink: 0,
          bgcolor: 'currentColor',
          mask: `url("${src}") center / contain no-repeat`,
          WebkitMask: `url("${src}") center / contain no-repeat`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
