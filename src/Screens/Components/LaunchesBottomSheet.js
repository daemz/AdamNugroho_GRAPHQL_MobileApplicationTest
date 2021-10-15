import React, {useState, useEffect, useCallback} from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  ScrollView
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const LaunchesBottomSheet = ({
    actionSheetRef,
    children,
    onClose,
    useScrollView,
    scrollViewStyle
}) => {
  const [enableClosable, setEnableClosable]: boolean = useState(true)
  const [enableGesture, setEnableGesture]: boolean = useState(true)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // useEffect(() => {

  // }, [])

  const renderCustomHeader = () => {
    return <View />
    // return <View style={styles.dragIndicator}/>
  }

  return(
    <View style={styles.container}>
      <ActionSheet
        ref={actionSheetRef}
        headerAlwaysVisible
        gestureEnabled={enableGesture}
        initialOffsetFromBottom={moderateScale(1)}
        springOffset={0}
        onClose={handleClose}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        overlayColor={"#000"}
        defaultOverlayOpacity={.35}
        keyboardShouldPersistTaps={"handled"}
        containerStyle={styles.sheetContainer}
        closable={enableClosable}
        CustomHeaderComponent={renderCustomHeader()}
      > 
        {
          useScrollView == true ? (
            <ScrollView
              nestedScrollEnabled
              keyboardShouldPersistTaps={"handled"}
              // scrollEnabled={true}
              style={[styles.list, scrollViewStyle]}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            <View style={{height: "100%"}}>{children}</View>
          )
        }
      </ActionSheet>
    </View>
  )
}

LaunchesBottomSheet.defaulfProps = {
  onClose: () => null,
  useScrollView: true,
  scrollViewStyle: {}
}

LaunchesBottomSheet.propTypes = {
  onClose: PropTypes.func,
  useScrollView: PropTypes.bool,
  scrollViewStyle: PropTypes.shape({})
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    padding: moderateScale(12),
    paddingHorizontal: 0,
    // paddingBottom: moderateScale(80),
    backgroundColor: "#212121",
  },
  dragIndicator: {
    alignSelf: 'center',
    width: moderateScale(74),
    height: moderateScale(4),
    backgroundColor: "grey",
    borderRadius: 8,
    marginVertical: moderateScale(12),
  },
  sheetContainer: {
    backgroundColor: "#212121",
    // backgroundColor: "#fff",
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    height: heightPercentageToDP(83.5),
    // paddingVertical: moderateScale(10)
    paddingTop: moderateScale(10)
  }
})

export default LaunchesBottomSheet;
