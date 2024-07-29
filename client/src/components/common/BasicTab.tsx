import * as React from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

interface BasicTabProps {
  tabData: { value: string; label: string; content: any }[];
  data: any;
}

export default function BasicTab({ tabData = [], data = {} }: BasicTabProps) {
  const [value, setValue] = React.useState(() => {
    if (tabData.length > 0) return tabData[0].value;

    return "";
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  /**
   * TSX
   */
  return (
    <div className="bg-white rounded-md shadow-md border">
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {tabData.map((item, idx) => (
            <Tab key={idx} label={item?.label} value={item?.value} />
          ))}
        </TabList>
        {tabData.map(({ label, content: ContentComponent }, idx) => (
          <TabPanel key={idx} value={label}>
            {typeof ContentComponent === "function" ? (
              <ContentComponent {...data} />
            ) : (
              ContentComponent
            )}
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}
