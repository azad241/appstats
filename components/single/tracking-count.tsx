"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3Icon } from "lucide-react"
import { Separator } from "../ui/separator"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Cell } from "recharts"
import { useEffect, useState } from "react"
import { fetchApiResponse } from "@/lib/functions"
import { LoadingWithText } from "../global/loading"
import {ProcessedTrackingCount, TrackingCount } from "@/lib/types"
import { getAppColors } from "@/lib/helper_functions"
import { DataFormater } from "@/lib/helper_functions"
export const appColors = getAppColors();

const MotionCard = motion(Card)
const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const theme: string = 'light';

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



function processTrackingCount(data: TrackingCount[]): ProcessedTrackingCount[] {
    const filteredData: ProcessedTrackingCount[] = [];

    data.forEach((item: TrackingCount) => {
        const parts = item.app.toLowerCase().split('.');
        if (parts.length === 3) {
            const appName = parts[2].replace('tracking', '');
            filteredData.push({ name: appName, count: item.totalCount });
        }
        else filteredData.push({name: item.app, count: item.totalCount});
    });

    return filteredData;
}

function AppsTrackingCount() {
    const [processedData, setProcessedData] = useState<ProcessedTrackingCount[] | null>(null);

    useEffect(() => {

        const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
        const today: string = now.toISOString().slice(0, 10); // e.g., "2025-04"
        
        const dataKey = 'trackingCountData';
        const timeKey = 'trackingCountTime';
        const cachedData = localStorage.getItem(dataKey);
        const cachedTime = Number(localStorage.getItem(timeKey));
        if (cachedData && (Date.now() - cachedTime) < 10*60*1000) {
            setProcessedData(JSON.parse(cachedData));
        } else {
            fetchApiResponse(`/tracking-count/?startDate=${today}`)
                .then(data => {
                    setProcessedData(processTrackingCount(data));
                    localStorage.setItem(dataKey, JSON.stringify(processTrackingCount(data)));
                    localStorage.setItem(timeKey, Date.now().toString());
                });
        }
    }, [])
    return (
        <>
            <motion.div className="col-span-full xl:col-span-2" variants={slideUp} custom={4}>
                <MotionCard
                    variants={slideUp}
                    whileHover={{ boxShadow: theme === "dark" ? "0 0 15px rgba(255,255,255,0.1)" : "0 0 15px rgba(0,0,0,0.1)" }}
                >
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle>Tracking by All Apps Today</CardTitle>
                            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardDescription>Distribution of tracking numbers across different apps</CardDescription>
                        <Separator className="mt-4" />
                    </CardHeader>
                     {!processedData && (<div className="h-[400px] flex items-center justify-center"><LoadingWithText/></div>)}
                    {processedData && (
                        <CardContent className="p-0 md:p-4">
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                                    <YAxis tickFormatter={DataFormater} />
                                    <Tooltip
                                        formatter={(value, name, props) => [value, props.payload.fullName]}
                                        labelFormatter={(label) => `App: ${label}`}
                                        contentStyle={{
                                            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                                            color: theme === "dark" ? "#ffffff" : "#000000",
                                            border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
                                            borderRadius: "6px",
                                            padding: "10px",
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="count" name="Tracked Items" radius={[4, 4, 0, 0]} animationDuration={1500}>
                                        {processedData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={appColors[entry.name]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    )}
                </MotionCard>
            </motion.div>
        </>
    )
}

export default AppsTrackingCount