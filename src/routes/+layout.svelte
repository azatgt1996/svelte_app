<script>
	import '../app.pcss';
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavUl, NavLi, DarkMode, P, Avatar,
           Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';

	$: activeUrl = $page.url.pathname;
</script>

<Navbar class="fixed" color="dark" style="z-index: 1000" >
	<NavBrand href="/">
		<img src="favicon.png" class="me-3 h-9" alt="Logo" />
		<P size="2xl" weight="bold">MyApp</P>
	</NavBrand>
	<NavUl {activeUrl}>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/products">Products</NavLi>
		<NavLi href="/crud">Crud</NavLi>
	</NavUl>
  <div class="inline-flex gap-5">
    <DarkMode/>
    <Avatar id="avatar-menu" src="https://flowbite-svelte.com/images/profile-picture-3.webp" />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <P>Bonnie Green</P>
      <P>name@flowbite.com</P>
    </DropdownHeader>
    <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Earnings</DropdownItem>
    <DropdownDivider />
    <DropdownItem>Sign out</DropdownItem>
  </Dropdown>
</Navbar>

<div style="padding-top: 90px">
  <slot />
</div>