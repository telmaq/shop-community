import {Box, SafeAreaView} from '@shopify/shop-minis-platform-sdk'
import {StyleSheet} from 'react-native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {OpenPhotosButton} from '../openPhotosButton'

export function CreatePostScreen({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>
  route: {params: {setImageUrls: (urls: string[]) => void, imageUrls: string[]}}
}) {
  const {imageUrls, setImageUrls} = route.params
  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.buttonContainer}>
        <OpenPhotosButton
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          onSuccess={() => {
            navigation.navigate('Stories.Feed')
          }}
        />
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
})
