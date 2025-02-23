import {useState} from 'react'
import {StyleSheet, FlatList, View} from 'react-native'
import {
  SafeAreaView,
  Text,
  PressableAnimated,
  Avatar,
  TextField,
  Icon,
} from '@shopify/shop-minis-platform-sdk'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

interface Comment {
  id: string
  username: string
  userAvatar: string
  text: string
  timestamp: string
}

export function StoryCommentsScreen({
  navigation,
}: {
  route: any
  navigation: NativeStackNavigationProp<any>
}) {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'Alex M.',
      userAvatar: 'https://placekitten.com/100/100',
      text: 'Great find! How is the sizing?',
      timestamp: '2h ago',
    },
  ])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    setComments(prev => [
      {
        id: Date.now().toString(),
        username: 'You',
        userAvatar: 'https://placekitten.com/100/100',
        text: newComment,
        timestamp: 'Just now',
      },
      ...prev,
    ])
    setNewComment('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PressableAnimated onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" />
        </PressableAnimated>
        <Text style={styles.title}>Comments</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.commentContainer}>
            <Avatar source={{uri: item.userAvatar}} title={item.username} />
            <View style={styles.commentContent}>
              <Text style={styles.username}>{item.username}</Text>
              <Text>{item.text}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.content}
      />

      <View style={styles.inputContainer}>
        <TextField
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          returnKeyType="send"
          onSubmitEditing={handleAddComment}
        />
        <PressableAnimated onPress={handleAddComment} style={styles.sendButton}>
          <Icon name="arrow-right" />
        </PressableAnimated>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F2',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  content: {
    padding: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentContent: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontWeight: '600',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7177',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F1F2',
  },
  sendButton: {
    marginLeft: 12,
  },
})
