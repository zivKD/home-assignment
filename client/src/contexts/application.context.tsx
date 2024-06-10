import { IBaseClient } from "@services/clients/base.client";
import { HttpClient } from "@services/clients/http/http.client";
import { LikeService } from "@services/like.service";
import { PostService } from "@services/post.service";
import { UserService } from "@services/user.service";
import { createContext, useMemo } from "react";

export const ApplicationContext = createContext({
    postService: {} as PostService, 
    userService: {} as LikeService, 
    likeService: {} as UserService, 
});

export const ApplicationContextProvider = ({children}: {children: React.ReactNode}) => {
    const postService = useMemo(() => new PostService(new HttpClient('posts')), []);
    const userService = useMemo(() => new UserService(new HttpClient('users')), []);
    const likeService = useMemo(() => new LikeService(new HttpClient('likes')), []);

      return (
        <ApplicationContext.Provider value={{ postService, userService, likeService }}>
          {children}
        </ApplicationContext.Provider>
      );
};