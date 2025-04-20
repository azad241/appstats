
export interface  MonthlyData {
  month: string
    data: { [day: string]: number }
}

export interface combinedMonth {
  thisMonth: MonthlyData
  lastMonth: MonthlyData
}
