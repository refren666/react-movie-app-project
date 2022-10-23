import { MutableRefObject, useEffect } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';

export const useScrollbar = (
  rootElement: MutableRefObject<null | HTMLElement>,
  hasScroll: boolean
) => {
  useEffect(() => {
    let scrollbars: ReturnType<typeof OverlayScrollbars>;

    if (rootElement.current && hasScroll) {
      scrollbars = OverlayScrollbars(rootElement.current, {
        scrollbars: { autoHide: 'never' },
      });
    }

    return () => {
      if (scrollbars) {
        scrollbars.destroy();
      }
    };
  }, [rootElement, hasScroll]);
};
