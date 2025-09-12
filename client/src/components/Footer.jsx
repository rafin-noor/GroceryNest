
import { assets, footerLinks } from "../assets/assets";

const socialLinks = [
  { href: "https://facebook.com", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" /></svg> },
  { href: "https://twitter.com", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.77c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.91 3.99 2.94A8.6 8.6 0 0 1 2 19.54c-.65 0-1.29-.04-1.92-.11A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" /></svg> },
  { href: "https://instagram.com", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5zm0 1.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm6.13 1.12a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" /></svg> },
];

const Footer = () => {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-[var(--color-primary)]/20">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-gray-300/30 text-gray-600">
                <div className="flex-1 min-w-[220px]">
                    <img className="w-32 mb-4" src={assets.logo} alt="GroceryNest logo" />
                    <p className="max-w-[410px] mt-2 text-gray-700 text-base leading-relaxed">
                        We deliver fresh groceries to your doorstep.<br />
                        Trusted by thousands of customers, we aim to make your shopping experience seamless and enjoyable.
                    </p>
                    <div className="flex gap-3 mt-5">
                        {socialLinks.map((s, i) => (
                            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[var(--color-primary)]/10 border border-gray-200 rounded-full p-2 transition-colors text-gray-500 hover:text-[var(--color-primary)] shadow-sm">
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-8 md:gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index} className="min-w-[120px]">
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2 tracking-wide uppercase">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:underline hover:text-[var(--color-primary)] transition-colors duration-150">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-5 text-center text-xs md:text-base text-gray-500">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-[var(--color-primary)]">GroceryNest</span>. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
