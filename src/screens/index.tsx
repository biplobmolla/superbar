import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "../assets/css/styles.scss";
import { SearchIcon } from "@heroicons/react/solid";
import { getSite } from "../data/sites";
import classNames from "classnames";

export default function initApp() {
	const superbar = document.createElement("div");
	superbar.id = "sb-wrapper";
	document.body.appendChild(superbar);
	const superbarNode = document.getElementById("sb-wrapper");
	ReactDOM.render(<Index />, superbarNode);
}

export function Index() {
	const site = getSite(window.location.hostname);
	const searchRef = useRef<HTMLInputElement>(null);
	const [selectedIdx, setSelectedIdx] = useState(0);

	useEffect(() => {
		let _idx = 0;

		window.addEventListener("keydown", ({ key }) => {
			if (key === "ArrowDown" && site && _idx < site.links.length - 1) {
				_idx++;
				setSelectedIdx(_idx);
			} else if (key === "ArrowUp" && _idx > 0) {
				_idx--;
				setSelectedIdx(_idx);
			} else if (key === "Escape") {
				document.getElementById("sb-wrapper")?.remove();
			} else if (key === "Enter") {
				window.location.href = window.location.origin + site?.links[_idx].link;
			}
		});
	}, []);

	return (
		<div id="superbar" className="rounded-lg overflow-hidden">
			<div className="relative h-16 border-b border-gray-50">
				<SearchIcon className="w-4 h-4 absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" />
				<input
					ref={searchRef}
					autoFocus
					placeholder="Search or jump to"
					className="pl-12"
				/>
			</div>

			{site && (
				<div className="w-full text-sm font-medium text-gray-900 bg-white border-gray-200 p-2">
					{site?.links.map((link, idx) => (
						<Item
							key={link.link}
							selected={idx === selectedIdx}
							link={window.location.origin + link.link}
						>
							{link.text}
						</Item>
					))}
				</div>
			)}
		</div>
	);
}

const Item = ({ children, link, selected }: any) => {
	return (
		<a
			href={link}
			className={classNames(
				"block py-2.5 px-4 w-full hover:bg-gray-50 cursor-pointer rounded-lg",
				{ "bg-gray-50": selected }
			)}
		>
			{children}
		</a>
	);
};
