import Navbar from "./components/navbar";
import Skyrim from "../../public/homepage.jpg";
import { FaGithub } from "react-icons/fa";


function Home() {
  return (
    <div className="bg-base-300">
      <Navbar />
      <main className="pt-20">




        {/* 第一部分 - 左文字右图片 */}
        <div className="hero bg-base-300 min-h-screen flex flex-col lg:flex-row">
          {/* 左侧 - 文字部分 */}
          <div className="flex mx-5 pt-3 flex-row lg:flex-col">

            <a
              href="https://github.com/Skyrim-line" // GitHub 链接
              target="_blank" // 在新标签页打开链接
              rel="noopener noreferrer" // 安全性增强
              className="text-gray-600 hover:scale-110 transition-transform duration-300 text-4xl"
            >
              <FaGithub />
            </a>


            <ul>Facebook</ul>
          </div>
          <div className="flex-1 flex flex-col justify-center items-start p-6 mx-6">
            <h1 className="text-5xl font-bold mb-6">Hello!</h1>
            <p className="py-6 text-lg">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>



          {/* 右侧 - 图片部分 */}
          <div className="flex-1 flex items-center justify-center ">
            <img
              src={Skyrim}
              alt="Skyrim"
              className="rounded-lg shadow-2xl w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="hero bg-base-300 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">Box Office News!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
