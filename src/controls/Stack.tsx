import {type ReactNode} from 'react';
import {type StyleProp, View, type ViewProps, type ViewStyle} from 'react-native';

interface Props {
  children?: ReactNode;
  row?: boolean;
  center?: boolean;
  centerJustify?: boolean;
  spacing?: number;
  fullWidth?: boolean;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
}

export const Stack = ({
  children,
  row,
  center,
  centerJustify,
  spacing = 0,
  fullWidth,
  flex,
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  paddingHorizontal,
  paddingVertical,
  style: initStyle,
}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const style = useMemo<ViewProps['style']>(() => {
    const newStyle: StyleProp<ViewStyle> = {flexDirection: row ? 'row' : 'column'};

    if (center) newStyle.alignItems = 'center';
    if (centerJustify) newStyle.justifyContent = 'center';
    if (spacing) newStyle.gap = spacing;
    if (fullWidth) newStyle.width = '100%';
    if (flex !== undefined) newStyle.flex = flex;
    if (padding !== undefined) newStyle.padding = padding;
    if (paddingHorizontal !== undefined) newStyle.paddingHorizontal = paddingHorizontal;
    if (paddingVertical !== undefined) newStyle.paddingVertical = paddingVertical;
    if (paddingLeft !== undefined) newStyle.paddingLeft = paddingLeft;
    if (paddingRight !== undefined) newStyle.paddingRight = paddingRight;
    if (paddingTop !== undefined) newStyle.paddingTop = paddingTop;
    if (paddingBottom !== undefined) newStyle.paddingBottom = paddingBottom;

    return [newStyle, initStyle];
  }, [
    center,
    centerJustify,
    flex,
    fullWidth,
    initStyle,
    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
    row,
    spacing,
  ]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <View style={style}>{children}</View>;
};
