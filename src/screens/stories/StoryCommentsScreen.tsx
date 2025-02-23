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

import {MOCK_COMMENTS, MOCK_USERS, Comment} from '../../data/mock-data'

export function StoryCommentsScreen({
  route,
  navigation,
}: {
  route: {params: {storyId: string}}
  navigation: NativeStackNavigationProp<any>
}) {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>(
    MOCK_COMMENTS[route.params.storyId] || []
  )

  const handleAddComment = () => {
    if (!newComment.trim()) return

    setComments(prev => [
      {
        id: Date.now().toString(),
        userId: MOCK_USERS.sarah.id, // Using Sarah as current user
        username: MOCK_USERS.sarah.username,
        userAvatar: MOCK_USERS.sarah.avatar,
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
