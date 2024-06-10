import { ApplicationContextProvider } from "@appContexts/application.context";
import { ServiceContext } from "@appContexts/service.context";
import { IPost } from "@interfaces/post.interface";
import { IUser } from "@interfaces/user.interface";
import { getRandomUser } from "@utils";
import { useContext, useEffect, useMemo, useState } from "react";
import { Header, PostEditor, PostInstance } from "./components";

function App() {
  const {postService, userService, likeService} = useContext(ServiceContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);

  const openEditor = () => setIsPostEditorOpen(true);
  const closeEditor = () => setIsPostEditorOpen(false);

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users);
      setCurrentUser(getRandomUser(users))
    })

    postService.getAll().then((posts) => {
      setPosts(posts);
    })
  }, []);

  const usersById = useMemo(() => {
    const data: { [key: number]: IUser } = {};
    users.forEach(user => data[user.id] = user);
    return data;
  }, [users]);

  const changeUser = () => {
    setCurrentUser(getRandomUser(users));
  };


  return currentUser && (
    <ApplicationContextProvider activeUser={currentUser} setPosts={setPosts} posts={posts}>
      <Header activeUser={currentUser} changeUser={changeUser} openPostEditor={openEditor} />
      <div className="posts-container">
        {posts.sort((postA, postB) => new Date(postA.date) > new Date(postB.date) ? -1 : 1).map(post => {
          const postsUser = usersById[post.userId];

          return (
            postsUser &&
            <PostInstance
              key={post.id}
              user={postsUser}
              post={post}
              modifiable={currentUser?.id === postsUser.id}
            />
          );
        })}
      </div>
      <PostEditor isOpened={isPostEditorOpen} close={closeEditor} user={currentUser} />
    </ApplicationContextProvider>
  );
}

export default App;
