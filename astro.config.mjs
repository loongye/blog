// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Yong En',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/loongye' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/loongye' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/loongye' },
			],
			sidebar: [
				{ label: 'Home', slug: 'index' },
				{ label: 'About', slug: 'about' },
				{ label: 'Blog', items: [{ autogenerate: { directory: 'blog' } }] },
				{ label: 'Projects', slug: 'projects' },
				{ label: 'Now', slug: 'now' },
			],
			components: {
				Footer: './src/components/Footer.astro',
			},
		}),
	],
});
