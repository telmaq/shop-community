import {StyleSheet, FlatList, View} from 'react-native'
import {
  SafeAreaView,
  Text,
  PressableAnimated,
  Image,
  Icon,
  Avatar,
} from '@shopify/shop-minis-platform-sdk'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useState} from 'react'

interface Story {
  id: string
  username: string
  userAvatar: string
  image: string
  caption: string
  likes: number
  comments: number
  isLiked?: boolean
}

const MOCK_STORIES: Story[] = [
  {
    id: '1',
    username: 'Sarah K.',
    userAvatar: 'https://ui-avatars.com/api/?name=Sarah+K&background=random',
    image: 'https://picsum.photos/400/400',
    caption:
      "This sweater is amazing! The quality is outstanding and it's so warm.",
    likes: 42,
    comments: 12,
    isLiked: false,
  },
  // Add more mock stories here
]

interface StoryCardProps {
  story: Story
  onPress: () => void
  onLike: () => void
}

function StoryCard({story, onPress, onLike}: StoryCardProps) {
  return (
    <PressableAnimated onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.userInfo}>
          <Avatar source={{uri: story.userAvatar}} title={story.username} />
          <Text style={styles.username}>{story.username}</Text>
        </View>

        <Image source={{uri: story.image}} style={styles.mainImage} />

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
    </PressableAnimated>
  )
}

export function StoriesScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>
}) {
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES)

  const handleCreateStory = () => {
    navigation.navigate('Stories.Create')
  }

  const handleStoryPress = (storyId: string) => {
    navigation.navigate('Stories.Detail', {storyId})
  }

  const handleLike = (storyId: string) => {
    setStories(prevStories =>
      prevStories.map(story =>
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
    height: 400,
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
