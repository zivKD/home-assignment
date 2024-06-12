import { ApplicationContext } from "@appContexts/application.context";
import { IPost } from "@interfaces/post.interface";
import { IUser } from "@interfaces/user.interface";
import { Delete, Edit, ThumbUpAlt } from "@mui/icons-material";
import { Badge, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Dialog } from "../Dialog";
import { PostEditor } from "../PostEditor";
import { UserAvatar } from "../UserAvatar";
import "./styles.css";

type PostInstance = {
  modifiable?: boolean,
  post: IPost,
  user: IUser,
  currentUser: IUser,
};

export const PostInstance: React.FC<PostInstance> = ({ user, post, currentUser, modifiable: canModify = false }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const { likePost, deletePost, usersWhoLiked } = useContext(ApplicationContext);
  const [likeList, setLikeList] = useState('loading...');

  const loadUsersWhoLiked = async () => {
    const users = await usersWhoLiked(post);
    const usersList = users.map(user => user.name).join(', ');
    setLikeList(usersList);
  }

  const openEditor = () => setIsPostEditorOpen(true);
  const closeEditor = () => setIsPostEditorOpen(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

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
              <IconButton onClick={openDialog}>
                <Delete />
              </IconButton>
            </>
          }
          <Tooltip title={likeList} onOpen={loadUsersWhoLiked} disableTouchListener>
            <IconButton sx={{ marginLeft: "auto" }} onClick={() => likePost(currentUser, post)}>
              <Badge badgeContent={post.likeCounter} color="primary" className="post-like-icon-badge">
                <ThumbUpAlt color="primary" />
              </Badge>
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <Dialog text={"Delete Post"} close={closeDialog} isOpened={isDialogOpen} onConfirm={() => deletePost(post.id)} />
      <PostEditor isOpened={isPostEditorOpen} close={closeEditor} post={post} user={user}/>
    </>
  );
};