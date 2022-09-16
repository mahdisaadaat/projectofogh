import "./editPost.scss";

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import L from "leaflet";

const EditPost = ({
  posts,
  handleEdit,
  editBody,
  setEditBody,
  editPhoneNumber,
  setEditPhoneNumber,
  editAddress,
  setEditAddress,
  editLatitude,
  setEditLatitude,
  editLongitude,
  setEditLongitude,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditPhoneNumber(post.phoneNumber);
      setEditAddress(post.address);
      setEditLatitude(post.latitude);
      setEditLongitude(post.longitude);
      setEditBody(post.body);
    }
  }, [
    post,
    setEditPhoneNumber,
    setEditAddress,
    setEditBody,
    setEditLatitude,
    setEditLongitude,
  ]);

  useEffect(() => {
    const map = L.map("map").setView([35.689056, 51.389537], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    const onMapClick = (e) => {
      const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      const data = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };
      setEditLatitude(data.lat.toString());
      setEditLongitude(data.lng.toString());
    };
    map.on("click", onMapClick);
  }, []);
  return (
    <main className="postEdit">
      <div className="editPost">
        <h2>ویرایش آگهی</h2>
        <div id="map"></div>
        {editPhoneNumber && (
          <>
            <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="postTitle">شماره تماس: </label>
                <input
                  id="postTitle"
                  type="text"
                  required
                  value={editPhoneNumber}
                  onChange={(e) => setEditPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="postAddress">آدرس:</label>
                <input
                  id="postAddress"
                  type="text"
                  required
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="postBody">توضیحات: </label>
                <textarea
                  id="postBody"
                  required
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />
              </div>
              <button
                className="editButton"
                type="submit"
                onClick={() => handleEdit(post.id)}
              >
                ثبت
              </button>
              <Link to={`/post/${id}`}>
                <button className="goBack" type="submit">
                  برگشت
                </button>
              </Link>
            </form>
          </>
        )}
        {!editPhoneNumber && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default EditPost;
