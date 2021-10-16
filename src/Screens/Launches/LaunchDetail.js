import React, {useState, useEffect, useCallback} from 'react';
import { Text, View, Animated, ActivityIndicator, StyleSheet } from 'react-native';

import propTypes from 'prop-types';
import { GlobalStyle, LaunchDetailStyle } from '../../GlobalStyle.js/GlobalStyle';
import { useQuery, useManualQuery } from 'graphql-hooks';
import { LAUNCH_QUERY } from '../../GraphQL/Queries';
import { LaunchHeader } from '../../Headers/CommonHeaders';
import { moderateScale } from 'react-native-size-matters';

const RenderRocketData = ({
  title = "",
  value = ""
}) => (
  <View style={{
    marginVertical: moderateScale(20),
    flexDirection: 'row'
  }}>
    <Text style={[LaunchDetailStyle.text, {flex: 1, color: "#FF5200", fontWeight: 'bold'}]}>
      {title.toUpperCase()}
    </Text>
    <Text style={[LaunchDetailStyle.text, {flex: 1}]}>
      {value}
    </Text>
  </View>
)

const LaunchDetail = ({ 
  id,
  onClosePress
}) => {
  console.log("[LaunchData] id: ", id)
  const [enableImage, setEnableImage]: boolean = useState(true)
  const [launchData, setLaunchData]: Object = useState(null)

  const query: any = LAUNCH_QUERY

  const [fetchLaunch]:?Function = useManualQuery(query)

  const closePress = useCallback(() => {
    onClosePress()
  }, [onClosePress])

  useEffect(() => {
    fetchThisLaunch(id)
      .then(res => {
        // console.log("[LaunchesDetail] res: ", res);
        setLaunchData(res.data.launch)
      })
  }, [])

  const fetchThisLaunch = async (id, callback) => {
    const data = await fetchLaunch({
      variables: {
        id: id
      }
    })
    
    if(data !== undefined) {
      return Promise.resolve(data)
    }
  }

  return(
    <View style={LaunchDetailStyle.root}>
      {
        launchData == null ? (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ActivityIndicator 
              size={'large'}
              // color={"#FF5200"}
              color={"#fff"}
            />
          </View>
        ) : (
          <View style={LaunchDetailStyle.container}>
            <LaunchHeader 
              headerTitle={launchData.mission.name}
              rocketId={launchData.id}
              onClosePress={closePress}
            />

            {
              enableImage == true ? (
                <Animated.Image 
                  // source={{uri: launchData.mission.missionPatch}}
                  source={require("../../Resource/Image/rocket_launching.jpeg")}
                  style={LaunchDetailStyle.imageStyle}
                  onError={() => setEnableImage(false)}
                />
              ) : (
                <View style={[LaunchDetailStyle.imageStyle, {backgroundColor: "#000", justifyContent: 'center', alignItems: 'center'}]}>
                  <Text style={LaunchDetailStyle.text}>
                    the image is error
                  </Text>
                </View>
              )
            }

            <View style={LaunchDetailStyle.secondContainer}>
              <View style={styles.aboutBox}>
                <Text style={styles.aboutText}>
                  About
                </Text>
              </View>

              <RenderRocketData title={"Vehicle"} value={launchData.rocket.name}/>
              <RenderRocketData title={"Mission"} value={launchData.mission.name} />
              <RenderRocketData title={"Rocket Type"} value={launchData.rocket.type} />
              <RenderRocketData title={"Site"} value={launchData.site} />

            </View>
          </View>   
        )
      }
    </View>
  )
}

LaunchDetail.defaultProps = {
  id: "1",
  onClosePress: () => null
}
RenderRocketData.defaultProps = {
  title: "",
  value: ""
}

LaunchDetail.propTypes = {
  id: propTypes.string,
  onClosePress: propTypes.func
}
RenderRocketData.propTypes = {
  title: propTypes.string,
  value: propTypes.string
}


const styles = StyleSheet.create({
  aboutBox: {
    paddingVertical: moderateScale(8),
    // paddingHorizontal: moderateScale(30),
    width: moderateScale(100),
    borderWidth: .7,
    borderColor: "#fff",
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#171010",
    alignSelf: 'center',
    marginTop: moderateScale(-20),
    marginBottom: moderateScale(16)
  },
  aboutText: {
    color: '#6ECB63',
    fontSize: moderateScale(14),
    fontWeight: 'bold'
  },
})

export default LaunchDetail;
