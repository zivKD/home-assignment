import { IBaseClient } from "@services/clients/base.client";
import { HttpClient } from "@services/clients/http/http.client";
import { LikeService } from "@services/like.service";
import { PostService } from "@services/post.service";
import { UserService } from "@services/user.service";
import { createContext, useMemo } from "react";

export const ServiceContext = createContext({
    postService: {} as PostService, 
    userService: {} as UserService, 
    likeService: {} as LikeService, 
});

export const ServiceContextProvider = ({children}: {children: React.ReactNode}) => {
    const postService = useMemo(() => new PostService(new HttpClient('posts')), []);
    const userService = useMemo(() => new UserService(new HttpClient('users')), []);
    const likeService = useMemo(() => new LikeService(new HttpClient('likes')), []);

      return (
        <ServiceContext.Provider value={{ postService, userService, likeService }}>
          {children}
        </ServiceContext.Provider>
      );
};