import * as React from "react"

import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { fetchApiResponse } from "@/lib/functions"
import { processAppNames } from "@/lib/helper_functions"
// This is sample data.
const data = {
  navMain: [
    {
      title: "Quick Insights",
      url: "#",
      items: [
        {
          title: "Home",
          url: "#",
          isActive: true,
        },
        {
          title: "Apps Insights",
          url: "#",
        },
      ],
    },
    {
      title: "Advanced Reports",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Report 1",
          url: "#",
        },
        {
          title: "Report 2",
          url: "#",
        },
        {
          title: "Report 3",
          url: "#",
        }
      ],
    },
    {
      title: "Reveneue",
      url: "#",
      items: [
        {
          title: "Reveneue Type 1",
          url: "#",
        },
        {
          title: "Reveneue 2",
          url: "#",
        },
        {
          title: "Reveneue 3",
          url: "#",
        },
        {
          title: "Reveneue 4",
          url: "#",
        }
      ],
    },
  ],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [apiresponse, setApiresponse] = useState<{ title: string; url: string }[] | null>(null)

  useEffect(() => {

    const allAppsCacheData = localStorage.getItem('allAppsCacheData');
    const allAppsCacheTime = Number(localStorage.getItem('allAppsCacheTime'));
    const tenDays = 10 * 24 * 60 * 60 * 1000;

    if (allAppsCacheData && (Date.now() - allAppsCacheTime) < tenDays) {
      setApiresponse(processAppNames(JSON.parse(allAppsCacheData)));
    } else {
      fetchApiResponse('/all-apps/')
        .then(async data => {
          setApiresponse(processAppNames(data));
          localStorage.setItem('allAppsCacheData', JSON.stringify(data));
          localStorage.setItem('allAppsCacheTime', Date.now().toString());
        });
    }
  }, [])

  return (
    <Sidebar {...props}>
      <SidebarHeader>

        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* static group */}
        <SidebarGroup>
          <SidebarGroupLabel>Filter Apps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href='#'>All Apps</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {apiresponse && apiresponse.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href='#'>{item.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
