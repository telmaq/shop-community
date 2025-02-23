import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {useState, useEffect, useMemo} from 'react'
import {
  SafeAreaView,
  Text,
  PressableAnimated,
  Image,
  Icon,
  Avatar,
  Box,
  useAsyncStorage,
  Button,
  ProductLink,
  useProductSearch,
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
    userId: MOCK_USERS.shirley.id,
    username: MOCK_USERS.shirley.username,
    userAvatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqQAhr87cf9o3nfPj42O4loQ1oz8FBJIfJkYckRg2gjzwwu4BT3lqa4NVTDQpzIn7LFRhLPl9LJFL6qp_9i_f-A',
    images: [path],
    caption:
      "This sweater is amazing! The quality is outstanding and it's so warm.",
    likes: 0,
    comments: 0,
    hasProductLink: true,
    isLiked: false,
  }
}

interface StoryCardProps {
  story: Story
  onPress: () => void
  onLike: () => void
  showDelete?: boolean
  onDelete?: () => void
}

function StoryCard({
  story,
  onPress,
  onLike,
  showDelete,
  onDelete,
}: StoryCardProps) {
  const width = Dimensions.get('window').width - 32

  const {products} = useProductSearch({
    query: 'skateboard',
    first: 1,
    filters: {
      minimumRating: 4,
      price: {
        min: 150,
        max: 250,
      },
    },
  })

  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Avatar source={{uri: story.userAvatar}} title={story.username} />
        <Text style={styles.username}>{story.username}</Text>
        {showDelete && onDelete ? (
          <Box flex={1} alignItems="flex-end">
            <PressableAnimated onPress={onDelete}>
              <Icon name="delete" color="error" />
            </PressableAnimated>
          </Box>
        ) : null}
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

      {Boolean(story.hasProductLink) && products?.[0] ? (
        <ProductLink product={products[0]} />
      ) : null}

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

type StoryFilter = 'all' | 'mine'

export function StoriesScreen({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>
}) {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES)
  const [filter, setFilter] = useState<StoryFilter>('all')
  const {getItem, setItem} = useAsyncStorage()

  // Load saved URLs only once on mount
  useEffect(() => {
    const loadUrls = async () => {
      const storedUrls = await getItem('urls')
      if (storedUrls) {
        const urls = JSON.parse(storedUrls)
        setImageUrls(urls)
        // Create stories once, combining mock and saved stories
        setStories([...MOCK_STORIES, ...urls.map(url => createMockStory(url))])
      }
    }
    loadUrls()
  }, [getItem])

  // Add this effect to handle new stories from CreatePostScreen
  useEffect(() => {
    if (route.params?.newStory) {
      setStories(prev => [route.params.newStory, ...prev])
    }
  }, [route.params?.newStory])

  // Save URLs when component unmounts
  useEffect(() => {
    return () => {
      setItem('urls', JSON.stringify(imageUrls))
    }
  }, [imageUrls, setItem])

  const handleBack = () => {
    navigation.goBack()
  }

  const handleCreateStory = () => {
    navigation.navigate('Stories.CreatePost')
  }

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

  const handleDelete = (storyId: string) => {
    setStories(prev => prev.filter(story => story.id !== storyId))
    // Also remove the image URL if it exists
    const storyToDelete = stories.find(story => story.id === storyId)
    if (storyToDelete?.images[0]) {
      setImageUrls(prev =>
        prev.filter(url => !storyToDelete.images.includes(url))
      )
    }
  }

  const handleNewImage = (newImageUrls: string[]) => {
    // Create a new story for each new image
    const lastUrl = newImageUrls[newImageUrls.length - 1]
    if (lastUrl) {
      const newStory = createMockStory(lastUrl)
      setStories(prev => [newStory, ...prev])
      setImageUrls(newImageUrls)
    }
  }

  const filteredStories = useMemo(() => {
    if (filter === 'mine') {
      return stories.filter(story => story.userId === MOCK_USERS.shirley.id)
    }
    return stories
  }, [stories, filter])

  const renderItem = ({item}: {item: Story}) => (
    <StoryCard
      story={item}
      onPress={() => handleStoryPress(item.id)}
      onLike={() => handleLike(item.id)}
      showDelete={filter === 'mine' && item.userId === MOCK_USERS.shirley.id}
      onDelete={() => handleDelete(item.id)}
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

      <View style={styles.filterContainer}>
        <Button
          variant={filter === 'all' ? 'primary' : 'tertiary'}
          text="All Stories"
          onPress={() => setFilter('all')}
          size="s"
        />
        <Box marginLeft="xs">
          <Button
            variant={filter === 'mine' ? 'primary' : 'tertiary'}
            text="My Stories"
            onPress={() => setFilter('mine')}
            size="s"
          />
        </Box>
      </View>

      <FlatList
        data={filteredStories}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
      />
      {filter === 'mine' && (
        <Box paddingHorizontal="section" paddingBottom="gutter">
          <OpenPhotosButton 
            imageUrls={imageUrls} 
            setImageUrls={handleNewImage}
          />
        </Box>
      )}
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
    flex: 1,
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F2',
  },
})
