import {useState} from 'react'
import {ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {
  Box,
  SafeAreaView,
  Text,
  ProductCard,
  useProductSearch,
  useTheme,
  Button,
  TextField,
  RadioButton,
  Divider,
} from '@shopify/shop-minis-platform-sdk'

import {RootStackParamList} from '../types/screens'

export function HomeScreen() {
  const theme = useTheme()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const {products} = useProductSearch({
    query: 'skateboard',
    first: 4,
    filters: {
      minimumRating: 4,
      price: {
        min: 150,
        max: 250,
      },
    },
  })

  const radioButtonOptions = ['Option A', 'Option B', 'Option C']

  const [selectedOption, setSelectedOption] = useState(radioButtonOptions[0])
  const [textFieldValue, setTextFieldValue] = useState('')

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.colors['backgrounds-regular']}}
    >
      <ScrollView>
        <Box
          flex={1}
          paddingHorizontal="gutter"
          marginBottom="s"
          backgroundColor="backgrounds-regular"
        >
          <Text variant="heroBold" marginBottom="s" marginTop="xs">
            Hello, World!
          </Text>
          <Text variant="subtitle" marginBottom="s">
            You just created a Shop Mini! Nice.
          </Text>
          <Text variant="subtitle">Let&apos;s explore what a Mini can do.</Text>
          <Divider marginVertical="s" />
          {products ? (
            <>
              <Text marginBottom="s">
                First up: Product Cards (Since we&apos;re all about shopping,
                right?)
              </Text>
              <Box flexDirection="row">
                {products.slice(0, 2).map(product => (
                  <Box key={product.id} flex={1}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Box>
              <Box flexDirection="row">
                {products.slice(2, 4).map(product => (
                  <Box key={product.id} flex={1} padding="xs">
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Box>
            </>
          ) : null}
          <Divider marginVertical="s" />

          <Text marginBottom="s">
            You can add interactions to your Mini with inputs.
          </Text>
          <Box>
            <TextField
              placeholder="I love Minis because..."
              value={textFieldValue}
              onChangeText={setTextFieldValue}
            />
            {textFieldValue ? (
              <Text marginTop="xs">I love Minis because {textFieldValue}</Text>
            ) : null}
          </Box>
          <Divider marginVertical="s" />

          <Text>Radio buttons</Text>
          {radioButtonOptions.map(option => (
            <Box key={option} marginVertical="xs">
              <RadioButton
                variant="tertiary"
                text={option}
                active={selectedOption === option}
                onPress={() => setSelectedOption(option)}
              />
            </Box>
          ))}
          <Divider marginVertical="s" />

          <Text marginBottom="s">
            Ready for more? Let&apos;s explore native capabilities in the
            screen.
          </Text>
          <Button
            text="Next"
            size="l"
            onPress={() => {
              navigation.navigate('GettingStarted.NativeFeatures')
            }}
          />
          <Box marginTop="s">
            <Button
              text="Explore Stories"
              size="l"
              onPress={() => {
                navigation.navigate('Stories.Feed')
              }}
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}
