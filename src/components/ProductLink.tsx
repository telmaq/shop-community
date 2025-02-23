import {ProductVariantsRenderBeforeQueryData} from '../../targets/shop.product.variants.render-before/input.graphql'

export const ProductLink = ({product}: ProductVariantsRenderBeforeQueryData) => {
  return <div>{product?.title}</div>
}
