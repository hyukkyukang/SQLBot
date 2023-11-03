"use client";
import { SQLBotLogo } from "@/ui/logo";
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function NavBar() {
    return (
        <Navbar>
            <NavbarBrand>
                <SQLBotLogo />
            </NavbarBrand>
            <NavbarContent className="sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link color="foreground" href="#">
                        Conversation
                    </Link>
                </NavbarItem>
                {/* <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem> */}
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Help
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
