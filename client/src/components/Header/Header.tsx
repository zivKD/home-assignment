import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import "./styles.css";
import { UserAvatar } from "../UserAvatar";
import { IUser } from "@interfaces/user.interface";

type HeaderProps = {
  openPostEditor: () => void;
  activeUser?: IUser;
  changeUser?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ openPostEditor, changeUser, activeUser }) => {
  if(!activeUser) return;

  return (
    <AppBar position="static">
      <Toolbar disableGutters className="app-toolbar">
        <Tooltip title="Switch User">
          <IconButton onClick={changeUser}>
            <UserAvatar user={activeUser} className="user-avatar"/>
          </IconButton>
        </Tooltip>
        <div>
          <Typography className="app-title main" variant="h6">
            BriefCam Social
          </Typography>
          <Typography className="app-title" variant="subtitle1" lineHeight={1}>
            {activeUser.name}
          </Typography>
        </div>
        <Tooltip title="Add Post">
          <IconButton onClick={openPostEditor}>
            <AddOutlined htmlColor="white" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};