export const getTagColor = (tag: string) => {
  switch (tag) {
    case 'New':
      return 'bg-primary'
    case 'Hot':
      return 'bg-secondary'
    case 'Sale':
      return 'bg-destructive'
    default:
      return 'bg-muted'
  }
}
