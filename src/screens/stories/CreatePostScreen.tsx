import {Box, SafeAreaView} from '@shopify/shop-minis-platform-sdk'
import {StyleSheet} from 'react-native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {MOCK_USERS} from '../../data/mock-data'
import type {OrderItem} from '../../data/types'

import {OpenPhotosButton} from '../openPhotosButton'

interface CreatePostScreenProps {
  navigation: NativeStackNavigationProp<any>
  route: {
    params: {
      setImageUrls: (urls: string[]) => void
      imageUrls: string[]
      product: OrderItem
    }
  }
}

export function CreatePostScreen({navigation, route}: CreatePostScreenProps) {
  const {imageUrls, setImageUrls, product} = route.params

  const createNewStory = (imagePath: string) => {
    const newStory = {
      id: Math.random().toString(),
      userId: MOCK_USERS.shirley.id,
      username: MOCK_USERS.shirley.username,
      userAvatar: MOCK_USERS.shirley.avatar,
      images: [imagePath],
      caption: `Just got this ${product.name} from ${product.shopName}! Can't wait to share my experience.`,
      likes: 0,
      comments: 0,
      isLiked: false,
      hasProductLink: true,
    }
    
    navigation.navigate('Stories.Feed', {newStory})
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.buttonContainer}>
        <OpenPhotosButton
          imageUrls={imageUrls}
          setImageUrls={(newUrls) => {
            setImageUrls(newUrls)
            // Create story with the last uploaded image
            const lastUrl = newUrls[newUrls.length - 1]
            if (lastUrl) {
              createNewStory(lastUrl)
            }
          }}
          onSuccess={() => {}} // We'll handle navigation in setImageUrls callback
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
