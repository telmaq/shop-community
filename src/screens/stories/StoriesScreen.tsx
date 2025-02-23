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

interface Story {
  id: string
  username: string
  userAvatar: string
  image: string
  caption: string
  likes: number
  comments: number
}

const MOCK_STORIES: Story[] = [
  {
    id: '1',
    username: 'Sarah K.',
    userAvatar: 'https://placekitten.com/100/100',
    image: 'https://placekitten.com/400/400',
    caption:
      "This sweater is amazing! The quality is outstanding and it's so warm.",
    likes: 42,
    comments: 12,
  },
  // Add more mock stories here
]

interface StoryCardProps {
  story: Story
  onPress: () => void
}

function StoryCard({story, onPress}: StoryCardProps) {
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
          <View style={styles.engagementItem}>
            <Icon name="heart" />
            <Text>{story.likes}</Text>
          </View>
          <View style={styles.engagementItem}>
            <Icon name="chat" />
            <Text>{story.comments}</Text>
          </View>
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
  const handleCreateStory = () => {
    navigation.navigate('Stories.Create')
  }

  const handleStoryPress = (storyId: string) => {
    navigation.navigate('Stories.Detail', {storyId})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop Stories</Text>
        <PressableAnimated onPress={handleCreateStory}>
          <Icon name="add" />
        </PressableAnimated>
      </View>

      <FlatList
        data={MOCK_STORIES}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <StoryCard story={item} onPress={() => handleStoryPress(item.id)} />
        )}
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
})
