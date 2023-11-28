import React, { useState } from "react";
import {
  AppBar,
  Input,
  Badge,
  IconButton,
  Stack,
  InputAdornment,
  Button,
  Drawer,
  Popover,
  ListItemButton
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useStateValue } from "../provider";
import { TOGGLE_THEME_MODE } from "../provider/reducer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { notifiCationData, chatData } from "../data";
import moment from "moment";
import { getCachedObj } from "../utils";
import man1 from "../images/man1.jpg";
import woman1 from "../images/woman1.jpg";

export default function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [popper, setPopper] = useState({});
  const {
    state: { darkMode },
    dispatch
  } = useStateValue();

  const user = getCachedObj();

  const renderPopperContent = () => {
    const renderIcon = (kind, image) => {
      switch (kind) {
        case "analytics":
          return <InsertChartIcon />;
        case "debit-transaction":
          return <CreditCardIcon />;
        case "new-user":
          return <PersonOutlineIcon />;
        default:
          return <Avatar alt={`${kind} icon`} src={image} />;
      }
    };
    switch (popper.openFor) {
      case "notifications":
      case "settings":
        return (
          <List>
            {notifiCationData.map((item, i) => (
              <>
                <ListItemButton
                  component="li"
                  alignItems="flex-start"
                  key={item.id}
                  sx={{
                    my: 0
                  }}
                  onClick={() => setPopper({ ...popper, anchorEl: null })}
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.light"
                    }
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      ".MuiSvgIcon-root": {
                        width: "40px",
                        height: "40px",
                        color: "primary.inverseColor"
                      }
                    }}
                  >
                    {renderIcon(item.kind, item.image)}
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.desc}
                    sx={{ color: "primary.inverseColor" }}
                    secondaryTypographyProps={{
                      sx: { color: "primary.inverseColor" }
                    }}
                    secondary={
                      <>
                        {moment(item.date).fromNow()}
                        {` — ${item.body}`}
                      </>
                    }
                  />
                </ListItemButton>
                {i !== notifiCationData.length - 1 && (
                  <Divider variant="inset" component="li" key={item.id} />
                )}
              </>
            ))}
          </List>
        );
      case "chats":
        return (
          <List>
            {chatData.map((chat, i) => (
              <>
                <ListItemButton
                  component="li"
                  alignItems="flex-start"
                  key={chat.id}
                  onClick={() => setPopper({ ...popper, anchorEl: null })}
                >
                  <ListItemAvatar>
                    <Avatar alt={`${chat.user} avatar`} src={chat.photoUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    secondaryTypographyProps={{
                      sx: {
                        color: "primary.inverseColor"
                      }
                    }}
                    secondary={
                      <>
                        {moment(chat.date).fromNow()}
                        {` — ${chat.message}`}
                      </>
                    }
                  />
                </ListItemButton>
                {i !== chatData.length - 1 && (
                  <Divider variant="inset" component="li" key={chat.id} />
                )}
              </>
            ))}
          </List>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          borderBottom: ({ palette: { divider } }) => `0.5px solid ${divider}`,
          backgroundColor: "background.default",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          width: {
            xs: "100%",
            md: "calc(100% - 220px)"
          },
          ml: "auto",
          ".MuiSvgIcon-root": {
            color: "primary.inverseColor"
          }
        }}
        elevation={0}
      >
        <Input
          disableUnderline
          sx={{
            border: "0.5px solid lightgray",
            pl: 1
          }}
          inputProps={{
            sx: {
              color: "primary.inverseColor"
            }
          }}
          placeholder="Search"
          endAdornment={
            <InputAdornment position="end" sx={{ cursor: "pointer" }}>
              <SearchOutlinedIcon />
            </InputAdornment>
          }
        />
        <Stack
          justifyContent="normal"
          sx={{
            display: {
              xs: "none",
              sm: "flex"
            },
            width: "auto",
            ".MuiIconButton-root": {
              "&:hover": {
                backgroundColor: "primary.light"
              }
            }
          }}
        >
          <Button
            sx={{
              alignItems: "center",
              justifyContent: "center",
              color: "primary.inverseColor",
              "&:hover": {
                backgroundColor: "primary.light"
              }
            }}
          >
            <LanguageOutlinedIcon sx={{ mx: 1 }} />
            English
          </Button>
          <IconButton
            onClick={() =>
              dispatch({
                type: TOGGLE_THEME_MODE
              })
            }
          >
            {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
          <IconButton
            onClick={({ currentTarget }) =>
              setPopper({ anchorEl: currentTarget, openFor: "notifications" })
            }
          >
            <Badge badgeContent={4} color="error" max={99}>
              <NotificationsNoneOutlinedIcon color="primary" />
            </Badge>
          </IconButton>
          <IconButton
            sx={{ ml: 1 }}
            onClick={({ currentTarget }) =>
              setPopper({ anchorEl: currentTarget, openFor: "chats" })
            }
          >
            <Badge badgeContent={100} color="error" max={99}>
              <ChatBubbleOutlineOutlinedIcon color="action" />
            </Badge>
          </IconButton>
          <Avatar
            src={
              user.photoUrl ||
              { joebright: man1, adebayoopeyemi: woman1 }[
                user.email.split("@")[0]
              ]
            }
            sx={{
              width: "32px",
              height: "32px",
              ml: 2,
              ".MuiSvgIcon-root": {
                color: "#000"
              }
            }}
          />
          <IconButton
            sx={{ mx: 1 }}
            onClick={({ currentTarget }) =>
              setPopper({ anchorEl: currentTarget, openFor: "settings" })
            }
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Stack>
        <IconButton
          sx={{
            display: {
              xs: "inline-flex",
              md: "none"
            }
          }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: "70%"
          }
        }}
      >
        <Sidebar isDrawer={openDrawer} />
      </Drawer>
      <Popover
        open={!!popper.anchorEl}
        anchorEl={popper.anchorEl}
        PaperProps={{
          elevation: 1,
          sx: {
            borderRadius: 5,
            width: "100%",
            maxWidth: "360px"
          }
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        onClose={() => {
          setPopper({
            ...popper,
            anchorEl: null
          });
        }}
      >
        {renderPopperContent()}
      </Popover>
    </>
  );
}
