<script context="module">
    export async function load({session}) {
        if(!session.authorized) {
            return {
                status: 302,
                redirect: '/auth/unauthorized'
            }
        }
    }
</script>

<script>
    import { onMount } from "svelte";
    let user
    onMount(async () => {
		const res = await fetch(`/user`);
		user = await res.json();
	});
</script>

<h1>Profile Page</h1>

<p>Welcome to your profile {user.name}!</p>