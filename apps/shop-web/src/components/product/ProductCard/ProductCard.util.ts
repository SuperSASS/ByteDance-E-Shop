export const getTagColor = (tag: string) => {
  switch (tag) {
    case 'New':
      return 'bg-blue-500'
    case 'Hot':
      return 'bg-red-500'
    case 'Sale':
      return 'bg-green-500'
    default:
      return 'bg-muted'
  }
}
