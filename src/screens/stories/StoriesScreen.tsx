import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {useState, useEffect} from 'react'
import {
  SafeAreaView,
  Text,
  PressableAnimated,
  Image,
  Icon,
  Avatar,
  Box,
  useAsyncStorage,
} from '@shopify/shop-minis-platform-sdk'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import Carousel from 'react-native-reanimated-carousel'

import {OpenPhotosButton} from '../openPhotosButton'
import {MOCK_STORIES, MOCK_USERS} from '../../data/mock-data'

interface Story {
  id: string
  username: string
  userAvatar: string
  images: string[]
  caption: string
  likes: number
  comments: number
  hasProductLink?: boolean
  isLiked?: boolean
  userId: string
}

const createMockStory = (path: string): Story => {
  return {
    id: Math.random().toString(),
    userId: MOCK_USERS.sarah.id,
    username: 'Shirley F.',
    userAvatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqQAhr87cf9o3nfPj42O4loQ1oz8FBJIfJkYckRg2gjzwwu4BT3lqa4NVTDQpzIn7LFRhLPl9LJFL6qp_9i_f-A',
    images: [path],
    caption:
      "This sweater is amazing! The quality is outstanding and it's so warm.",
    likes: Math.floor(Math.random() * 200),
    comments: Math.floor(Math.random() * 20),
    isLiked: false,
    hasProductLink: true,
  }
}

interface StoryCardProps {
  story: Story
  onPress: () => void
  onLike: () => void
}

function StoryCard({story, onPress, onLike}: StoryCardProps) {
  const width = Dimensions.get('window').width - 32 // Account for padding

  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Avatar source={{uri: story.userAvatar}} title={story.username} />
        <Text style={styles.username}>{story.username}</Text>
      </View>

      <Carousel
        data={story.images}
        renderItem={({item}) => (
          <Image
            source={{uri: item}}
            style={styles.mainImage}
            resizeMode="cover"
          />
        )}
        width={width}
        height={width}
        loop={false}
        pagingEnabled
      />

      <Text style={styles.caption}>{story.caption}</Text>

      {Boolean(story.hasProductLink) && (
        <Box padding="m" style={styles.productLink}>
          <Text>View Product →</Text>
        </Box>
      )}

      <View style={styles.engagement}>
        <PressableAnimated onPress={onLike} style={styles.engagementItem}>
          <Icon
            name="heart"
            color={story.isLiked ? 'primary-button-background' : undefined}
          />
          <Text style={styles.engagementText}>{story.likes}</Text>
        </PressableAnimated>
        <PressableAnimated onPress={onPress} style={styles.engagementItem}>
          <Icon name="chat" />
          <Text style={styles.engagementText}>{story.comments}</Text>
        </PressableAnimated>
      </View>
    </View>
  )
}

export function StoriesScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>
}) {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES)
  const {getItem, setItem} = useAsyncStorage()

  // Load saved URLs only once on mount
  useEffect(() => {
    const loadUrls = async () => {
      const storedUrls = await getItem('urls')
      if (storedUrls) {
        const urls = JSON.parse(storedUrls)
        setImageUrls(urls)
        // Create stories from saved URLs
        setStories(() => [
          ...MOCK_STORIES,
          ...urls.map((url: string) => createMockStory(url)),
        ])
      }
    }
    loadUrls()
  }, [getItem]) // Only depend on getItem

  // Save URLs when component unmounts
  useEffect(() => {
    return () => {
      setItem('urls', JSON.stringify(imageUrls))
    }
  }, [imageUrls, setItem])

  // Only update stories when new URLs are added
  useEffect(() => {
    const lastUrl = imageUrls[imageUrls.length - 1]
    if (lastUrl) {
      setStories(prev => [...prev, createMockStory(lastUrl)])
    }
  }, [imageUrls])

  const handleBack = () => {
    navigation.goBack()
  }

  // const handleCreateStory = () => {
  //   navigation.navigate('Stories.Create')
  // }

  const handleHistoryPress = () => {
    navigation.navigate('Orders.History')
  }
  const handleStoryPress = (storyId: string) => {
    navigation.navigate('Stories.Comments', {storyId})
  }

  const handleLike = (storyId: string) => {
    setStories(prev =>
      prev.map(story =>
        story.id === storyId
          ? {
              ...story,
              isLiked: !story.isLiked,
              likes: story.isLiked ? story.likes - 1 : story.likes + 1,
            }
          : story
      )
    )
  }

  const renderItem = ({item}: {item: Story}) => (
    <StoryCard
      story={item}
      onPress={() => handleStoryPress(item.id)}
      onLike={() => handleLike(item.id)}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          accessibilityLabel="Navigate back"
        >
          <Box marginTop="xs">
            <Icon name="arrow-left" />
          </Box>
        </TouchableOpacity>
        <Text fontSize={20} fontWeight="bold">
          Shop Stories
        </Text>
        <PressableAnimated onPress={handleHistoryPress}>
          <Icon name="add" />
        </PressableAnimated>
      </View>

      <FlatList
        data={stories}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
      />
      <Box paddingHorizontal="section" paddingBottom="gutter">
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  username: {
    marginLeft: 8,
  },
  mainImage: {
    width: '100%',
    aspectRatio: 1,
  },
  caption: {
    padding: 12,
  },
  engagement: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F1F2',
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  productLink: {
    borderTopWidth: 1,
    borderTopColor: '#F0F1F2',
  },
  engagementText: {
    marginLeft: 4,
  },
})
