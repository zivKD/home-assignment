import { IBaseClient } from "@services/clients/base.client";
import { HttpClient } from "@services/clients/http/http.client";
import { LikeService } from "@services/like.service";
import { PostService } from "@services/post.service";
import { UserService } from "@services/user.service";
import { createContext, useMemo } from "react";
import { config } from "../config/config.dev";

export const ServiceContext = createContext({
    postService: {} as PostService, 
    userService: {} as UserService, 
    likeService: {} as LikeService, 
});

export const ServiceContextProvider = ({children}: {children: React.ReactNode}) => {
    const postService = useMemo(() => new PostService(new HttpClient(config.postServiceURL, 'posts')), []);
    const userService = useMemo(() => new UserService(new HttpClient(config.userServiceURL, 'users')), []);
    const likeService = useMemo(() => new LikeService(new HttpClient(config.likeServiceURL, 'likes')), []);

      return (
        <ServiceContext.Provider value={{ postService, userService, likeService }}>
          {children}
        </ServiceContext.Provider>
      );
};