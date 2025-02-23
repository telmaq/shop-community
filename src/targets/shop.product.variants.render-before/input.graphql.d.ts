import { DocumentNode } from "graphql-typed";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
export namespace ProductVariantsRenderBeforeQueryPartialData {
  export interface Product {
    __typename?: "Product" | null;
    id?: string | null;
    title?: string | null;
  }
  export interface Shop {
    __typename?: "Shop" | null;
    id?: string | null;
  }
}
export interface ProductVariantsRenderBeforeQueryPartialData {
  product?: ProductVariantsRenderBeforeQueryPartialData.Product | null;
  shop?: ProductVariantsRenderBeforeQueryPartialData.Shop | null;
}
export namespace ProductVariantsRenderBeforeQueryData {
  export interface Product {
    __typename: "Product";
    id: string;
    title: string;
  }
  export interface Shop {
    __typename: "Shop";
    id: string;
  }
}
export interface ProductVariantsRenderBeforeQueryData {
  product?: ProductVariantsRenderBeforeQueryData.Product | null;
  shop?: ProductVariantsRenderBeforeQueryData.Shop | null;
}
declare const document: DocumentNode<ProductVariantsRenderBeforeQueryData, never, ProductVariantsRenderBeforeQueryPartialData> & TypedDocumentNode<ProductVariantsRenderBeforeQueryData, {
  [key: string]: never;
}>;
export default document;