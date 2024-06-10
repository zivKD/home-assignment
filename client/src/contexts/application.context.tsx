import { ILike } from "@interfaces/like.interface";
import { IPost, PartialPost } from "@interfaces/post.interface";
import { IUser } from "@interfaces/user.interface";
import { createContext, useContext } from "react";
import { ServiceContext } from "./service.context";
import { getRandomInt } from "@utils";

export const ApplicationContext = createContext({
    editPost: async (post: PartialPost): Promise<void>  => {},
    createPost: async (post: IPost): Promise<void>  => {},
    deletePost: async (id: number): Promise<void>  => {},
    likePost: async (user: IUser, post: IPost): Promise<void> => {}
});

export const ApplicationContextProvider = ({activeUser, setPosts, posts, children}: {activeUser: IUser, setPosts: (posts: IPost[]) => void, posts: IPost[], children: React.ReactNode}) => {
  const {postService, userService, likeService} = useContext(ServiceContext);

  const createPost = async (newPost: PartialPost) => {
    newPost.date = (new Date(Date.now())).toISOString();
    newPost.userId = activeUser?.id;
    await postService.add(newPost);
    setPosts([newPost as IPost, ...posts]);
  };

  const deletePost = async (postId: number) => {
    await postService.deleteById(postId);
    const indexToRemove = posts.findIndex(post => post.id === postId);

    if (indexToRemove !== -1) {
      posts.splice(indexToRemove, 1);
      setPosts([...posts]);
    }
  }

  const editPost = async (updatedPost: PartialPost) => {
    await postService.edit(updatedPost);
    const postToUpdate = posts.find(post => post.id === updatedPost.id);
    if (postToUpdate !== undefined) {
      Object.assign(postToUpdate, updatedPost);
      setPosts([...posts]);
    }
  }

  const likePost = async (user: IUser, post: IPost) => {
    await likeService.add({id: getRandomInt(5000, 6000), userId: user.id, postId: post.id});
  }

  return (
    <ApplicationContext.Provider value={{
      createPost,
      deletePost,
      editPost,
      likePost
    }}>
        {children}
    </ApplicationContext.Provider>
  );
}
