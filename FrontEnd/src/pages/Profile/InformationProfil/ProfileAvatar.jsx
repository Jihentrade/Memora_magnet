import React from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import Photo from "../../../assets/avatar.jpg";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={Photo}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {user.name} {user.lastname}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default Profile;
