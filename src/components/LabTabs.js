import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Tabs } from '@mui/material';

export default function LabTabs({ tabHeaders, tabComponents }) {
  const [value, setValue] = React.useState(1);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    e.target.value = value;
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
            {
              tabHeaders.map((tabHeader) => {
                return <Tab label={tabHeader.label} key={tabHeader.label} value={tabHeader.value} />;
              })
            }
          </Tabs>
        </Box>
        {
          tabComponents.map((tabComponent) => {
            return <TabPanel value={tabComponent.value} key={tabComponent.value} >{tabComponent.component}</TabPanel>;
          })
        }
      </TabContext>
    </Box>
  );
}