
const HeadingTitle = ({ title }: { title: string }) => {
	return (
		<h1 className='font-bold text-center text-3xl text-zinc-900 dark:text-neutral-300 capitalize'>
			{title}
		</h1>
	);
};

export default HeadingTitle;
