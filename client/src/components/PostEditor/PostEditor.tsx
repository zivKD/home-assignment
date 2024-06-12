import { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import "./styles.css";
import { IPost, PartialPost } from "@interfaces/post.interface";
import { ApplicationContext } from "@appContexts/application.context";
import { IUser } from "@interfaces/user.interface";
import { getRandomInt } from "@utils";

type PostEditorProps = {
  isOpened: boolean,
  close: () => void,
  user: IUser;
  post?: IPost;
};

export const PostEditor: React.FC<PostEditorProps> = ({ close, isOpened, post, user }) => {
  if(isOpened === false) return <></>;

  const [content, setContent] = useState<string>(post?.content || "");
  const [imageUrl, setImageUrl] = useState<string>(post?.imageUrl || "");
  const { createPost, editPost } = useContext(ApplicationContext);

  const reset = () => {
    setContent(post?.content || "");
    setImageUrl(post?.imageUrl || "");
  };

  const onSubmit = async () => {
    const defaultPost: IPost = { date: (new Date()).toISOString(), likeCounter: 0, userId: user.id, content, imageUrl, id: post?.id ?? getRandomInt(1000, 2000) }; 
    if(post) {
      await editPost({...post, content, imageUrl})
    } else { await createPost(defaultPost); }
    close();
    reset();
  };

  const onCancel = () => {
    close();
    reset();
  };

  return (
    <Dialog open={isOpened} onClose={onCancel}>
      <DialogTitle>New Post</DialogTitle>
      <DialogContent className="post-editor-content">
        <DialogContentText>
          Please note that both fields are optional.
        </DialogContentText>
        <TextField
          autoFocus
          label="Post content"
          variant="standard"
          value={content}
          multiline={true}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          label="Image url"
          variant="standard"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSubmit()}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};