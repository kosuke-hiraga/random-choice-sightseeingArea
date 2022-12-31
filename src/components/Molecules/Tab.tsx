import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ViewportState } from '../../mediaQuary/config';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            id={`simple-tabpanel-${index}`}
            hidden={value !== index}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ height: "100%" }}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div >
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

type Tab = {
    label: Array<String>,
    data: Array<React.ReactNode>
}

const sxTab = {
    padding: "3px 7px",
    "minWidth": "0px",
    fontSize: ViewportState === "mobile" ? "11px" : "14px"
}

export default function BasicTabs({ label, data }: Tab) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', height: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', height: "15%" }}>
                    <Tabs variant='fullWidth' value={value} onChange={handleChange} aria-label="basic tabs example" >
                        {label.map((label, index) => (
                            <Tab label={label} {...a11yProps(index)} key={index} sx={sxTab} />
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{ height: "85%" }}>
                    {data.map((data, index) => (
                        <TabPanel value={value} index={index} key={index} >
                            {data}
                        </TabPanel>
                    ))}
                </Box>
            </Box>
        </>
    );

}