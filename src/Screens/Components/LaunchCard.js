import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { cardStyle } from '../../GlobalStyle.js/GlobalStyle';
import propTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';

const LaunchCard = ({
    data,
    onPress,
    contentContainerStyle
}) => {
  const [enableImage, setEnableImage]: boolean = useState(true)

  const capitalizeLetter: string = data.rocket.name.substring(0, 1)

  return(
    <TouchableOpacity onPress={() => onPress && onPress(data.id)}>
      <View style={[cardStyle.container, contentContainerStyle]}>
        <View style={{flex: 1}}>
          <Text style={cardStyle.headerTextStyle}>
            {`${data.site}`}
          </Text>
          <Text style={[cardStyle.titleTextStyle, {marginVertical: moderateScale(4)}]}>
            {`${data.mission.name}`}
          </Text>
          <Text style={[cardStyle.footerTextStyle]}>
            {`${data.rocket.name}`}
          </Text>
        </View>
        {
          enableImage === true ? (
            <Image
              source={{uri: data.mission.missionPatch}} 
              style={cardStyle.imageStyle}
              onError={(err) => setEnableImage(false)}
            />
          ) : (
            <View style={cardStyle.roundedInitialName}> 
              <Text style={[cardStyle.titleTextStyle, {fontSize: moderateScale(20)}]}>
                {/* {capitalizeLetter} */}
                {`T`}
              </Text>
            </View>
          )
        }
      </View>
    </TouchableOpacity>
  )
};

LaunchCard.defaultProps = {
  data: {},
  onPress: () => null,
  contentContainerStyle: {}
}

LaunchCard.propTypes = {
  data: propTypes.shape({}),
  onPress: propTypes.func,
  contentContainerStyle: propTypes.shape({})
}

export default LaunchCard;
