import { ILike } from "@interfaces/like.interface";
import { IPost, PartialPost } from "@interfaces/post.interface";
import { IUser } from "@interfaces/user.interface";
import { createContext, useContext } from "react";
import { ServiceContext } from "./service.context";
import { getRandomInt } from "@utils";

export const ApplicationContext = createContext({
  editPost: async (post: PartialPost): Promise<void> => { },
  createPost: async (post: IPost): Promise<void> => { },
  deletePost: async (id: number): Promise<void> => { },
  likePost: async (user: IUser, post: IPost): Promise<void> => { },
  usersWhoLiked: async(post: IPost): Promise<IUser[]> => []
});

export const ApplicationContextProvider = ({ activeUser, setPosts, posts, users, children }: { activeUser: IUser, users: IUser[], setPosts: (posts: IPost[]) => void, posts: IPost[], children: React.ReactNode }) => {
  const { postService, userService, likeService } = useContext(ServiceContext);

  const createPost = async (newPost: PartialPost) => {
    newPost.date = (new Date(Date.now())).toISOString();
    newPost.userId = activeUser?.id;
    await postService.add(newPost);
    setPosts([newPost as IPost, ...posts]);
  };

  const deletePost = async (postId: number) => {
    const response = await postService.deleteById(postId);
    if (response) {
      const indexToRemove = posts.findIndex(post => post.id === postId);

      if (indexToRemove !== -1) {
        posts.splice(indexToRemove, 1);
        setPosts([...posts]);
      }
    }
  }

  const updateStatePost = async (updatePost: PartialPost) => {
    const postToUpdate = posts.find(post => updatePost.id === post.id);
    if (postToUpdate !== undefined) {
      Object.assign(postToUpdate, updatePost);
      setPosts([...posts]);
    }
  }

  const editPost = async (updatedPost: PartialPost) => {
    await postService.edit(updatedPost);
    updateStatePost(updatedPost);
  }

  const likePost = async (user: IUser, post: IPost) => {
    const newLike: ILike = { id: getRandomInt(5000, 6000), userId: user.id, postId: post.id };
    const shouldAddLike = await likeService.add(newLike);
    if (!shouldAddLike) {
      post.likeCounter -= 1;
    };
    if (post.likeCounter === undefined) {
      post.likeCounter = 1;
    } else post.likeCounter += 1;
    updateStatePost(post);

  }

  const usersWhoLiked = async(post: IPost) => {
    const likes = await likeService.getByPostId(post.id);
    const userIdList = likes.map(like => like.userId);
    return users.filter(user => userIdList.includes(user.id))
  }

  return (
    <ApplicationContext.Provider value={{
      createPost,
      deletePost,
      editPost,
      likePost,
      usersWhoLiked
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}
