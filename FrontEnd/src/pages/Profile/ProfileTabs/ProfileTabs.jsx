import { Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import {
  PROFILE_INFO_ROUTE,
  PROFILE_PWD_ROUTE,
} from "../../../constants/routes";
import { Link } from "react-router-dom";

const ProfileTabs = (props) => {
  const { value, onChange } = props;

  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  const tabs = [
    { value: PROFILE_INFO_ROUTE, label: "Information" },
    { value: PROFILE_PWD_ROUTE, label: "Mot de passe" },
  ];
  return (
    <Tabs value={value} onChange={handleChange}>
      {tabs.map((elem, index) => {
        return (
          <Tab
            key={index}
            component={Link}
            to={elem.value}
            value={elem.value}
            label={
              <Typography
                variant="caption"
                sx={{
                  typography: {
                    fontSize: 16,
                    borderColor: "divider",
                    borderBottom: 1,
                  },
                }}
              >
                {elem.label}
              </Typography>
            }
          />
        );
      })}
    </Tabs>
  );
};

export default ProfileTabs;
