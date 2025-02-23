import {Link} from '@shopify/shop-minis-ui-extensions'

import type {ProductVariantsRenderBeforeQueryData} from './input.graphql'
import seedData from './seed'

export function Render({
  extensionData,
}: {
  extensionData: ProductVariantsRenderBeforeQueryData | null
}) {
  // Here we are using seed data to populate the initial state of the link.
  // You can replace this with the actual data from `extensionData`
  console.log('Product data from input query:', extensionData?.product)
  const {actionText} = seedData

  return <Link actionText={actionText} />
}
