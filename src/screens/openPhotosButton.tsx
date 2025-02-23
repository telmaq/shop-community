import {Button} from '@shopify/shop-minis-platform-sdk'
import ImagePicker from 'react-native-image-crop-picker'

export function OpenPhotosButton({
  setImageUrls,
  imageUrls,
  onSuccess,
}: {
  setImageUrls: (urls: string[]) => void
  imageUrls: string[]
  onSuccess: () => void
}) {
  const handleImageSelection = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
      setImageUrls([...imageUrls, image.path])
      onSuccess()
    } catch (error) {
      console.error('Error selecting image: ', error)
    }
  }

  return (
    <Button
      rightIcon="camera"
      text="Add pictures"
      onPress={handleImageSelection}
    />
  )
}
