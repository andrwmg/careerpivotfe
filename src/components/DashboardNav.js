import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/system";
import React from "react";
import GroupsPage from "../pages/Groups/GroupsPage";
import Dashboard from "./Dashboard";

export default function DashboardNav() {

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, maxWidth: '100%', overflow: 'hidden', '& .MuiTabPanel-root': {px: 0, py: 4}}}
        >
            <TabPanel value="1">
                {/* <Dashboard /> */}
            </TabPanel>
            <TabPanel value="2">
                {/* <GroupsPage /> */}
            </TabPanel>
            <TabPanel value="3">
                
            </TabPanel>
            <TabPanel value="4">
            </TabPanel>
        </Box>
    )
}
