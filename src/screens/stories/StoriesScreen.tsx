import {StyleSheet, FlatList, View, Dimensions} from 'react-native'
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
import Carousel from 'react-native-reanimated-carousel'

import {MOCK_STORIES} from '../../data/mock-data'

interface Story {
  id: string
  username: string
  userAvatar: string
  images: string[]
  caption: string
  likes: number
  comments: number
  isLiked?: boolean
  userId: string
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

export function StoriesScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>
}) {
  const [stories, setStories] = useState(MOCK_STORIES)

  const handleCreateStory = () => {
    navigation.navigate('Stories.Create')
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
