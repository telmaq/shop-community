import {useState} from 'react'
import {ScrollView, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import ImagePicker from 'react-native-image-crop-picker'
import Share from 'react-native-share'
import {
  Box,
  SafeAreaView,
  Text,
  useTheme,
  Button,
  Icon,
  useMinisDimensions,
  Image,
  Divider,
} from '@shopify/shop-minis-platform-sdk'

import {RootStackParamList} from '../types/screens'

export function NativeFeaturesScreen() {
  const theme = useTheme()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {height, width} = useMinisDimensions()

  const [imageUrl, setImageUrl] = useState<string>()

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.colors['backgrounds-regular']}}
    >
      <ScrollView>
        <Box
          flex={1}
          paddingHorizontal="gutter"
          backgroundColor="backgrounds-regular"
        >
          <Box>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              accessibilityLabel="Navigate back"
            >
              <Box marginTop="xs">
                <Icon name="arrow-left" />
              </Box>
            </TouchableOpacity>
          </Box>
          <Text variant="heroBold" marginBottom="s" marginTop="xs">
            Unlock Native Capabilities
          </Text>
          <Text variant="subtitle" marginBottom="s">
            Let&apos;s explore the native capabilities your Shop Mini can
            access.
          </Text>
          <Box>
            <Button
              text="Camera access"
              onPress={async () => {
                await ImagePicker.openCamera({})
                  .then(image => {
                    setImageUrl(image.path)
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }}
            />
            <Text variant="bodySmall" marginTop="xs">
              Run this Mini on a real device to access the camera.
            </Text>
          </Box>
          <Box marginVertical="s">
            <Button
              text="Gallery access"
              variant="secondary"
              onPress={async () => {
                await ImagePicker.openPicker({})
                  .then(image => {
                    setImageUrl(image.path)
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }}
            />
          </Box>
          {imageUrl ? (
            <Box marginBottom="s">
              <Box
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{uri: imageUrl}}
                  style={{width: 100, height: 100}}
                />
              </Box>
            </Box>
          ) : null}
          <Box>
            <Button
              text="Share sheet"
              variant="tertiary"
              onPress={async () => {
                await Share.open({
                  url: 'https://shop.app/minis',
                  title: 'title',
                }).catch(error => {
                  console.log(error)
                })
              }}
            />
          </Box>
          <Divider marginVertical="s" />
          <Box>
            <Text variant="subtitle" marginBottom="s">
              Use some of our built-in APIs
            </Text>
            <Text>Screen height: {height}</Text>
            <Text>Screen width: {width}</Text>
          </Box>
          <Divider marginVertical="s" />
          <Text marginBottom="s">
            We look forward to seeing what you build! Check out the
            documentation at
          </Text>
          <Text>https://shop.app/minis</Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}
