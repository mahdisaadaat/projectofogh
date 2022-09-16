import "./postPage.scss";

import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import L from "leaflet";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const item = posts.find((post) => post.id.toString() === id);
  const location = [item.latitude, item.longitude];

  useEffect(() => {
    const map = L.map("map").setView(location, 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    L.marker(location).addTo(map);
  }, []);
  return (
    <main className="PostPage">
      <article className="posts">
        {item && (
          <>
            <div id="map"></div>
            <h3>شماره تماس: {item.phoneNumber}</h3>
            <p>آدرس: {item.address}</p>
            <p className="postBody">{item.body}</p>
            <p className="postDate">{item.datetime}</p>
            <div className="buttons">
              <Link to={`/edit/${item.id}`}>
                <button className="editButton">ویرایش</button>
              </Link>
              <button
                className="deleteButton"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                حذف
              </button>
              <Link to="/">
                <button className="goBack">برگشت</button>
              </Link>
            </div>
          </>
        )}
        {!item && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
