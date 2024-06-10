import { useContext, useState } from "react";
import { Card, CardHeader, CardMedia, CardContent, Typography, CardActions, IconButton, Badge } from "@mui/material";
import { Edit, Delete, ThumbUpAlt } from "@mui/icons-material";
import { UserAvatar } from "../UserAvatar";
import { Dialog } from "../Dialog";
import { PostEditor } from "../PostEditor";
import { IPost } from "@interfaces/post.interface";
import { IUser } from "@interfaces/user.interface";
import "./styles.css";
import { ApplicationContext } from "@appContexts/application.context";

type PostInstance = {
  modifiable?: boolean,
  post: IPost,
  user: IUser,
  currentUser: IUser,
};

export const PostInstance: React.FC<PostInstance> = ({ user, post, currentUser, modifiable: canModify = false }) => {
  const [isConfirmataionOpen, setIsConfirmataionOpen] = useState(false);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const { likePost, deletePost } = useContext(ApplicationContext);

  const openEditor = () => setIsPostEditorOpen(true);
  const closeEditor = () => setIsPostEditorOpen(false);
  const openConfirmation = () => setIsConfirmataionOpen(true);
  const closeConfirmation = () => setIsConfirmataionOpen(false);

  return (
    <>
      <Card className="post-item-container" sx={{ boxShadow: "none" }}>
        <CardHeader avatar={<UserAvatar user={user} />} title={user.name} subheader={post.date} />
        <CardMedia className="post-image" component="img" src={post.imageUrl} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {canModify &&
            <>
              <IconButton onClick={openEditor}>
                <Edit />
              </IconButton>
              <IconButton onClick={openConfirmation}>
                <Delete />
              </IconButton>
            </>
          }
          <IconButton sx={{ marginLeft: "auto" }} onClick={() => likePost(currentUser, post)}>
            <Badge badgeContent={post.likeCounter} color="primary" className="post-like-icon-badge">
              <ThumbUpAlt color="primary" />
            </Badge>
          </IconButton>
        </CardActions>
      </Card>

      <Dialog text={"Delete Post"} close={closeConfirmation} isOpened={isConfirmataionOpen} onConfirm={() => deletePost(post.id)} />
      <PostEditor isOpened={isPostEditorOpen} close={closeEditor} post={post} user={user}/>
    </>
  );
};