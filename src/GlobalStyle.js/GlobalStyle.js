import React from 'react';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
    backgroundColor: "#000",
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  text: {
    fontSize: 12,
    color: "#fff",
  }
})

export const cardStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: moderateScale(14),
    // paddingHorizontal: moderateScale(10),
    // paddingVertical: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: "#212121",
    marginVertical: moderateScale(6)
  },
  imageStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    margin: moderateScale(5)
  },
  roundedInitialName: {
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: "#8CA1A5",
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTextStyle: {
    fontSize: 12,
    color: "#FF5200"
  },
  titleTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#fff"
  },
  footerTextStyle: {
    fontSize: 12,
    color: "#8CA1A5"
  },
  text: {
    fontSize: 12,
    color: "#fff",
  }
})

export const HeaderStyle = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "red",
    justifyContent: 'space-between'
  },
  idText: {
    color: 'grey',
    fontSize: moderateScale(12),
    textAlign: 'left'
  },
  headerText: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export const LaunchDetailStyle = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: "100%",
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
    backgroundColor: "#212121",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
    // height: heightPercentageToDP("90%")
  },
  secondContainer: {
    width: widthPercentageToDP(100),
    // flex: 1,
    marginTop: moderateScale(30),
    // marginHorizontal: moderateScale(-16),
    backgroundColor: "#171010",
    // backgroundColor: "red",
    paddingHorizontal: moderateScale(16),
    height: heightPercentageToDP(36)
  },
  text: {
    fontSize: 12,
    color: "#fff",
  },
  imageStyle: {
    // width: moderateScale(100),
    width: widthPercentageToDP(90),
    // height: moderateScale(50),
    height: heightPercentageToDP(30),
    borderRadius: 8,
    resizeMode: 'stretch',
    marginVertical: moderateScale(10)
  }
})