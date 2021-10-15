import React, {useCallback} from 'react';
import { 
  Text, 
  View,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import PropTypes from 'prop-types'
import Entypo from 'react-native-vector-icons/Entypo';

import { GlobalStyle, HeaderStyle } from '../GlobalStyle.js/GlobalStyle';
import { moderateScale } from 'react-native-size-matters';

const LaunchHeader = ({
  headerTitle,
  rocketId,
  onClosePress
}) => {
  const handleOnPress = useCallback(() => {
    onClosePress()
  }, [onClosePress])

  return(
    <View style={HeaderStyle.container}>
        <Text style={HeaderStyle.idText}>
          {`#${rocketId}`}
        </Text>
        <View style={{
          // paddingHorizontal: moderateScale(8),
          flex: 1,
          marginHorizontal: moderateScale(10),
          // backgroundColor: "red"
        }}>
          <Text style={HeaderStyle.headerText}>
            {/* {headerTitle.substring(0, 20)} */}
            {headerTitle}
          </Text>
        </View>
        <TouchableOpacity onPress={handleOnPress}> 
          <Entypo 
            name={"circle-with-cross"}
            size={moderateScale(20)}
            color={"grey"}
          />
        </TouchableOpacity>
    </View>
  )
};



LaunchHeader.defaultProps = {
  onClosePress: () => null,
  headerTitle: "Mission Name",
  rocketId: "rocket_id"
}

LaunchHeader.propTypes = {
  onClosePress: PropTypes.func,
  headerTitle: PropTypes.string,
  rocketId: PropTypes.string
}

export {
  LaunchHeader
}
