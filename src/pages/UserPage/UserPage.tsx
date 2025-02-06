import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

export const UserPage = () => {
  const user = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    group: "Студент",
    avatarUrl: "https://www.example.com/avatar.jpg",
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Профиль пользователя
      </Typography>
      <Avatar
        alt={user.name}
        src={user.avatarUrl}
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="h6" mt={2}>
        {user.name}
      </Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Группа: {user.group}</Typography>
    </Box>
  );
};
