import { createContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Archive from "./components/Archive";

export type Post = {
  title: string;
  body: string;
};

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

type PostContextType = {
  posts: Post[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onClearPosts: () => void;
  onAddPost: (post: Post) => void;
};

// 1) CREATE CONTEXT
export const PostContext = createContext<PostContextType | undefined>(
  undefined
);

function App() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post: Post) {
    setPosts((prev) => [post, ...prev]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode");
  }, [isFakeDark]);

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((prev) => !prev)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>
      {/* 2) PROVIDE VALUE TO CHILD COMPONENTS  */}
      <PostContext.Provider
        value={{
          posts: searchedPosts,
          searchQuery,
          setSearchQuery,
          onClearPosts: handleClearPosts,
          onAddPost: handleAddPost,
        }}
      >
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostContext.Provider>
    </section>
  );
}

export default App;
