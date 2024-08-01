import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Homepost } from "../components/Homepost";
import { Navbar } from "../components/Navbar";
import { Loader } from "../components/Loader";
import { URL } from "../url";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const Home = () => {
  const { search } = useLocation();
  const [noResults, setNoResults] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const [showText, setShowText] = useState(true);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  useEffect(() => {
    setShowText(!user); // Show text if user is not logged in
  }, [user]);

  return (
    <>
      <Navbar />
      <hr className="  color-white" />
      <div className=" min-h-[80vh]">
        {loader ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {showText && (
              // <h3 className="text-center font-bold mt-16">
              //   Please login to view posts
              // </h3>
              <div className="bg-container bg-lime-500 h-screen">
                <div className="flex justify-between items-center px-10 ">
                  <div className="flex flex-col gap-10 ">
                    <h1 className="text-8xl font-bold text-white ">
                      Reliable & Affordable Waste Services
                    </h1>
                    <div>
                      <Link to="/register">
                        <button className="bg-yellow-300 text-dark font-bold px-5 py-2 rounded-md ">
                          Get Started
                        </button>
                      </Link>
                    </div>
                  </div>

                  <img
                    src="https://res.cloudinary.com/dewwjsltu/image/upload/v1712550083/Recycling-bro_ba3cag.svg"
                    alt=""
                    width="50%"
                  />
                </div>
              </div>
            )}
            {user && !noResults && (
              <div className="px-8 md:px-[200px] min-h-[80vh]">
                {posts.map((post) => (
                  <Link to={`posts/post/${post._id}`} key={post._id}>
                    <Homepost post={post} />
                  </Link>
                ))}
              </div>
            )}

            {/* {noResults && user && (
              <h3 className="text-center font-bold mt-16">
                No Posts Available
              </h3>
            )} */}
          </>
        )}
      </div>
      <hr className="color-white" />
      <Footer />
    </>
  );
};

export default Home;
