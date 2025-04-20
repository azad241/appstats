/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChartIcon } from "lucide-react"
import { Separator } from "../ui/separator"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts"
import { LoadingWithText } from "../global/loading"
import { MonthlyData } from "@/lib/types"
import { formatMonthlyDataforThirtyDays, DataFormater } from "@/lib/helper_functions"

const MotionCard = motion(Card)
const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const theme: string = "light"
const getChartColors = () => {
  return {
    primary: theme === "dark" ? "#a78bfa" : "#0369A1",
    secondary: theme === "dark" ? "#4ade80" : "#BAE6F8",
    tertiary: theme === "dark" ? "#f472b6" : "#38BDF8",
    quaternary: theme === "dark" ? "#60a5fa" : "#0C4A6E",
    grid: theme === "dark" ? "#374151" : "#e5e7eb",
  }
}
const chartColors = getChartColors()

// Custom tooltip that prevents duplicate data keys
//@ts-ignore
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const processedKeys = new Set()
    const uniqueData = payload.filter((entry: { dataKey: unknown }) => {
      if (processedKeys.has(entry.dataKey)) {
        return false
      }
      processedKeys.add(entry.dataKey)
      return true
    })

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
          border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
          borderRadius: "6px",
          padding: "10px",
        }}
      >
        <p className="label">{`${label}`}</p>
        {/* @ts-ignore */}
        {uniqueData.map((entry, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

function Thirtydays({ thisMonthData, lastMonthData }: { thisMonthData: MonthlyData | null, lastMonthData: MonthlyData | null }) {
  
  return (
    <>
      <motion.div className="col-span-full" variants={slideUp} custom={5}>
        <MotionCard
          variants={slideUp}
          whileHover={{ boxShadow: theme === "dark" ? "0 0 15px rgba(255,255,255,0.1)" : "0 0 15px rgba(0,0,0,0.1)" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>This month vs Last Month</CardTitle>
              <LineChartIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription>Comparison of tracking volume between time periods (add app filter)</CardDescription>
            <Separator className="mt-4" />
          </CardHeader>
          {!thisMonthData && (<div className="h-[400px] flex items-center justify-center"><LoadingWithText/></div>)}
          {thisMonthData && lastMonthData && (
           <CardContent className="p-0 md:p-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={formatMonthlyDataforThirtyDays(thisMonthData, lastMonthData)} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis dataKey="day" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={DataFormater} />
                  <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                  <Legend />
                  <Bar
                    dataKey={"thisMonth"}
                    name="Current Period"
                    fill={chartColors.primary}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar
                    dataKey="lastMonth"
                    name="Previous Period"
                    fill={chartColors.secondary}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="thisMonth"
                    name="Current Trend"
                    stroke={chartColors.quaternary}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    animationDuration={2000}
                  />
                  <Line
                    type="monotone"
                    dataKey="lastMonth"
                    name="Previous Trend"
                    stroke={chartColors.tertiary}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    animationDuration={2000}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          )}
         
        </MotionCard>
      </motion.div>
    </>
  )
}

export default Thirtydays
