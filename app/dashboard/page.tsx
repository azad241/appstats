"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {Breadcrumb, BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {SidebarInset,SidebarProvider,SidebarTrigger} from "@/components/ui/sidebar"
import OverView from "@/components/single/overview"
import Thirtydays from "@/components/single/thirtydays"
import AppsTrackingCount from "@/components/single/tracking-count"
import { useEffect, useState } from "react"
import { MonthlyData } from "@/lib/types"
import { fetchApiResponse } from "@/lib/functions"




export default function Page() {

  const [thisMonthData, setThisMonthData] = useState<MonthlyData | null>(null);
  const [lastMonthData, setLastMonthData] = useState<MonthlyData | null>(null);

  useEffect(() => {
    const now = new Date();
    const thisMonth = now.getMonth()+1; // 0-11: converted to 1-12
    const lastMonth = (thisMonth - 1 + 12) % 12; //converted to 1-12 based

    // Handle THIS MONTH
    const thisMonthCachedData = localStorage.getItem('thisMonthCachedData');
    const thisMonthCachedTime = Number(localStorage.getItem('thisMonthCatchedTime'));
    const tenMinutes = 10 * 60 * 1000;

    if (thisMonthCachedData && (Date.now() - thisMonthCachedTime) < tenMinutes) {
      setThisMonthData(JSON.parse(thisMonthCachedData));
    } else {
      fetchApiResponse('/this-month/')
        .then(data => {
          setThisMonthData(data);
          localStorage.setItem('thisMonthCachedData', JSON.stringify(data));
          localStorage.setItem('thisMonthCatchedTime', Date.now().toString());
        });
    }

    // Handle LAST MONTH
    const lastMonthCachedData = localStorage.getItem('lastMonthCachedData');
    const lastMonthCachedTime = Number(localStorage.getItem('lastMonthCachedTime'));

    if (lastMonthCachedData && lastMonthCachedTime === lastMonth) {
      setLastMonthData(JSON.parse(lastMonthCachedData));
    } else {
      fetchApiResponse('/last-month/')
        .then(data => {
          setLastMonthData(data);
          localStorage.setItem('lastMonthCachedData', JSON.stringify(data));
          localStorage.setItem('lastMonthCachedTime', lastMonth.toString());
        });
    }
  }, []);
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  AppStats
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>All Apps</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-2 md:p-4">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          <OverView thisMonthData={thisMonthData} lastMonthData={lastMonthData} />
          <AppsTrackingCount />
          <Thirtydays thisMonthData={thisMonthData} lastMonthData={lastMonthData} />
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
