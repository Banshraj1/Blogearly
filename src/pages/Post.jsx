import React, { useEffect, useState } from "react";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  // console.log("");

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  // console.log(isAuthor);

  useEffect(() => {
    appwriteService
      .getPost(slug)
      .then((postData) => setPost(postData))
      .catch((err) => {
        console.log("error in fetching post data", err);
      });
  }, [slug]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id, post.featuredImage).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  console.log("post data=",post);
  return post ? (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-50">
              {/* Image */}
              <div className="flex-shrink-0 flex justify-center">
                <img
                  src={appwriteService.getFileUrl(post.featuredImage)}
                  alt={post.title}
                  className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover "
                />
              </div>

              {/* Title + Author */}
              <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center md:text-left">
                  {post.title}
                </h1>

                <p className="mt-8 text-base md:text-lg text-gray-500 text-center md:text-right">
                  By {post.authorName || "author"}
                </p>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white mt-8 rounded-3xl shadow-lg p-6 md:p-10">
            <div className="prose prose-lg max-w-none">
              {parse(post.content)}
            </div>

            {/* Buttons */}
            {isAuthor && (
              <div className="flex justify-end gap-4 mt-10 flex-wrap">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-600"
                    className="px-6 py-3 rounded-full hover:bg-green-700 transition-all"
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  bgColor="bg-red-600"
                  onClick={deletePost}
                  className="px-6 py-3 rounded-full hover:bg-red-700 transition-all"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
