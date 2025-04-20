export interface combinedMonth {
  thisMonth: {
    month: string
    data: { [day: string]: number }
  }
  lastMonth: {
    month: string
    data: { [day: string]: number }
  }
}