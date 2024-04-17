<script>
    import "../app.css";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import logo from '$lib/assets/logo.webp';
    import { DarkMode } from 'flowbite-svelte';
    let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-xl p-1';
    const navLinks = [
        { href: "/", text: "Home" },
        { href: "/settings", text: "Settings" },
        { href: "/visuals", text: "Visuals" },
        //{ href: "/history", text: "History" },
    ];
    const navLinkClass = "self-center whitespace-nowrap text-xl font-semibold dark:text-white";

</script>
  


<Navbar>
    <NavBrand href="/">
        <img src={logo} class="me-3 h-6 sm:h-9" alt="Gator Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Estimator Tool</span>
    </NavBrand>
    <NavHamburger />
    <NavUl>
        {#each navLinks as { href, text }}
            <NavLi href={href} class={navLinkClass}>{text}</NavLi>
        {/each}
        <NavLi class='toggle'><DarkMode {btnClass}></DarkMode></NavLi>
    </NavUl>
</Navbar>


<slot></slot>