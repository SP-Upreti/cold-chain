"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import TransitionLink from "./transition-link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavbarDropdown from "./navbar-dropdown";
import { ScrollArea } from "../ui/scroll-area";
import { useBrandStore } from "@/store/useBrandStore";
import ButtonNavs from "./bottom-navs";
import NavbarSheet from "./navbar-sheet";
import { useSearch } from "@/hooks/use-search";
import { useModal } from "@/hooks/use-modal";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";

export default function Navbar() {
  const [state, setState] = useState(false);
  const [drapdownState, setDrapdownState] = useState<{ isActive: boolean; idx: number | null; }>({ isActive: false, idx: null });
  const [logo, setLogo] = useState("/logos/letter-logo.png");
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<(HTMLLIElement | null)[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { brands, fetchBrands, getBrandBySlug } = useBrandStore();
  const isVisible = useScrollVisibility({ threshold: 50, hideThreshold: 100 });

  // Search functionality
  const {
    searchQuery,
    searchResults,
    isSearching,
    handleSearchChange,
    navigateToResults,
    clearSearch,
  } = useSearch({ debounceMs: 300, limit: 5 });

  // Modal functionality
  const {
    isOpen: showSearchModal,
    open: openSearchModal,
    close: closeSearchModal,
    modalRef: searchModalRef,
  } = useModal({
    closeOnEscape: true,
    closeOnOutsideClick: true,
    preventBodyScroll: true,
    onOpen: () => {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    },
    onClose: clearSearch,
  });

  const navigation = [
    {
      title: "Home",
      path: "/",
      isDrapdown: false,
      highlight: pathname === "/",
    },
    {
      title: "Brands",
      path: "/brand",
      isDrapdown: true,
      highlight: pathname.includes("/brand"),
    },
    {
      title: "Product",
      path: "/products",
      isDrapdown: false,
      highlight: pathname.includes("/products"),
    },
    {
      title: "Career",
      path: "/career",
      isDrapdown: false,
      highlight: pathname === "/career",
    },
    {
      title: "About",
      path: "/about",
      isDrapdown: false,
      highlight: pathname === "/about",
    },
    {
      title: "Blogs",
      path: "/blogs",
      isDrapdown: false,
      highlight: pathname === "/blogs",
    },
    {
      title: "Contact",
      path: "/contact",
      isDrapdown: false,
      highlight: pathname === "/contact",
    },
  ];

  // Handle dropdown close on mouse move
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const target = e.target as Node;
      const isInsideBrand = brandRef.current.some(
        (ref) => ref && ref.contains(target)
      );
      const isInsideModal = modalRef.current?.contains(target);
      if (!isInsideBrand && !isInsideModal) {
        setDrapdownState({ isActive: false, idx: null });
      }
    }
    document.addEventListener("mouseover", handleMouseMove);
    return () => document.removeEventListener("mouseover", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeSearchModal();
    navigateToResults();
  };

  const handleViewAll = () => {
    closeSearchModal();
    navigateToResults();
  };

  // Fetch brands on mount if not already loaded
  useEffect(() => {
    if (brands.length === 0) {
      fetchBrands();
    }
  }, [brands.length, fetchBrands]);



  if (pathname.startsWith("/test")) return null

  return (
    <>
      <NavbarDropdown drapdownState={drapdownState} setDrapdownState={setDrapdownState} modalRef={modalRef} />

      <nav
        className={`fixed  pointer-events-none transition-all duration-500 ${drapdownState.isActive ? "bg-background" : "  "} top-0 left-0 z-[220] w-full md:text-sm   ${state ? "shadow-lg rounded-b-xl md:shadow-none" : ""} ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="items-center justify-between lg:py-1 gap-x-4 lg:gap-x-8 xl:gap-x-14 px-4  xl:px-0 lg:max-w-7xl mx-auto lg:flex">



          <div className="flex items-center justify-between w-full  lg:w-auto py-2">
            <div className="pointer-events-auto flex justify-center items-center lg:hidden">
              <NavbarSheet onOpen={openSearchModal} />
            </div>
            <TransitionLink href="/" className="pointer-events-auto  w-fit  flex justify-center items-center ">
              <h2 className="text-[35px] leading-8 text-green-500 italic font-montserrat font-semibold">CCR</h2>
            </TransitionLink>


            <div className="lg:hidden z-40  flex justify-center items-center pointer-events-auto">
              <button
                onClick={openSearchModal}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 md:p-2 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Icon icon="teenyicons:search-outline" className="size-5" />
              </button>
            </div>


          </div>

          <div className={`nav-menu flex-1 w-full max-w-2xl pb-3 mt-4 lg:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"}`}>
            <ul className="items-center justify-end space-y-4 lg:flex text-white lg:space-x-5 lg:space-y-0">
              {navigation.map((item, idx) => (
                <li
                  key={idx}
                  ref={(el) => { brandRef.current[idx] = el; }}
                  className="relative pointer-events-auto "
                  onMouseEnter={() => {
                    if (item.isDrapdown) {
                      setDrapdownState({ idx, isActive: true });
                    } else {
                      setDrapdownState({ isActive: false, idx: null });
                    }
                  }}
                  onClick={() => {
                    if (!item.isDrapdown) {
                      setState(false);
                    }
                  }}
                >
                  {item.isDrapdown ? (
                    <TransitionLink href={item?.path}>
                      <button
                        key={idx}
                        className={`w-full flex items-center justify-between md:justify-center gap-1   py-2 md:py-0 ${item.highlight ? "text-primary" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDrapdownState({
                            idx,
                            isActive: !(drapdownState.idx === idx && drapdownState.isActive)
                          });
                        }}
                      >
                        {item.title}
                        <Icon icon="famicons:chevron-up" className={`w-5 h-5 transition-all duration-300 ${drapdownState.idx === idx && drapdownState.isActive ? "" : "rotate-180"}`} />
                      </button>
                    </TransitionLink>
                  ) : (
                    <TransitionLink
                      href={item.path}
                      className={`block hover:text-primary  py-2 md:py-0 ${item.highlight ? "" : ""}`}
                    >
                      {item.title}
                    </TransitionLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="hidden lg:flex pointer-events-auto items-center gap-3 lg:gap-4">
            <button
              onClick={openSearchModal}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 md:p-2 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Icon icon="teenyicons:search-outline" className="size-4" />
            </button>

            <TransitionLink target="_blank" href={"https://wa.link/fz239i"}>
              <div className="flex gap-2 bg-green-500 text-white items-center group  border rounded-full px-4 py-1.5   transition-all cursor-pointer ">
                <Icon icon={"logos:whatsapp-icon"} className="size-4  group-hover:grayscale-0" />
                Whatsapp
              </div>
            </TransitionLink>
          </div> */}
        </div>
      </nav>
      {state && (
        <div
          onMouseEnter={() => setDrapdownState({ idx: null, isActive: false })}
          className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
        ></div>
      )}

      {showSearchModal && (
        <div className="fixed inset-0 z-[195] bg-black/60 backdrop-blur-sm flex items-start justify-center  md:pt-24 animate-in fade-in duration-200">
          <div
            ref={searchModalRef}
            className="bg-white dark:bg-zinc-900 md:rounded-xl text-sm shadow-2xl w-full md:w-[95%] max-w-3xl h-screen md:max-h-[70vh] overflow-hidden animate-in slide-in-from-top-4 duration-300"
          >
            <div className="p-4  md:p-6 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                <Icon icon="teenyicons:search-outline" className="size-5 md:size-6 text-zinc-400 flex-shrink-0" />
                <form onSubmit={handleSubmit} className="flex-1">
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    maxLength={50}
                    onChange={(e) => e.isTrusted ? handleSearchChange(e.target.value) : null}
                    type="text"
                    name="search"
                    placeholder="Search products..."
                    className="w-full text-lg md:text-xl bg-transparent border-none outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                    autoComplete="off"
                  />
                </form>
                <button
                  onClick={closeSearchModal}
                  className="text-zinc-400 hover:text-red-500 dark:hover:text-red-500 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-shrink-0"
                >
                  <Icon icon="heroicons:x-mark-solid" className="w-6 h-6" />
                </button>
              </div>

            </div>

            {/* Search Results */}
            <ScrollArea className="h-[calc(70vh-100px)]">
              {isSearching ? (
                <div className="flex items-center justify-center gap-2 py-12 text-sm text-zinc-500">
                  <Icon icon="line-md:loading-twotone-loop" className="size-5" />
                  <span>Searching...</span>
                </div>
              ) : searchQuery.trim() ? (
                searchResults.length > 0 ? (
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {searchResults.slice(0, 3).map((product) => (
                      <TransitionLink
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={closeSearchModal}
                        className="flex items-center gap-4 p-4 md:p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
                      >
                        {product.coverImage ? (
                          <Image
                            src={product.coverImage}
                            alt={product.title || "Product"}
                            width={80}
                            height={80}
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon icon="mdi:package-variant" className="size-8 text-zinc-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className=" text-base  truncate group-hover:text-primary transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate mt-1">
                            {product?.brandName || product?.model}
                          </p>
                        </div>
                        <Icon icon="tabler:arrow-up-right" className="size-5 text-zinc-400 group-hover:text-primary transition-colors flex-shrink-0" />
                      </TransitionLink>
                    ))}

                    {/* View All Button */}
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 sticky bottom-0">
                      <button
                        onClick={handleViewAll}
                        className="w-fit p-2 px-4 text-center border border-primary text-primary rounded-lg hover:bg-primary hover:text-white font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        View All Results
                        <Icon icon="tabler:arrow-right" className="size-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 md:p-16 text-center">
                    <Icon icon="mdi:magnify-close" className="size-16 md:size-20 mx-auto mb-4 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-lg text-zinc-500 dark:text-zinc-400">No products found</p>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-2">Try searching with different keywords</p>
                  </div>
                )
              ) : (
                <div className="p-4  ">
                  <p className="text-lg text-zinc-500 dark:text-zinc-400">Quick Search </p>
                  <div className="flex gap-1  mt-2 items-center flex-wrap">
                    {brands?.map((brand) => (
                      <TransitionLink key={brand?.id} onClick={closeSearchModal} href={`/products?search=${brand?.slug}`} className="bg-muted/80 hover:text-white text-zinc-500 hover:bg-primary px-4 py-1 flex gap-1 items-center rounded-sm">{brand?.name} </TransitionLink>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}

      <ButtonNavs />

    </>
  );
}
