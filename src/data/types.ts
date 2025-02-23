import pastOrdersData from './past-orders.json'

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  shopName: string
}

export interface Order {
  orderId: string
  orderDate: string
  items: OrderItem[]
  totalAmount: number
}

export interface PastOrders {
  pastOrders: Order[]
}

// Helper to import the JSON with types
export const getPastOrders = (): PastOrders => {
  return pastOrdersData
}
