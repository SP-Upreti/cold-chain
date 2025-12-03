"use client";
import { Icon } from "@iconify/react"
import TransitionLink from "./transition-link"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function NavbarSheet({ onOpen }: { onOpen: () => void }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const navigation = [
    {
      title: "Home",
      path: "/",
      icon: "solar:home-2-linear",
      highlight: pathname === "/",
    },
    {
      title: "Brands",
      path: "/brand",
      icon: "solar:tag-linear",
      highlight: pathname.includes("/brand"),
    },
    {
      title: "Products",
      path: "/products",
      icon: "solar:bag-4-linear",
      highlight: pathname.includes("/products"),
    },
    {
      title: "Career",
      path: "/career",
      icon: "solar:case-linear",
      highlight: pathname === "/career",
    },
    {
      title: "About",
      path: "/about",
      icon: "solar:info-circle-linear",
      highlight: pathname === "/about",
    },
    {
      title: "Blogs",
      path: "/blogs",
      icon: "solar:document-text-linear",
      highlight: pathname === "/blogs",
    },
    {
      title: "Contact",
      path: "/contact",
      icon: "solar:letter-linear",
      highlight: pathname === "/contact",
    },
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const closeSheet = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 250)
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="">
        <Icon icon={"tabler:menu-4"} className="size-6 text-zinc-500 hover:text-primary cursor-pointer" />
      </button>

      {isOpen && (
        <>
          <div
            className={`fixed inset-0 bg-black/80 z-[150] transition-opacity duration-250 ${isClosing ? 'opacity-0' : 'opacity-100'
              }`}
            onClick={closeSheet}
          />

          <div
            className="fixed top-0 left-0 bg-white dark:bg-zinc-900 h-full w-[85vw] sm:w-[400px] z-[160] shadow-2xl"
            style={{
              animation: isClosing ? 'slideOutLeft 0.25s ease-in forwards' : 'slideInLeft 0.25s ease-out',
              transform: isClosing ? 'translateX(-100%)' : 'translateX(0)'
            }}
          >
            <div className="border-b flex items-center px-4 md:px-6  justify-between">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Menu</h2>
              <button
                onClick={closeSheet}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <Icon icon="heroicons:x-mark" className="size-6 text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>

            <div className="h-screen bg-white dark:bg-zinc-900 overflow-y-auto overscroll-contain">
              <div className="px-3 md:px-6 py-4">
                <nav className="space-y-1">
                  {navigation.map((item, idx) => (
                    <TransitionLink
                      key={idx}
                      href={item.path}
                      onClick={closeSheet}
                      className={`flex items-center gap-4 px-4 py-1.5 md:py-3.5 rounded-xs md:rounded-lg ${item.highlight ? "bg-primary/10 text-primary" : ""
                        }`}
                    >
                      <Icon
                        icon={item.icon}
                        className={`size-5 ${item.highlight ? "text-primary" : "text-zinc-500"}`}
                      />
                      <span className="font-medium">{item.title}</span>
                      {item.highlight && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </TransitionLink>
                  ))}
                </nav>

                <div className="my-6 h-px bg-zinc-200 dark:bg-zinc-800" />

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 px-2 md:px-4">Quick Actions</h3>

                  <div
                    onClick={() => {
                      onOpen();
                      closeSheet();
                    }}
                    className="flex items-center gap-3 md:gap-4 px-2 md:px-4 py-1.5 md:py-3 rounded-lg"
                  >
                    <Icon icon="solar:magnifer-linear" className="size-5 text-zinc-500" />
                    <span className="font-medium">Search Products</span>
                  </div>

                  <TransitionLink
                    href="https://wa.link/fz239i"
                    target="_blank"
                    className="flex items-center gap-3 md:gap-4 px-2 md:px-4 py-1.5 md:py-3 rounded-lg"
                  >
                    <Icon icon="logos:whatsapp-icon" className="size-5" />
                    <span className="font-medium">WhatsApp Support</span>
                    <Icon icon="solar:arrow-right-up-linear" className="size-4 ml-auto text-zinc-400" />
                  </TransitionLink>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes slideInLeft {
              from {
                transform: translateX(-100%);
              }
              to {
                transform: translateX(0);
              }
            }
            @keyframes slideOutLeft {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-100%);
              }
            }
          `}</style>
        </>
      )}
    </>
  )
}
