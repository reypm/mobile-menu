import React, {useState, useEffect, useRef} from "react";
import "./HamburgerMenu.css";

interface MenuItem {
    id: string;
    label: string;
    subMenu?: MenuItem[];
}

const toKebabCase = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const menuItems: MenuItem[] = [
    {id: toKebabCase("Home"), label: "Home"},
    {id: toKebabCase("About"), label: "About"},
    {
        id: toKebabCase("Services"),
        label: "Services",
        subMenu: [
            {
                id: toKebabCase("Web Development"),
                label: "Web Development",
                subMenu: [
                    {id: toKebabCase("Frontend"), label: "Frontend"},
                    {id: toKebabCase("Backend"), label: "Backend"},
                ],
            },
            {
                id: toKebabCase("SEO Optimization"),
                label: "SEO Optimization",
                subMenu: [
                    {
                        id: toKebabCase("On-Page SEO"),
                        label: "On-Page SEO",
                        subMenu: [
                            {id: toKebabCase("Content Optimization"), label: "Content Optimization"},
                        ],
                    },
                ],
            },
        ],
    },
    {id: toKebabCase("Contact"), label: "Contact"},
];

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(
        localStorage.getItem("selectedMenuItem") || null
    );
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedItem) {
            localStorage.setItem("selectedMenuItem", selectedItem);
        }
    }, [selectedItem]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setFocusedIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuItemClick = (id: string) => {
        setSelectedItem(id);
        setIsOpen(false);
        setFocusedIndex(-1);
    };

    const renderMenu = (items: MenuItem[], level = 0) => (
        <ul className={`menu-list level-${level}`}>
            {items.map((item) => (
                <li key={item.id}>
                    <button
                        className={`menu-item ${selectedItem === item.id ? "selected" : ""}`}
                        onClick={() => handleMenuItemClick(item.id)}
                    >
                        {item.label}
                    </button>
                    {item.subMenu && renderMenu(item.subMenu, level + 1)}
                </li>
            ))}
        </ul>
    );

    return (
        <nav className="hamburger-menu" ref={menuRef}>
            <button
                className="menu-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                ☰
            </button>
            {isOpen && renderMenu(menuItems)}
        </nav>
    );
};

export default HamburgerMenu;
