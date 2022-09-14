import { NextSeo } from 'next-seo';
import { setEdgeHeader } from '@pantheon-systems/wordpress-kit';

import Image from 'next/image';
import Layout from '../components/layout';
import { PostGridItem, withGrid } from '../components/grid';

import { getFooterMenu } from '../lib/Menus';
import { getLatestPosts } from '../lib/Posts';

export default function Home({ menuItems, posts }) {
	const HomepageHeader = () => (
		<div className="prose sm:prose-xl mt-20 flex flex-col mx-auto max-w-fit">
			<h1 className="prose text-4xl text-center h-full">
				Welcome to{' '}
				<a
					className="text-blue-600 no-underline hover:underline"
					href="https://nextjs.org"
				>
					Next.js!
				</a>
			</h1>

			<div className="text-2xl">
				<div className="bg-black text-white rounded flex items-center justify-center p-4">
					Decoupled WordPress on{' '}
					<Image
						src="/pantheon.png"
						alt="Pantheon Logo"
						width={191}
						height={60}
					/>
				</div>
			</div>
		</div>
	);

	const PostGrid = withGrid(PostGridItem);

	return (
		<Layout footerMenu={menuItems}>
			<NextSeo
				title="Decoupled Next WordPress Demo"
				description="Generated by create next app."
			/>
			<HomepageHeader />
			<section>
				<PostGrid contentType="posts" data={posts} />
			</section>
		</Layout>
	);
}

export async function getServerSideProps({ res }) {
	const menuItems = await getFooterMenu();
	const posts = await getLatestPosts();
	setEdgeHeader({ res });

	return {
		props: {
			menuItems,
			posts,
		},
	};
}
