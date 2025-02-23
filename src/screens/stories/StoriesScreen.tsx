import {StyleSheet, FlatList, View, Dimensions} from 'react-native'
import {
  SafeAreaView,
  Text,
  PressableAnimated,
  Image,
  Icon,
  Avatar,
  useProductSearch,
} from '@shopify/shop-minis-platform-sdk'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useState} from 'react'
import Carousel from 'react-native-reanimated-carousel'

interface Story {
  id: string
  username: string
  userAvatar: string
  images: string[]
  caption: string
  likes: number
  comments: number
  isLiked?: boolean
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

const BLANK_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const MOCK_STORIES: Omit<Story, 'caption'>[] = [
  {
    id: '1',
    username: 'Sarah K.',
    userAvatar: 'https://ui-avatars.com/api/?name=Sarah+K&background=random',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    ],
    likes: 42,
    comments: 12,
    isLiked: false,
  },
  {
    id: '2',
    username: 'John D.',
    userAvatar: 'https://ui-avatars.com/api/?name=John+D&background=random',
    images: [
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800',
    ],
    likes: 10,
    comments: 10,
    isLiked: false,
  },
  // Add more mock stories here
]

export function StoriesScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>
}) {
  const {products} = useProductSearch({
    query: 'sweater',
    first: 4,
    filters: {
      minimumRating: 4,
      price: {
        min: 150,
        max: 250,
      },
    },
  })

  const [likedStories, setLikedStories] = useState<{[key: string]: boolean}>({})
  const [likeCounts, setLikeCounts] = useState<{[key: string]: number}>(() =>
    MOCK_STORIES.reduce((acc, story) => ({...acc, [story.id]: story.likes}), {})
  )

  const handleCreateStory = () => {
    navigation.navigate('Stories.Create')
  }

  const handleStoryPress = (storyId: string) => {
    navigation.navigate('Stories.Comments', {storyId})
  }

  const handleLike = (storyId: string) => {
    setLikedStories(prev => ({
      ...prev,
      [storyId]: !prev[storyId],
    }))
    setLikeCounts(prev => ({
      ...prev,
      [storyId]: prev[storyId] + (likedStories[storyId] ? -1 : 1),
    }))
  }

  const stories: Story[] = MOCK_STORIES.map((story, index) => ({
    ...story,
    caption: products?.[index]?.title ?? 'Loading...',
    likes: likeCounts[story.id],
  }))

  const renderItem = ({item}: {item: Story}) => (
    <StoryCard
      story={{
        ...item,
        isLiked: likedStories[item.id],
      }}
      onPress={() => handleStoryPress(item.id)}
      onLike={() => handleLike(item.id)}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop Stories</Text>
        <PressableAnimated onPress={handleCreateStory}>
          <Icon name="add" />
        </PressableAnimated>
      </View>

      <FlatList
        data={stories}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
      />
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
  engagementText: {
    marginLeft: 4,
  },
})
