import express from 'express'
import cors from 'cors'
import { DB } from './db'
import { toProductDTO, toUserDTO } from './utils'
import {
  LoginRequest,
  LoginResponse,
  AuthErrorResponse,
  ProductListResponse,
  UserDTO,
} from '@e-shop/shared'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// 请求日志中间件
app.use((req, res, next) => {
  const timestamp = new Date().toISOString()
  const startTime = Date.now()

  // 记录请求信息
  console.log(`${'='.repeat(60)}`)
  console.log(`📥 [${timestamp}] ${req.method} ${req.path}`)

  if (req.query && Object.keys(req.query).length > 0) {
    console.log('   Query:', JSON.stringify(req.query, null, 2))
  }

  if (req.body && Object.keys(req.body).length > 0) {
    // 隐藏敏感信息（如密码）
    const sanitizedBody = { ...req.body }
    if (sanitizedBody.password) {
      sanitizedBody.password = '***'
    }
    console.log('   Body:', JSON.stringify(sanitizedBody, null, 2))
  }

  // 拦截响应
  const originalJson = res.json.bind(res)
  res.json = function (body: any) {
    const duration = Date.now() - startTime
    console.log(`📤 Response: ${res.statusCode} (${duration}ms)`)

    // 只在开发环境输出响应体（避免大量数据）
    if (res.statusCode >= 400) {
      // 错误响应总是显示
      console.log('   Error:', JSON.stringify(body, null, 2))
    } else if (Array.isArray(body)) {
      console.log(`   Data: Array with ${body.length} items`)
    } else if (body && typeof body === 'object') {
      // 成功响应显示简化信息
      const keys = Object.keys(body)
      if (keys.includes('items') && keys.includes('total')) {
        // 列表响应
        console.log(
          `   Data: { items: ${body.items?.length || 0}, total: ${body.total}, page: ${body.page} }`
        )
      } else {
        // 其他对象响应
        console.log(`   Data: { ${keys.slice(0, 5).join(', ')}${keys.length > 5 ? ', ...' : ''} }`)
      }
    }
    console.log('='.repeat(60))

    return originalJson(body)
  }

  next()
})

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
 * 1. sales_desc (销量降序)（默认）
 * 2. sales_asc (销量升序)
 * 3. price_desc (价格降序)
 * 4. price_asc (价格升序)
 * 5. newest (最新)
 * 6. oldest (最旧)
 *
 * 分页参数：
 *
 * 1. page (页码)
 * 2. pageSize (每页大小)
 */
app.get(
  '/products',
  (req: express.Request<URLSearchParams>, res: express.Response<ProductListResponse>) => {
    // 直接从 DB 中获取到所有商品数据
    const products = [...DB.products] // ProductEntity[]

    // 转换为 DTO (添加 tags)
    let items = products.map(toProductDTO)

    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      minRating,
      tags,
      sort = 'sales_desc',
      page = '1',
      pageSize = '12',
    } = req.query

    // 1. Keyword (商品名称)
    if (keyword) {
      const k = String(keyword).toLowerCase()
      items = items.filter((p) => Object.values(p.name).some((v) => v.toLowerCase().includes(k)))
    }

    // 2. Category
    if (category) {
      items = items.filter((p) => p.mainCategory === category)
    }

    // 3. Price Range
    if (minPrice) {
      items = items.filter((p) => p.price >= Number(minPrice))
    }
    if (maxPrice) {
      items = items.filter((p) => p.price <= Number(maxPrice))
    }

    // 4. Rating
    if (minRating) {
      items = items.filter((p) => p.rating >= Number(minRating))
    }

    // 5. Tags (New, Hot, Sale) - 在加上 tags 的 ProductDTO 上筛选
    if (tags) {
      const tagList = Array.isArray(tags) ? tags : [tags]
      // 验证并转换为有效的 Tag 类型
      const validTags = tagList
        .map((t) => String(t))
        .filter((t): t is 'New' | 'Hot' | 'Sale' => t === 'New' || t === 'Hot' || t === 'Sale')
      items = items.filter((p) => validTags.every((tag) => p.tags.includes(tag)))
    }

    // 6. Dynamic Attributes
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
          items = items.filter((p) => (p.attributes as any)[key] === value)
        }
      }
    })

    // 7. Sort
    switch (sort) {
      case 'sales_desc':
        items.sort((a, b) => b.sales - a.sales)
        break
      case 'sales_asc':
        items.sort((a, b) => a.sales - b.sales)
        break
      case 'price_desc':
        items.sort((a, b) => b.price - a.price)
        break
      case 'price_asc':
        items.sort((a, b) => a.price - b.price)
        break
      case 'newest':
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
    }

    // 8. Pagination
    const p = Number(page)
    const ps = Number(pageSize)
    const total = items.length
    const start = (p - 1) * ps
    const result = items.slice(start, start + ps)

    // 增加随机延时（0s，1s，5s三种选项）
    const delay_options = [0, 1000, 5000]
    const delay = delay_options[Math.floor(Math.random() * delay_options.length)]
    setTimeout(() => {
      res.json({
        items: result,
        total,
        page: p,
        pageSize: ps,
      })
    }, delay)
  }
)

/**
 * 获取商品详情
 */
app.get('/products/:id', (req, res) => {
  const entity = DB.products.find((p) => p.id === req.params.id)
  if (entity) {
    // ✅ 转换为 DTO
    res.json(toProductDTO(entity))
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

// --- Auth API ---

/**
 * 登录
 */
app.post(
  '/auth/login',
  (
    req: express.Request<LoginRequest>,
    res: express.Response<LoginResponse | AuthErrorResponse>
  ) => {
    const { email, password } = req.body
    const user = DB.users.find((u) => u.email === email && u.password === password)

    if (user) {
      // 转换为 DTO (移除 password)
      res.json({ user: toUserDTO(user), token: `mock-jwt-token-${user.id}` })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  }
)

/**
 * 获取当前登录用户信息
 */
app.get('/auth/me', (req: express.Request, res: express.Response<UserDTO | AuthErrorResponse>) => {
  // 按照 mock 的 JWT token 进行验证
  const token = req.headers.authorization?.split(' ')[1]
  if (token?.startsWith('mock-jwt-token-')) {
    const userId = parseInt(token.split('-')[3])
    const user = DB.users.find((u) => u.id === userId)
    if (user) {
      // 转换为 DTO
      res.json(toUserDTO(user))
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
})

app.listen(PORT, () => {
  console.log('='.repeat(60))
  console.log('🚀 Server started successfully!')
  console.log('='.repeat(60))
  console.log(`📍 Server running at http://localhost:${PORT}`)
  console.log('\n📊 Database Statistics:')
  console.log(`   - Products: ${DB.products.length} items`)
  console.log(`   - Users: ${DB.users.length} users`)
  console.log('\n👥 Available Test Users:')
  DB.users.forEach((user, index) => {
    console.log(`   ${index + 1}. Email: ${user.email}`)
    console.log(`      Password: ${user.password}`)
    console.log(`      Name: ${user.name}`)
  })
  console.log('\n📦 Product Categories:')
  const categoryCounts = DB.products.reduce(
    (acc, p) => {
      acc[p.mainCategory] = (acc[p.mainCategory] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`   - ${category}: ${count} products`)
  })
  console.log('\n' + '='.repeat(60))
  console.log('✅ Ready to accept requests...\n')
})
