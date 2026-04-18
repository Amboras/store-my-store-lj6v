import Image from 'next/image'
import Link from 'next/link'
import { getProductImage } from '@/lib/utils/placeholder-images'
import ProductPrice, { isProductSoldOut, type VariantExtension } from './product-price'

interface ProductCardProps {
  product: any
  variantExtensions?: Record<string, VariantExtension>
}

export default function ProductCard({ product, variantExtensions }: ProductCardProps) {
  const variant = product.variants?.[0]
  const calculatedPrice = variant?.calculated_price

  const currency = calculatedPrice?.currency_code || 'usd'
  const currentAmount = calculatedPrice?.calculated_amount
  const ext = variant?.id ? variantExtensions?.[variant.id] : null

  const soldOut = isProductSoldOut(product.variants || [], variantExtensions)
  const hasDiscount = ext?.compare_at_price != null && currentAmount != null && ext.compare_at_price > currentAmount

  return (
    <Link href={`/products/${product.handle}`} className="group block" prefetch={true}>
      <div className="space-y-3">
        {/* Product Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted/40">
          <Image
            src={getProductImage(product.thumbnail, product.id)}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${soldOut ? 'opacity-40' : ''}`}
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
               style={{ background: 'radial-gradient(400px 200px at 50% 100%, hsl(188 95% 55% / 0.15), transparent 70%)' }} />
          {soldOut && (
            <div className="absolute top-3 left-3 bg-background/80 backdrop-blur border border-border text-foreground text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded">
              Sold Out
            </div>
          )}
          {!soldOut && hasDiscount && (
            <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded bg-accent/15 text-accent border border-accent/40 backdrop-blur">
              Sale
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1 px-0.5">
          <h3 className={`text-sm font-medium line-clamp-1 transition-colors group-hover:text-accent ${soldOut ? 'text-muted-foreground' : 'text-foreground'}`}>
            {product.title}
          </h3>
          <ProductPrice
            amount={currentAmount}
            currency={currency}
            compareAtPrice={ext?.compare_at_price}
            soldOut={soldOut}
            size="card"
          />
        </div>
      </div>
    </Link>
  )
}
