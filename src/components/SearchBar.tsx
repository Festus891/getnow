"use client";
import { useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ProductProps } from "../../type";
import Image from "next/image";
import { products, urlFor } from "@/lib/sanityClient";
import { AiOutlineClose } from "react-icons/ai";

const SearchBar = () => {
  const searchRef = useRef<HTMLDivElement | null>(null); // ✅ Correct typing; // Reference for search container
  const router = useRouter();
  //   const { productData } = useSelector((state: StateProps) => state.getNow);
  //   console.log("products to search", productData);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await products();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching  product data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle search filtering dynamically
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const results = productData.filter((product: ProductProps) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, productData]);

  // Save recent searches (Only full searches, no partial keywords)
  const handleSearch = () => {
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 5)]); // Store last 5 searches
    }
  };

  // Handle navigation to product details
  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`); // Redirects to product details page
    setSearchQuery(""); // Clear search bar
    setFilteredProducts([]); // Hide dropdown after selection
  };

  // ✅ Step 2: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredProducts([]); // Hide dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to clear recent searches
  const handleClearSearches = () => {
    setRecentSearches([]);
    setShowRecentSearches(false); // Hide dropdown
  };

  return (
    <div ref={searchRef} className="relative w-full lg:w-[600px]">
      {/* Search Bar */}
      <div className="flex h-10 border border-black rounded-md px-4 items-center gap-2">
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 h-full outline-none bg-transparent placeholder:text-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Save search on Enter
          //   onKeyDown={(e) => {
          //     if (e.key === "Enter") {
          //       handleSearch();
          //     }
          //   }}
        />
        {searchQuery ? (
          <IoCloseOutline
            className="w-5 h-5 hover:text-red-500 duration-200 cursor-pointer"
            onClick={() => setSearchQuery("")}
          />
        ) : (
          <FaSearch className="w-5 h-5 cursor-pointer" />
        )}
      </div>

      {/* Search Results Dropdown with Animation */}
      <AnimatePresence>
        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full bg-white border border-gray-300 shadow-lg mt-1 z-50 rounded-md max-h-60 overflow-y-auto"
          >
            {filteredProducts.map((product: ProductProps) => (
              <motion.div
                key={product._id}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() => handleProductClick(product?.slug?.current)}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={urlFor(product?.image).url()}
                  alt={product.title}
                  className="w-10 h-10 object-cover rounded-md"
                  width={10}
                  height={10}
                />
                <span>{product.title}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Searches in Grid Layout with Staggered Animation */}
      <AnimatePresence>
        {showRecentSearches &&
          recentSearches.length > 0 &&
          searchQuery === "" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full bg-white border border-gray-300 shadow-lg mt-1 z-50 rounded-md p-2"
            >
              <p className="text-gray-500 text-sm font-semibold mb-2">
                Recent Searches
              </p>
              <AiOutlineClose
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={handleClearSearches} // Close dropdown on click
              />
              <motion.div
                className="grid grid-cols-3 gap-2"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {},
                }}
              >
                {recentSearches.map((query, index) => (
                  <motion.div
                    ref={searchRef}
                    key={index}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer text-center"
                    onClick={() => setSearchQuery(query)}
                    whileHover={{ scale: 1.05 }}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    {query}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
