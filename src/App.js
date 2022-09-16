//Components
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import NewPost from "./components/NewPost/NewPost";
import PostPage from "./components/PostPage/PostPage";
import EditPost from "./components/EditPost/EditPost";
import About from "./components/About/About";
import Missing from "./components/Missing/Missing";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/api";

function App() {
  const [posts, setPosts] = useState([]);
  const [postPhoneNumber, setPostPhoneNumber] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postLatitude, setPostLatitude] = useState(0);
  const [postLongitude, setPostLongitude] = useState(0);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //edit
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editLatitude, setEditLatitude] = useState("");
  const [editLongitude, setEditLongitude] = useState("");
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  //DarkNight
  const [darkNight, setDarkNight] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // status !== 200
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      post.address.includes(search)
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = new Date().toLocaleDateString("fa-IR-u-nu-latn");
    const newPost = {
      id,
      phoneNumber: postPhoneNumber,
      datetime,
      body: postBody,
      address: postAddress,
      latitude: postLatitude,
      longitude: postLongitude,
    };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostPhoneNumber("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = new Date().toLocaleDateString("fa-IR-u-nu-latn");
    const updatedPost = {
      id,
      phoneNumber: editPhoneNumber,
      datetime,
      body: editBody,
      address: editAddress,
      latitude: editLatitude,
      longitude: editLongitude,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditPhoneNumber("");
      setEditAddress("");
      setEditLatitude("");
      setEditLongitude("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("آیا مطمینید؟")) {
        await api.delete(`/posts/${id}`);
        const postsList = posts.filter((post) => post.id !== id);
        setPosts(postsList);
        navigate("/");
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  //get current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={darkNight ? "AppDark" : "App"}>
      <Header title="ثبت آگهی مسکن" />
      <Nav
        search={search}
        setSearch={setSearch}
        darkNight={darkNight}
        setDarkNight={setDarkNight}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              posts={currentPosts}
              postsPerPage={postsPerPage}
              totalPosts={posts}
              paginate={paginate}
            />
          }
        />
        <Route
          exact
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postPhoneNumber={postPhoneNumber}
              setPostPhoneNumber={setPostPhoneNumber}
              postBody={postBody}
              setPostBody={setPostBody}
              postAddress={postAddress}
              setPostAddress={setPostAddress}
              postLatitude={postLatitude}
              setPostLatitude={setPostLatitude}
              postLongitude={postLongitude}
              setPostLongitude={setPostLongitude}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editPhoneNumber={editPhoneNumber}
              setEditPhoneNumber={setEditPhoneNumber}
              editAddress={editAddress}
              setEditAddress={setEditAddress}
              editBody={editBody}
              setEditBody={setEditBody}
              editLatitude={editLatitude}
              setEditLatitude={setEditLatitude}
              editLongitude={editLongitude}
              setEditLongitude={setEditLongitude}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
