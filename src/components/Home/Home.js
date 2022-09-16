import "./home.scss";

import Feed from "../Feed/Feed";
import Pagination from "../Pagination/Pagination";

const Home = ({ posts, postsPerPage, totalPosts, paginate }) => {
  return (
    <>
      {posts.length ? (
        <>
          <main className="Home">
            <Feed posts={posts} />
          </main>
        </>
      ) : (
        <p
          style={{
            fontSize: "50px",
          }}
        >
          آگهی ای وجود ندارد!!
        </p>
      )}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts.length}
        paginate={paginate}
      />
    </>
  );
};

export default Home;
