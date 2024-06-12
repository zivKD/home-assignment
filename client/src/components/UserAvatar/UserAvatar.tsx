import { IUser } from "@interfaces/user.interface";
import { Avatar, AvatarProps } from "@mui/material";
import { forwardRef } from "react";

type UserAvatarProps = AvatarProps & {
  user: IUser;
};

export const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, ...props }, ref) => {
    return <Avatar src={user.avatar} ref={ref} {...props}>
      {getNameInitials(user.name)}
    </Avatar>
  }
);

function getNameInitials(name: string): string {
  return name.split(" ").map(word => word[0]).join(".").toUpperCase();
}