import Image from "next/image";
import Link from "next/link";

import fb from '@/assets/footer/fb.svg';
import insta from '@/assets/footer/insta.svg';
import mail from '@/assets/footer/mail.svg';

const items = [
	{
		icon: mail,
		href: 'mailto:abramovanataliia8@gmail.com'
	},
	{
		icon: insta,
		href: 'https://www.instagram.com/candlesabramova.cz?igsh=MWs2eDQxd28yMGlmMg=='
	},
	{
		icon: fb,
		href: 'https://www.facebook.com/profile.php?id=61565584653170'
	}
]

export default function Footer() {
	return (
		<footer className="mt-auto" id="contacts">
			<div className="w-full h-2 md:h-3 bg-nugget"></div>
			<div className="py-4 md:py-5">
				<div className="content_container flex items-center gap-4 md:gap-5 justify-center md:justify-end">
					{
						items.map((item, index) => (
							<Link
								key={index}
								href={item.href}
								target="_blank"
								className="w-6 h-6 md:w-7 md:h-7 duration-300 hover:opacity-80"
							>
								<Image src={item.icon} alt="icon" className="cursor-pointer" />
							</Link>
						))
					}
				</div>
			</div>
		</footer>
	);
}