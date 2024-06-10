import { useState } from "react";
import { Header } from "./components";
import { PostData, UserData } from "./types";
import { ApplicationContextProvider } from "./contexts/application.context";

function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);

  const openEditor = () => setIsPostEditorOpen(true);

  return (
    <ApplicationContextProvider>
      <Header openPostEditor={openEditor} />
      <div className="posts-wrapper"></div>
    </ApplicationContextProvider>
  );
}

export default App;
