
export interface  MonthlyData {
  month: string
    data: { [day: string]: number }
}

export interface combinedMonth {
  thisMonth: MonthlyData
  lastMonth: MonthlyData
}


export interface TrackingCount {
  app: string
  totalCount: number
}
export type ProcessedTrackingCount = {
  name: string;
  count: number;
};