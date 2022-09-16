import "./post.scss";

import { Link } from "react-router-dom";

const Posts = ({ post }) => {
  return (
    <article className="post">
      <Link
        to={`/post/${post.id}`}
        style={{ textDecoration: "none", color: "#000" }}
      >
        <p className="postBody">
          {post.address.length <= 25
            ? post.address
            : `${post.address.slice(0, 25)}...`}
        </p>
        <p className="postDate">{post.datetime}</p>
      </Link>
    </article>
  );
};

export default Posts;
