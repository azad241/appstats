"use client"
import React from 'react'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3Icon,
  TrendingUpIcon,
} from "lucide-react"
import { LoadingIcon } from '../global/loading'
import { combinedMonth } from '@/lib/types'

const MotionCard = motion(Card)
const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function processDataforOverview(data: combinedMonth[]) {
  let thisMonthTotal = 0;
  let lastMonthTotal = 0;
  let todayTotal = 0;
  let yesterdayTotal = 0;

  data.forEach(item => {
    const thisMonthEntries = Object.entries(item.thisMonth.data);
    const lastMonthEntries = Object.entries(item.lastMonth.data);

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
      yesterdayTotal = item.lastMonth.data[lastDay.toString()] || 0;
    }

    // Last Month Total
    Object.values(item.lastMonth.data).forEach(value => {
      lastMonthTotal += value;
    });
  });

  return {
    today: todayTotal,
    yesterday: yesterdayTotal,
    thisMonth: thisMonthTotal,
    lastMonth: lastMonthTotal,
  };
}




function OverView({ apiresponse }: { apiresponse: combinedMonth | null }) {

  const processData = processDataforOverview(apiresponse ? [apiresponse] : []);

  return (

    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4">
        <motion.div variants={slideUp} custom={0}>
          <MotionCard whileHover={{ y: -5, transition: { duration: 0.2 } }} variants={slideUp}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Today so far</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{!apiresponse ? <LoadingIcon /> : processData.today}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All
              </p>
            </CardContent>
          </MotionCard>
        </motion.div>

        <motion.div variants={slideUp} custom={1}>
          <MotionCard whileHover={{ y: -5, transition: { duration: 0.2 } }} variants={slideUp}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Yesterday</CardTitle>
              <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{!apiresponse ? <LoadingIcon /> : processData.yesterday}</div>
              <p className="text-xs text-muted-foreground mt-1">
                all
              </p>
            </CardContent>
          </MotionCard>
        </motion.div>

        <motion.div variants={slideUp} custom={2}>
          <MotionCard whileHover={{ y: -5, transition: { duration: 0.2 } }} variants={slideUp}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{!apiresponse ? <LoadingIcon /> : processData.thisMonth}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All App
              </p>
            </CardContent>
          </MotionCard>
        </motion.div>

        <motion.div variants={slideUp} custom={3}>
          <MotionCard whileHover={{ y: -5, transition: { duration: 0.2 } }} variants={slideUp}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Last Month</CardTitle>
              <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{!apiresponse ? <LoadingIcon /> : processData.lastMonth}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All App
              </p>
            </CardContent>
          </MotionCard>
        </motion.div>
      </div>

    </>
  )
}

export default OverView