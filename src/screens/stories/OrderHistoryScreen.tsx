import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import pastOrdersData from '../../data/past-orders.json'

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`
}

interface OrderHistoryScreenProps {
  navigation: NativeStackNavigationProp<any>
  route: {params: {setImageUrls: (urls: string[]) => void, imageUrls: string[]}}
}

export const OrderHistoryScreen = ({
  navigation,
  route,
}: OrderHistoryScreenProps) => {
  const {imageUrls, setImageUrls} = route.params
  // Filter delivered orders and sort by date (newest first)
  const sortedOrders = [...pastOrdersData.pastOrders]
    .filter(order => order.status === 'delivered')
    .sort((firstOrder, secondOrder) => {
      return (
        new Date(secondOrder.orderDate).getTime() -
        new Date(firstOrder.orderDate).getTime()
      )
    })

  const handleProductPress = (item: (typeof sortedOrders)[0]['items'][0]) => {
    Alert.alert('Share Product', 'Do you want to post about this product?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes!',
        onPress: () => {
          navigation.navigate('Stories.CreatePost', {
            product: item,
            imageUrls,
            setImageUrls,
          })
        },
      },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      {sortedOrders.map(order => (
        <View key={order.orderId} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order #{order.orderId}</Text>
            <Text style={styles.orderDate}>{formatDate(order.orderDate)}</Text>
          </View>

          {order.items.map(item => (
            <TouchableOpacity
              key={item.productId}
              style={styles.productContainer}
              onPress={() => handleProductPress(item)}
            >
              <Image
                source={{uri: item.imageUrl}}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.shopName}>{item.shopName}</Text>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  Container: {
    marginBottom: 16,
  },
  delivered: {
    backgroundColor: '#e6f4ea',
    color: '#1e7e34',
  },
  processing: {
    backgroundColor: '#fff3e0',
    color: '#ef6c00',
  },
  shipped: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
  },
  in_transit: {
    backgroundColor: '#f3e5f5',
    color: '#7b1fa2',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  shopName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
})
