const priorityColors = {
  0: '#F0F0F0',
  1: '#05FF05',
  2: '#FF0505',
}

export const getColorFromPriority = (priority) => {
  return priorityColors[priority];
}