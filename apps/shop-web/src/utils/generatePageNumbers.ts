/**
 * 生成分页的页码列表
 *
 * 在 Pagination 组件中使用
 *
 * @param totalPages - 总页数
 * @param nowPage - 当前页
 */
export function generatePageNumbers(totalPages: number, nowPage: number) {
  const items = []

  if (totalPages <= 7) {
    // Show all pages if total is small
    for (let i = 1; i <= totalPages; i++) {
      items.push(i)
    }
  } else {
    // Always show first page
    items.push(1)

    if (nowPage > 4) {
      items.push('ellipsis-start')
    }

    // Calculate range around current page
    let start = Math.max(2, nowPage - 1)
    let end = Math.min(totalPages - 1, nowPage + 1)

    // Adjust range if near start or end
    if (nowPage <= 4) {
      end = 5
    } else if (nowPage >= totalPages - 3) {
      start = totalPages - 4
    }

    for (let i = start; i <= end; i++) {
      items.push(i)
    }

    if (nowPage < totalPages - 3) {
      items.push('ellipsis-end')
    }

    // Always show last page
    items.push(totalPages)
  }

  return items
}
