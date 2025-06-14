import { faker } from "@faker-js/faker";

import { createContext, useContext, useState } from "react";
import type { Post } from "../App";

type PostContextType = {
  posts: Post[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onClearPosts: () => void;
  onAddPost: (post: Post) => void;
};

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostContext = createContext<PostContextType | undefined>(undefined);

function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        searchQuery,
        setSearchQuery,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("PostContext must be used within a PostContext.Provider");
  return context;
};

export default PostProvider;
