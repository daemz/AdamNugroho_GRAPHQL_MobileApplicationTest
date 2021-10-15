import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'react-apollo';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useQuery } from 'graphql-hooks';
import Toast from 'react-native-simple-toast';
// import { useQuery } from '@apollo/client';

import { GlobalStyle } from '../../GlobalStyle.js/GlobalStyle';
import { LAUNCHES_QUERY, LAUNCH_QUERY, ME_QUERY, missionPatch } from '../../GraphQL/Queries';
// import { FlatList } from 'react-native-gesture-handler';
import LaunchCard from '../Components/LaunchCard';
import { moderateScale } from 'react-native-size-matters';
import LaunchesBottomSheet from '../Components/LaunchesBottomSheet';
import LaunchDetail from './LaunchDetail';

const LaunchesHome = (props) => {
  const [isLoading, setIsLoading]: boolean = useState(true)
  const [launchesData, setLaunchesData]: Array = useState([])

  const actionSheetRef: any = useRef(null)

  const [selectedId, setSelectedId]: string = useState("1")
  const [query, setQuery]: any = useState(LAUNCHES_QUERY)
  const [cursorData, setCursorData]: string = useState("")
  const [cursorTemp, setCursorTemp]: string = useState("")
  const [updating, setUpdating]: boolean = useState(false)

  const { navigation, route } = props

  // this is one way to call multiple graphql at one hook
  const { 
    loading: loadingOfLaunches, 
    error: errorOfLaunches, 
    data: dataOfLaunches, 
  } = useQuery(query, {
    variables: {  
      pageSize: 10,
      after: cursorData,
      missionPatch: missionPatch.SMALL, // enum
    }
  }) // use hooks to avoid side effect

  useEffect(() => {
    console.log(
      "[LaunchesHome] data: ", dataOfLaunches, 
      "\nloading: ", loadingOfLaunches,
      "\nerror: ", errorOfLaunches // errorOfLaunches.fetchError.message => for displaying error message
    );

    if(errorOfLaunches !== undefined) {
      setUpdating(false)
      setIsLoading(false)

      Toast.show("Data of launches does not exist anymore", Toast.LONG)
    } else if(dataOfLaunches !== undefined) {
      const { launches } = dataOfLaunches
      const prevDataofLaunches: any = launchesData

      const newData: Array = launches.launches
      const combinedData: Array = prevDataofLaunches.concat(newData)

      // console.log("[LaunchesHome] newData: ", newData);
      // console.log("[LaunchesHome] combinedData: ", combinedData);

      setLaunchesData(combinedData)
      setCursorTemp(launches.cursor)

      setUpdating(false)
      setIsLoading(false)
    }
  }, [loadingOfLaunches]) // listen for any change on 'data'

  const callingNextPage = () => {
    console.log("[LaunchesHome] callingNextPage! ")
    setUpdating(true)
    setCursorData(cursorTemp)
  }
  
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const result = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // to measure if the scrollview reach the end of bottom
    
    return result // either true or false
  }

  const handleCardPress = async(id) => {
    setSelectedId(id)
    openBottomSheet()
    // navigation.navigate("LaunchDetail", {id: id})
  }

  const openBottomSheet = () => {
    actionSheetRef.current?.setModalVisible(true)
  }

  const closeBottomSheet = () => {
    actionSheetRef.current?.setModalVisible(false)
  }

  const bottomSheetRender = () => (
    <LaunchesBottomSheet
      actionSheetRef={actionSheetRef}
      onClose={() => closeBottomSheet()}
      // scrollViewStyle={{height: heightPercentageToDP("85%")}}
    >
      <LaunchDetail 
        id={selectedId}
        onClosePress={closeBottomSheet}
      />
    </LaunchesBottomSheet>
  )

  return (
    <View style={GlobalStyle.container}>
      {
        isLoading === true ? (
          <ActivityIndicator size={'large'} color={"#fff"} />
        ) : (
          <ScrollView
            // onMomentumScrollEnd={() => console.log("[LaunchesHome] onMomentumScrollEnd fired")}
            // onScrollEndDrag={() => console.log("[LaunchesHome] onScrollEndDrag fired")}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent) == true && updating == false) {
                callingNextPage()
              }
            }}
          >
            <FlatList 
              data={launchesData}
              extraData={launchesData} // this is for pagination data collection
              renderItem={({item}) => (
                <LaunchCard 
                  data={item}
                  onPress={(id) => {handleCardPress(id)}}
                />
              )}
              style={{
                paddingBottom: moderateScale(20)
              }}
              keyExtractor={(item, index) => String(item + index)}
              ListFooterComponent={() => {
                if(updating === true) {
                  return(
                    <ActivityIndicator size={'small'} color={"#fff"} />
                  )
                } else {
                  return null
                }
              }}
            />
            {bottomSheetRender()}
          </ScrollView>
        )
      }
    </View>
  );
};

export default LaunchesHome;