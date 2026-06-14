import React, { useState, useEffect, useId } from "react";
import appwriteServices from "../appwrite/config";
import { Container, Postcard } from "../components";
import { set } from "react-hook-form";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteServices
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex felx-wrap">
          {/* from here i have made some changes */}
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <span key={post.$id} className="p-2 w-1/4">
                <Postcard {...post} />
              </span>
            ))}
          </div>
          {/* {posts.map((post) => (
            <Postcard post={post} key={post.$id} />
          ))} */}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
