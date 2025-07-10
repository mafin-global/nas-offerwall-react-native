import React, {type CSSProperties} from 'react';
import {View, type ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children?: React.ReactNode;
  center?: boolean;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  absoluteFill?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  safeAreaEdges?: Array<'top' | 'bottom' | 'left' | 'right'>;
}

export const Container = ({
  children,
  center,
  padding,
  paddingHorizontal,
  paddingVertical,
  absoluteFill,
  backgroundColor,
  safeAreaEdges,
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const safeAreaInsets = useSafeAreaInsets();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const style = useMemo<ViewProps['style']>(() => {
    const newStyle: ViewProps['style'] = {};

    if (absoluteFill) {
      newStyle.position = 'absolute';
      newStyle.top = 0;
      newStyle.left = 0;
      newStyle.right = 0;
      newStyle.bottom = 0;
    } else {
      newStyle.flex = 1;
    }
    if (center) {
      newStyle.justifyContent = 'center';
      newStyle.alignItems = 'center';
    }
    if (padding !== undefined) {
      newStyle.padding = padding;
    }
    if (paddingHorizontal !== undefined) {
      newStyle.paddingHorizontal = paddingHorizontal;
    }
    if (paddingVertical !== undefined) {
      newStyle.paddingVertical = paddingVertical;
    }
    if (backgroundColor) {
      newStyle.backgroundColor = backgroundColor;
    }

    if (safeAreaEdges?.includes('top')) {
      newStyle.paddingTop = safeAreaInsets.top + (paddingVertical || padding || 0);
    }
    if (safeAreaEdges?.includes('bottom')) {
      newStyle.paddingBottom = safeAreaInsets.bottom + (paddingVertical || padding || 0);
    }
    if (safeAreaEdges?.includes('left')) {
      newStyle.paddingLeft = safeAreaInsets.left + (paddingHorizontal || padding || 0);
    }
    if (safeAreaEdges?.includes('right')) {
      newStyle.paddingRight = safeAreaInsets.right + (paddingHorizontal || padding || 0);
    }

    return newStyle;
  }, [
    absoluteFill,
    backgroundColor,
    center,
    padding,
    paddingHorizontal,
    paddingVertical,
    safeAreaEdges,
    safeAreaInsets.bottom,
    safeAreaInsets.left,
    safeAreaInsets.right,
    safeAreaInsets.top,
  ]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <View style={style}>{children}</View>;
};
