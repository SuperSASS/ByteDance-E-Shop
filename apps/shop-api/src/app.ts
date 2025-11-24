import express from 'express'
import cors from 'cors'
import { DB } from './db'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// --- Products API ---

/**
 * 获取商品列表
 *
 * 筛选参数：
 *
 * 1. Keyword (商品名称)
 * 2. Category (主分类)
 * 3. Price Range (价格范围): minPrice, maxPrice
 * 4. Rating (评分): minRating
 * 5. Tags (标签: New, Hot, Sale)
 * 6. Dynamic Attributes (动态属性，子分类)
 *
 * sort排序参数：
 *
 * 1. price_asc (价格升序)
 * 2. price_desc (价格降序)
 * 3. sales_asc (销量升序)
 * 4. sales_desc (销量降序)
 * 5. newest (最新)
 * 6. oldest (最旧)
 *
 * 分页参数：
 *
 * 1. page (页码)
 * 2. pageSize (每页大小)
 */
app.get('/products', (req, res) => {
  let filtered = [...DB.products] // 获取所有商品
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    minRating,
    tags,
    sort,
    page = '1',
    pageSize = '12',
  } = req.query

  // 1. Keyword (商品名称)
  if (keyword) {
    const k = String(keyword).toLowerCase()
    filtered = filtered.filter((p) =>
      Object.values(p.name).some((v) => v.toLowerCase().includes(k))
    )
  }

  // 2. Category
  if (category) {
    filtered = filtered.filter((p) => p.mainCategory === category)
  }

  // 3. Price Range
  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= Number(minPrice))
  }
  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice))
  }

  // 4. Rating
  if (minRating) {
    filtered = filtered.filter((p) => p.rating >= Number(minRating))
  }

  // 5. Tags (New, Hot, Sale)
  if (tags) {
    const tagList = Array.isArray(tags) ? tags : [tags]
    const now = new Date()
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1))

    filtered = filtered.filter((p) => {
      return tagList.every((tag: any) => {
        if (tag === 'New') return new Date(p.createdAt) > oneMonthAgo
        if (tag === 'Hot') return p.sales > 100
        if (tag === 'Sale') return p.originalPrice && p.originalPrice > p.price
        return true
      })
    })
  }

  // 6. Dynamic Attributes
  // Exclude known query params to find attribute filters
  const knownParams = [
    'keyword',
    'category',
    'minPrice',
    'maxPrice',
    'minRating',
    'sort',
    'page',
    'pageSize',
    'tags',
  ]
  Object.keys(req.query).forEach((key) => {
    if (!knownParams.includes(key)) {
      const value = req.query[key]
      if (value) {
        filtered = filtered.filter((p) => (p.attributes as any)[key] === value)
      }
    }
  })

  // 7. Sort
  if (sort) {
    switch (sort) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'sales_desc':
        filtered.sort((a, b) => b.sales - a.sales)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
    }
  }

  // 8. Pagination
  const p = Number(page) || 1
  const ps = Number(pageSize) || 12
  const total = filtered.length
  const start = (p - 1) * ps
  const items = filtered.slice(start, start + ps)

  res.json({
    items,
    total,
    page: p,
    pageSize: ps,
  })
})

/**
 * 获取商品详情
 */
app.get('/products/:id', (req, res) => {
  const product = DB.products.find((p) => p.id === req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

// --- Auth API ---

/**
 * 登录
 */
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  const user = DB.users.find((u) => u.email === email && u.password === password)

  if (user) {
    const { password, ...userWithoutPass } = user
    res.json({ user: userWithoutPass, token: `mock-jwt-token-${user.id}` }) // 这里 mock 一个 JWT token
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

/**
 * 获取当前登录用户信息
 */
app.get('/auth/me', (req, res) => {
  // 按照 mock 的 JWT token 进行验证
  const token = req.headers.authorization?.split(' ')[1]
  if (token?.startsWith('mock-jwt-token-')) {
    const userId = parseInt(token.split('-')[1])
    const user = DB.users.find((u) => u.id === userId)
    if (user) {
      const { password, ...userWithoutPass } = user
      res.json(userWithoutPass)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
