import {Box, SafeAreaView} from '@shopify/shop-minis-platform-sdk'
import {useState} from 'react'
import {StyleSheet} from 'react-native'

import {OpenPhotosButton} from '../openPhotosButton'

export function CreatePostScreen() {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.buttonContainer}>
        <OpenPhotosButton imageUrls={imageUrls} setImageUrls={setImageUrls} />
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
