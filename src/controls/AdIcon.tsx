import {Image, StyleSheet, View} from 'react-native';
import {VisibilitySensor} from '@futurejj/react-native-visibility-sensor';

interface Props {
  uri: string;
}

export const AdIcon = ({uri}: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [showImage, setShowImage] = useState(false);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleChangeVisible = useCallback(
    (isVisible: boolean) => {
      if (isVisible && !showImage) {
        setShowImage(true);
      }
    },
    [showImage],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <VisibilitySensor onChange={handleChangeVisible}>
      {showImage ? <Image source={{uri}} style={styles.image} /> : <View style={styles.image} />}
    </VisibilitySensor>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  image: {width: 60, height: 60, borderRadius: 15},
});
