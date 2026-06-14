import React, { useState } from "react";
import "tailwindcss";
import { Container, Logo, LogoutBtn } from "../index.js";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, LogoutModal } from "../index.js";

import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-500/95 backdrop-blur-sm shadow-md">
        <Container>
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
            <div className="flex-shrink-0">
              <NavLink to="/">
                <Logo className="select-none" />
              </NavLink>
            </div>

            <div className="w-full sm:w-auto">
              <ul className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-3">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name} className="list-none">
                      <NavLink
                        to={item.slug}
                        className={({ isActive }) =>
                          `block rounded-full transition-all duration-300 ${
                            isActive ? "bg-gray-700/80" : ""
                          }`
                        }
                      >
                        <Button
                          onClick={() => navigate(item.slug)}
                          className="rounded-full bg-transparent"
                        >
                          {item.name}
                        </Button>
                      </NavLink>
                    </li>
                  ) : null,
                )}

                {authStatus && (
                  <li>
                    <Button onClick={() => setShowModal(true)}>Logout</Button>
                  </li>
                )}
              </ul>
              {showModal && (
                <LogoutModal isOpen={true} setShowModal={setShowModal} />
              )}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
