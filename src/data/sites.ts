const SITES = [
	{
		domain: "producthunt.com",
		links: [
			{ text: "Products", link: "/" },
			{ text: "Community", link: "/discussions" },
			{ text: "Tools", link: "/founder-club" },
			{ text: "Jobs", link: "/jobs" },
			{ text: "About", link: "/about" },
		],
	},
	{
		domain: "github.com",
		links: [
			{ text: "New repo", link: "/new" },
			{ text: "Pull requests", link: "/pulls" },
			{ text: "Issues", link: "/issues" },
			{ text: "Marketplace", link: "/marketplace" },
			{ text: "Settings", link: "/settings" },
		],
	},
	{
		domain: "youtube.com",
		links: [
			{ text: "Library", link: "/feed/library" },
			{ text: "Gaming", link: "/gaming" },
			{ text: "Settings", link: "/account" },
		],
	},
];

export const getSite = (hostname: string) => {
	return SITES.find((site) => hostname.includes(site.domain));
};

export interface ILink {
	text: string;
	link: string;
}
