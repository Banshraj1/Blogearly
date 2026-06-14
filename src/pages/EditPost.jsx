import React, { useState, useCallback, useEffect } from "react";
import { Container, PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import appwriteServices from "../appwrite/config";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteServices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
