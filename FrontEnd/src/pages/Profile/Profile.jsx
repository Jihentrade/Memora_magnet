import React from "react";
import { Box } from "@mui/material";
import ProfileTabs from "./ProfileTabs/ProfileTabs";
import { Outlet } from "react-router";
import { PROFILE_INFO_ROUTE } from "../../constants/routes";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
const Profile = () => {
  const [selected, setSelected] = React.useState(PROFILE_INFO_ROUTE);
  return (
    <>
      <Navbar />
      <Box sx={{ mt: 5 }}>
        <ProfileTabs value={selected} onChange={setSelected} />
        <TabPanel>
          <Outlet />
        </TabPanel>
      </Box>
      <Footer />
    </>
  );
};

const TabPanel = (props) => {
  const { children, value, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      <Box sx={{ p: 3, borderTop: 1, borderColor: "divider" }}>{children}</Box>
    </div>
  );
};

export default Profile;
