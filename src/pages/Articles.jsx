import { useEffect, useState, useMemo } from "react";
import { app } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [specificArticle, setSpecificArticle] = useState({
    bool: false,
    title: "",
    body: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const db = getFirestore(app);

  useEffect(() => {
    async function getCollectionDocuments() {
      const querySnapshot = await getDocs(collection(db, "articles"));
      setArticles(querySnapshot.docs.map((doc) => doc.data()));
    }

    getCollectionDocuments();
  }, []);

  // Memoized search results
  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (item) =>
        item.Title.toLowerCase().includes(query) ||
        item.Body.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && specificArticle.bool) {
        setSpecificArticle({ bool: false, title: "", body: "" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [specificArticle.bool]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-6">
      {/* Header */}
      <div className="border-2 border-primary px-4 py-4 rounded">
        <h1 className="text-xl font-bold">Articles</h1>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-gray-100 border-2 border-primary px-4 py-2 rounded"
      />

      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-6 overflow-y-scroll scrollbar-none sm:grid-cols-2 lg:grid-cols-4">
        {filteredArticles.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500">
            Loading Articles..
          </div>
        ) : (
          filteredArticles.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setSpecificArticle({
                  bool: true,
                  title: item.Title,
                  body: item.Body,
                })
              }
              className="border-2 rounded border-primary p-4 h-[250px] overflow-hidden gap-4 flex flex-col cursor-pointer"
            >
              <div className="font-bold text-xl line-clamp-2">{item.Title}</div>
              <div className="line-clamp-5">{item.Body}</div>
            </div>
          ))
        )}

        {/* Modal Overlay */}
        {specificArticle.bool && (
          <div className="absolute inset-0 flex items-center justify-center p-4 md:px-24 py-12 z-20">
            <div
              className="bg-black absolute inset-0 opacity-50 z-10"
              onClick={() =>
                setSpecificArticle({ bool: false, title: "", body: "" })
              }
            ></div>

            <div className="bg-white border-2 rounded-md border-primary px-12 py-6 overflow-hidden gap-4 h-full flex flex-col cursor-pointer z-20 w-full max-w-4xl">
              <button
                className="self-end bg-primary text-white px-4 py-2 rounded-md"
                onClick={() =>
                  setSpecificArticle({ bool: false, title: "", body: "" })
                }
              >
                Back
              </button>
              <div className="font-bold text-xl mb-2">
                {specificArticle.title}
              </div>
              <div className="overflow-y-scroll h-full scrollbar-none">
                {specificArticle.body}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles;
