import { FC, memo, ReactElement, WheelEvent, ContextType } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import { ICredit } from '../../interfaces';
import { Credit } from '../Credit/Credit';
import styles from './MovieActors.module.css';

type ScrollVisibilityApiType = ContextType<typeof VisibilityContext>;

interface IMovieActorsProps {
  disableScroll: () => void;
  enableScroll: () => void;
  leftArrow: () => ReactElement;
  rightArrow: () => ReactElement;
  onWheel: (apiObj: ScrollVisibilityApiType, event: WheelEvent) => void;
  credits: ICredit[];
}

export const MovieActors: FC<IMovieActorsProps> = memo(({
  disableScroll,
  enableScroll,
  leftArrow,
  rightArrow,
  onWheel,
  credits,
}) => {
  return (
    <div>
      <h2 className={styles.actorsHeading}>Actors:</h2>

      <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
        <ScrollMenu
          LeftArrow={leftArrow}
          RightArrow={rightArrow}
          onWheel={onWheel}
        >
          {credits.length > 0 ? (
            credits.map((credit) => <Credit key={credit.id} credit={credit} />)
          ) : (
            <div>No Actors 😥</div>
          )}
        </ScrollMenu>
      </div>
    </div>
  );
});
