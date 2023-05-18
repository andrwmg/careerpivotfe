import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/system";
import React from "react";
import Dashboard from "./Dashboard";

export default function DashboardNav() {

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, maxWidth: '100%', overflow: 'hidden' }}
        >
            <TabPanel value="1" sx={{ px: 0, py: 4 }}>
                <Dashboard />
            </TabPanel>
            <TabPanel value="2">
            </TabPanel>
            <TabPanel value="3"></TabPanel>
            <TabPanel value="4" sx={{ px: 0, py: 4 }}>
            </TabPanel>
        </Box>
    )
}
