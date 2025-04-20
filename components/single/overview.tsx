"use client"
import React from 'react'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3Icon,
  TrendingUpIcon,
} from "lucide-react"
import { LoadingIcon } from '../global/loading'
import {MonthlyData } from '@/lib/types'
import { processDataforOverview } from '@/lib/helper_functions'

const MotionCard = motion(Card)
const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}



function OverView({ thisMonthData, lastMonthData }: { thisMonthData: MonthlyData | null, lastMonthData: MonthlyData | null }) {

  const processData = processDataforOverview(thisMonthData || { month: "", data: {} }, lastMonthData || { month: "", data: {} });

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
              <div className="text-2xl font-bold">{!thisMonthData ? <LoadingIcon /> : processData.today}</div>
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
              <div className="text-2xl font-bold">{!thisMonthData ? <LoadingIcon /> : processData.yesterday}</div>
              <p className="text-xs text-muted-foreground mt-1">
                all
              </p>
            </CardContent>
          </MotionCard>
        </motion.div>

        <motion.div variants={slideUp} custom={2}>
          <MotionCard whileHover={{ y: -5, transition: { duration: 0.2 } }} variants={slideUp}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">This Month so far</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{!thisMonthData ? <LoadingIcon /> : processData.thisMonth}</div>
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
              <div className="text-2xl font-bold">{!thisMonthData ? <LoadingIcon /> : processData.lastMonth}</div>
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