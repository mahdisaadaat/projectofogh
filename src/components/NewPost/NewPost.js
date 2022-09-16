import "./newPost.scss";

import L from "leaflet";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NewPost = ({
  handleSubmit,
  postPhoneNumber,
  setPostPhoneNumber,
  postBody,
  setPostBody,
  postAddress,
  setPostAddress,
  postLatitude,
  postLongitude,
  setPostLatitude,
  setPostLongitude,
}) => {
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
      setPostLatitude(data.lat.toString());
      setPostLongitude(data.lng.toString());
    };
    map.on("click", onMapClick);
  }, []);

  return (
    <main className="NewPost">
      <h2>آگهی خود را ثبت کنید</h2>
      <h3>لطفاً موقعیت مکانی مسکن را ثبت کنید</h3>
      <div id="map"></div>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="postPhoneNumber">شماره موبایل:</label>
          <input
            id="postPhoneNumber"
            type="text"
            required
            value={postPhoneNumber}
            onChange={(e) => setPostPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postAddress">آدرس:</label>
          <input
            id="postAddress"
            type="text"
            required
            value={postAddress}
            onChange={(e) => setPostAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postBody">توضیحات:</label>
          <textarea
            id="postBody"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
        </div>
        <button type="submit" className="submit">
          ثبت
        </button>
        <Link to="/">
          <button className="goBack">برگشت</button>
        </Link>
      </form>
    </main>
  );
};

export default NewPost;
