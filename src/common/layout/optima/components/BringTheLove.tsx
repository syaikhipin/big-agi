import * as React from 'react';

import type { SxProps } from '@mui/joy/styles/types';
import { Button, Tooltip } from '@mui/joy';

import { Link } from '~/common/components/Link';
import { cssRainbowColorKeyframes } from '~/common/app.theme';

import { DesktopNavIcon, navItemClasses } from './DesktopNavIcon';


export function BringTheLove(props: { text: string, link: string, asIcon?: boolean, icon: React.FC, sx?: SxProps }) {
  // state
  const [loved, setLoved] = React.useState(false);

  // reset loved after 6.9 seconds
  React.useEffect(() => {
    if (loved) {
      const timer = setTimeout(() => setLoved(false), 6900);
      return () => clearTimeout(timer);
    }
  }, [loved]);

  const icon = loved ? '❤️' : <props.icon /> ?? null; // '❤️' : '🤍';

  return (
    <Tooltip followCursor title={props.text}>
      {props.asIcon ? (
        <DesktopNavIcon
          variant='solid'
          className={navItemClasses.typeLinkOrModal}
          component={Link} href={props.link} target='_blank'
          onClick={() => setLoved(true)}
          sx={{
            background: 'transparent',
            // color: 'text.tertiary',
            '&:hover': {
              animation: `${cssRainbowColorKeyframes} 5s linear infinite`,
            },
          }}
        >
          {icon}
        </DesktopNavIcon>
      ) : (
        <Button
          onClick={() => setLoved(true)}
          component={Link} href={props.link} target='_blank' noLinkStyle
          sx={{
            '&:hover': { animation: `${cssRainbowColorKeyframes} 5s linear infinite` },
            background: 'transparent',
            ...props.sx,
          }}
        >
          {icon}
        </Button>
      )}
    </Tooltip>
  );
}