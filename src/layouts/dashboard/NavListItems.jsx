import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Button, Link, ListItem } from "@mui/material";
import { FaHandshake, FaUserAlt, FaChartArea } from "react-icons/fa";

const primaryNavItems = [
  {
    href: "/dashboard", //Only this first item needs / in front since it needs to go back to dashboard root
    icon: <FaChartArea />,
    text: "Dashboard",
  },
  // {
  //   href: "profile",
  //   icon: <FaUserAlt />,
  //   text: "Profile",
  // },
];

const secondaryNavItems = [
  {
    href: "data",
    icon: <DashboardIcon />,
    text: "Data",
  },
];

export const mainListItems = (
  <>
    {primaryNavItems.map((item) => (
      <ListItem key={item.href} component={Link} href={item.href}>
        <Button size="small" fullWidth sx={{ textAlign: "left" }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </Button>
      </ListItem>
    ))}
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Data
    </ListSubheader>
    {secondaryNavItems.map((item) => (
      <ListItem key={item.href} component={Link} href={item.href}>
        <Button size="small" fullWidth sx={{ textAlign: "left" }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </Button>
      </ListItem>
    ))}
  </>
);
