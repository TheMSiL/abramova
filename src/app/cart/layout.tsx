import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Košík",
	description: "Váš nákupní košík se svíčkami Abramova. Dokončete objednávku a dopřejte si ručně vyráběné sójové svíčky.",
	robots: {
		index: false,
		follow: true
	}
};

export default function CartLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
