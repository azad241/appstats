import { MonthlyData } from "@/lib/types";

export function formatMonthlyDataforThirtyDays(thisMonthData: MonthlyData, lastMonthData: MonthlyData) {
    const result: { day: number; thisMonth: number; lastMonth: number }[] = [];
  
    for (let day = 1; day <= 31; day++) {
      result.push({
        day,
        thisMonth: thisMonthData.data[day.toString()] ?? 0,
        lastMonth: lastMonthData.data[day.toString()] ?? 0
      });
    }
  
    return result;
  }

export function processDataforOverview(thisMonthData: MonthlyData, lastMonthData: MonthlyData) {
    let thisMonthTotal = 0;
    let lastMonthTotal = 0;
    let todayTotal = 0;
    let yesterdayTotal = 0;
  
    
    const thisMonthEntries = Object.entries(thisMonthData.data);
      const lastMonthEntries = Object.entries(lastMonthData.data);
  
      const thisMonthDays = thisMonthEntries.map(([day]) => parseInt(day));
      const maxDay = Math.max(...thisMonthDays);
      const secondMaxDay = Math.max(...thisMonthDays.filter(d => d !== maxDay));
  
      thisMonthEntries.forEach(([dayStr, value]) => {
        const day = parseInt(dayStr);
        thisMonthTotal += value;
  
        if (day === maxDay) {
          todayTotal = value;
        } else if (day === secondMaxDay) {
          yesterdayTotal = value;
        }
      });
  
      // Fallback: If today is 1st and yesterday is missing, pull from lastMonth
      if (maxDay === 1 && yesterdayTotal === 0 && lastMonthEntries.length > 0) {
        const lastMonthDays = lastMonthEntries.map(([day]) => parseInt(day));
        const lastDay = Math.max(...lastMonthDays);
        yesterdayTotal = lastMonthData.data[lastDay.toString()] || 0;
      }
  
      // Last Month Total
      Object.values(lastMonthData.data).forEach(value => {
        lastMonthTotal += value;
      });
  
    return {
      today: todayTotal,
      yesterday: yesterdayTotal,
      thisMonth: thisMonthTotal,
      lastMonth: lastMonthTotal,
    };
  }

export const DataFormater = (number: number) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + "B"
  } else if (number > 1000000) {
    return (number / 1000000).toString() + "M"
  } else if (number > 1000) {
    return (number / 1000).toString() + "K"
  } else {
    return number.toString()
  }
}

export function processAppNames(data: string[]) {
  return data.map((item: string) => {
    const parts = item.split('.');
    const title = parts.length === 3 ? parts[2] : item;
    return {
      title: title.toLowerCase(),
      url: "#"
    };
  });
}