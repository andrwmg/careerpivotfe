import TabPanel from "@mui/lab/TabPanel";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Dashboard from "./Dashboard";
import Posts from "./Posts";

export default function DashboardNav() {

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, maxWidth: '100%', overflow: 'hidden' }}
        >
            <Toolbar sx={{ height: '62px' }} />
            <TabPanel value="1" sx={{ px: 0, py: 4 }}>
                <Dashboard />
            </TabPanel>
            <TabPanel value="2">
                {/* <Posts /> */}
            </TabPanel>
            <TabPanel value="3"></TabPanel>
            <TabPanel value="4"></TabPanel>

            {/* <Dashboard /> */}
        </Box>
    )
}
