# StarRating

一个可定制的星级评分组件，支持半星选择和自定义样式。

## Props

| Prop            | Type                      | Default | Description          |
| --------------- | ------------------------- | ------- | -------------------- |
| `value`         | `number`                  | -       | 当前评分值           |
| `onChange`      | `(value: number) => void` | -       | 评分改变时的回调函数 |
| `max`           | `number`                  | `5`     | 最大星数             |
| `className`     | `string`                  | -       | 容器的类名           |
| `iconClassName` | `string`                  | -       | 星星图标的类名       |

## Usage

```tsx
import { StarRating } from '@/components/ui/StarRatingFilter'
import { useState } from 'react'

export function MyComponent() {
  const [rating, setRating] = useState(0)

  return (
    <StarRating
      value={rating}
      onChange={setRating}
      max={5}
      className="gap-1"
      iconClassName="h-6 w-6"
    />
  )
}
```
