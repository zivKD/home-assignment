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

  const updateStatePost = async(updatePost: PartialPost) => {
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
    const newLike: ILike = {id: getRandomInt(5000, 6000), userId: user.id, postId: post.id};
    const hasSucceeded = await likeService.add(newLike);
    if(!hasSucceeded) return;
    if(post.likeCounter === undefined) {
      post.likeCounter = 1;
    } else post.likeCounter += 1;
    updateStatePost(post);

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
