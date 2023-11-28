import React from "react";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link } from "react-router-dom";
import {
  Typography,
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItemButton,
  Stack,
  Button,
  useTheme
} from "@mui/material";
import { useStateValue } from "../provider";
import { SET_DARK_MODE, SET_LIGHT_MODE } from "../provider/reducer";
export default function Sidebar({ isDrawer }) {
  const { dispatch } = useStateValue();
  const { darkMode } = useTheme();
  return (
    <>
      <Box
        sx={{
          display: {
            xs: isDrawer ? "block" : "none",
            md: "block"
          },
          backgroundColor: "background.lightBg",
          borderRight: "0.5px solid rgb(230, 227, 227)",
          position: "fixed",
          width: isDrawer
            ? "70%"
            : {
                xs: "100%",
                md: "220px"
              }
        }}
      >
        <Box sx={{ textAlign: "center", p: "15.5px" }}>
          <Link to="/dashboard">
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                color: darkMode ? "primary.inverseColor" : "primary.main"
              }}
            >
              ReactAdmin
            </Typography>
          </Link>
        </Box>
        <Divider />

        <List
          sx={{
            overflow: "auto",
            height: "calc(100vh - 58px)",
            ".MuiTypography-root": {
              fontWeight: "bold"
            },
            ".MuiListItemIcon-root": {
              color: "primary.main",
              minWidth: "30px"
            }
          }}
        >
          {[
            {
              group: "Main",
              children: [
                {
                  icon: DashboardIcon,
                  text: "Dashboard",
                  to: "/dashboard"
                }
              ]
            },
            {
              group: "Lists",
              children: [
                {
                  icon: PersonOutlineIcon,
                  text: "Users",
                  to: "/dashboard/users"
                },
                {
                  icon: StoreIcon,
                  text: "Products"
                },
                {
                  icon: CreditCardIcon,
                  text: "Orders"
                },
                {
                  icon: LocalShippingIcon,
                  text: "Delivery"
                }
              ]
            },
            {
              group: "Useful",
              children: [
                {
                  icon: InsertChartIcon,
                  text: "Stats"
                },
                {
                  icon: ChatBubbleOutlineOutlinedIcon,
                  text: "Chats",
                  nullify: !isDrawer
                },
                {
                  icon: NotificationsNoneIcon,
                  text: "Notifications"
                }
              ]
            },
            {
              group: "Service",
              children: [
                {
                  icon: SettingsSystemDaydreamOutlinedIcon,
                  text: "System Health"
                },
                {
                  icon: PsychologyOutlinedIcon,
                  text: "Logs"
                },
                {
                  icon: SettingsApplicationsIcon,
                  text: "Settings"
                }
              ]
            },
            {
              group: "User",
              children: [
                {
                  icon: AccountCircleOutlinedIcon,
                  text: "Profile"
                },
                {
                  icon: ExitToAppIcon,
                  text: "Logout",
                  to: "/login"
                }
              ]
            }
          ].map((item, i) => (
            <div key={i}>
              <Typography
                sx={{
                  mt: i === 0 ? 0 : 2,
                  px: 2,
                  color: "primary.inverseColor"
                }}
                key={i}
                component="li"
              >
                {item.group}
              </Typography>
              {item.children.map((item, j) =>
                item.nullify ? null : (
                  <Link
                    key={j}
                    to={item.to || ""}
                    style={{
                      display: "inline-flex",
                      minWidth: "100%"
                    }}
                  >
                    <ListItemButton
                      component="li"
                      sx={{
                        "&:hover": {
                          backgroundColor: "primary.light"
                        }
                      }}
                    >
                      <ListItemIcon>
                        <item.icon
                          sx={{
                            color: darkMode
                              ? "primary.inverseColor"
                              : "primary.main"
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "caption",
                          color: darkMode
                            ? "primary.contrastText"
                            : "primary.inverseColor"
                        }}
                      >
                        {item.text}
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                )
              )}
            </div>
          ))}
          <Typography
            sx={{
              mt: 2,
              px: 2
            }}
            component="li"
          >
            Theme
          </Typography>
          <Stack
            justifyContent="normal"
            sx={{
              p: 1,
              px: 2,
              ".MuiButton-root": {
                mx: 1,
                minWidth: "20px",
                minHeight: "20px",
                boxShadow: 2
              }
            }}
          >
            <Button
              sx={{
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#E8E8E8"
                }
              }}
              onClick={() =>
                dispatch({
                  type: SET_LIGHT_MODE
                })
              }
            />
            <Button
              sx={{
                backgroundColor: "#000",
                "&:hover": {
                  backgroundColor: "#2E2E2E"
                }
              }}
              onClick={() =>
                dispatch({
                  type: SET_DARK_MODE
                })
              }
            />
          </Stack>
        </List>
      </Box>
    </>
  );
}
