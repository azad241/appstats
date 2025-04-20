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

async function processAppNames(data: string[]) {
  return data.map((item: string) => {
    const parts = item.split('.');
    const title = parts.length === 3 ? parts[2] : item;
    return {
      title: title.toLowerCase(),
      url: "#"
    };
  });
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

   const [apiresponse, setApiresponse] = useState<{ title: string; url: string }[] | null>(null)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchApiResponse('/all-apps/');
          const processedData = await processAppNames(response);
          setApiresponse(processedData);
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      fetchData()
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
