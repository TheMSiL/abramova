import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Obchodní podmínky | Abramova Svíčky',
	description: 'Obchodní podmínky a ochrana osobních údajů',
};

export default function ObchodniPodminky() {
	return (
		<div className='bg-black text-white py-10 md:py-16 lg:py-20 w-full flex-1'>
			<div className="content_container px-4">
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 lg:mb-16">
					Obchodní podmínky a ochrana osobních údajů
				</h1>

				{/* Obchodní podmínky */}
				<section className="mb-12 md:mb-16">
					<h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 border-b border-white/20 pb-3">
						Obchodní podmínky
					</h2>

					<div className="space-y-8 text-base md:text-lg">
						{/* 1. Úvodní ustanovení */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								1. Úvodní ustanovení
							</h3>
							<div className="space-y-2 text-white/90 leading-relaxed">
								<p>
									<span className="font-medium">1.1</span> Tyto obchodní podmínky upravují v souladu s ustanovením § 1751 odst. 1 zákona č. 89/2012 Sb., občanský zákoník, vzájemná práva a povinnosti mezi prodávajícím a kupujícím při prodeji ručně vyráběných svíček.
								</p>
								<p>
									<span className="font-medium">1.2</span> Tyto obchodní podmínky jsou nedílnou součástí každé kupní smlouvy.
								</p>
							</div>
						</div>

						{/* 2. Prodávající */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								2. Prodávající
							</h3>
							<div className="bg-white/5 rounded-lg p-4 md:p-6 space-y-2 text-white/90">
								<p><span className="font-medium">Jméno a příjmení / Název:</span> _______________</p>
								<p><span className="font-medium">IČO:</span> _______________</p>
								<p><span className="font-medium">Sídlo:</span> _______________</p>
								<p><span className="font-medium">E-mail:</span> _______________</p>
								<p><span className="font-medium">Telefon:</span> _______________</p>
							</div>
						</div>

						{/* 3. Uzavření kupní smlouvy */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								3. Uzavření kupní smlouvy
							</h3>
							<div className="space-y-2 text-white/90 leading-relaxed">
								<p>
									<span className="font-medium">3.1</span> Objednávku lze provést prostřednictvím webových stránek, e-mailu nebo zprávy.
								</p>
								<p>
									<span className="font-medium">3.2</span> Odesláním objednávky kupující potvrzuje, že se seznámil s těmito obchodními podmínkami a zásadami ochrany osobních údajů a v plném rozsahu s nimi souhlasí.
								</p>
								<p>
									<span className="font-medium">3.3</span> Úhradou objednávky kupující stvrzuje svůj souhlas s těmito obchodními podmínkami a bere na vědomí, že se na něj vztahují veškerá zde uvedená práva a povinnosti.
								</p>
								<p>
									<span className="font-medium">3.4</span> Prodávající si vyhrazuje právo objednávku nepřijmout.
								</p>
							</div>
						</div>

						{/* 4. Cena a platební podmínky */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								4. Cena a platební podmínky
							</h3>
							<div className="space-y-2 text-white/90 leading-relaxed">
								<p>
									<span className="font-medium">4.1</span> Ceny jsou uvedeny včetně všech daní.
								</p>
								<p>
									<span className="font-medium">4.2</span> Platba probíhá převodem na účet nebo jiným dohodnutým způsobem.
								</p>
								<p>
									<span className="font-medium">4.3</span> Prodávající může požadovat zálohu.
								</p>
							</div>
						</div>

						{/* 5. Výroba a dodání zboží */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								5. Výroba a dodání zboží
							</h3>
							<div className="space-y-2 text-white/90 leading-relaxed">
								<p>
									<span className="font-medium">5.1</span> Zboží je vyráběno na zakázku dle přání kupujícího.
								</p>
								<p>
									<span className="font-medium">5.2</span> Dodací lhůta je obvykle 3–7 pracovních dnů.
								</p>
								<p>
									<span className="font-medium">5.3</span> Zboží je odesláno po přijetí platby nebo dle dohody.
								</p>
							</div>
						</div>

						{/* 6. Odstoupení od smlouvy */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								6. Odstoupení od smlouvy
							</h3>
							<div className="space-y-2 text-white/90 leading-relaxed">
								<p>
									<span className="font-medium">6.1</span> Dle § 1837 občanského zákoníku nelze odstoupit od smlouvy, pokud je zboží vyrobeno na zakázku.
								</p>
							</div>
						</div>

						{/* 7. Reklamace */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								7. Reklamace
							</h3>
							<div className="space-y-2 text-white/90 leading-relaxed">
								<p>
									<span className="font-medium">7.1</span> Kupující je povinen zkontrolovat zboží při převzetí.
								</p>
								<p>
									<span className="font-medium">7.2</span> Reklamaci je nutné uplatnit bez zbytečného odkladu.
								</p>
							</div>
						</div>

						{/* 8. Odpovědnost a bezpečnost */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								8. Odpovědnost a bezpečnost
							</h3>
							<div className="space-y-3 text-white/90 leading-relaxed">
								<p>
									<span className="font-medium">8.1</span> Svíčky jsou určeny k dekorativnímu i běžnému použití.
								</p>
								<p>
									<span className="font-medium">8.2</span> Kupující je povinen dodržovat bezpečnostní pokyny:
								</p>
								<ul className="list-disc list-inside pl-4 space-y-1">
									<li>nenechávat svíčku bez dozoru</li>
									<li>uchovávat mimo dosah dětí</li>
									<li>používat na nehořlavém povrchu</li>
								</ul>
								<p>
									<span className="font-medium">8.3</span> Prodávající nenese odpovědnost za škody vzniklé nesprávným použitím.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Ochrana osobních údajů */}
				<section className="mb-12 md:mb-16">
					<h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 border-b border-white/20 pb-3">
						Ochrana osobních údajů
					</h2>

					<div className="space-y-8 text-base md:text-lg">
						{/* 9. Správce osobních údajů */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								9. Správce osobních údajů
							</h3>
							<p className="mb-3 text-white/90">Správcem osobních údajů je:</p>
							<div className="bg-white/5 rounded-lg p-4 md:p-6 space-y-2 text-white/90">
								<p><span className="font-medium">Jméno a příjmení / Název:</span> _______________</p>
								<p><span className="font-medium">IČO:</span> _______________</p>
								<p><span className="font-medium">Sídlo:</span> _______________</p>
								<p><span className="font-medium">E-mail:</span> _______________</p>
								<p><span className="font-medium">Telefon:</span> _______________</p>
							</div>
						</div>

						{/* 10. Jaké údaje zpracováváme */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								10. Jaké údaje zpracováváme
							</h3>
							<p className="mb-2 text-white/90">Zpracováváme:</p>
							<ul className="list-disc list-inside pl-4 space-y-1 text-white/90">
								<li>jméno a příjmení</li>
								<li>e-mail</li>
								<li>telefon</li>
								<li>doručovací adresu</li>
							</ul>
						</div>

						{/* 11. Účel zpracování */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								11. Účel zpracování
							</h3>
							<p className="mb-2 text-white/90">Údaje jsou zpracovávány za účelem:</p>
							<ul className="list-disc list-inside pl-4 space-y-1 text-white/90">
								<li>vyřízení objednávky</li>
								<li>komunikace se zákazníkem</li>
								<li>splnění zákonných povinností</li>
							</ul>
						</div>

						{/* 12. Doba uchování */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								12. Doba uchování
							</h3>
							<p className="text-white/90">
								Údaje uchováváme po dobu nezbytně nutnou a dle zákonných povinností.
							</p>
						</div>

						{/* 13. Předávání údajů */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								13. Předávání údajů
							</h3>
							<p className="mb-2 text-white/90">Údaje mohou být předány:</p>
							<ul className="list-disc list-inside pl-4 space-y-1 text-white/90">
								<li>dopravcům</li>
								<li>účetní firmě</li>
							</ul>
						</div>

						{/* 14. Práva zákazníka */}
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								14. Práva zákazníka
							</h3>
							<p className="mb-2 text-white/90">Máte právo:</p>
							<ul className="list-disc list-inside pl-4 space-y-1 text-white/90">
								<li>na přístup k údajům</li>
								<li>na opravu</li>
								<li>na výmaz</li>
								<li>na omezení zpracování</li>
								<li>podat stížnost u ÚOOÚ</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Závěrečná ustanovení */}
				<section className="mb-8">
					<h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 border-b border-white/20 pb-3">
						Závěrečná ustanovení
					</h2>

					<div className="space-y-8 text-base md:text-lg">
						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-3 text-amber-200">
								15. Závěrečná ustanovení
							</h3>
							<div className="space-y-2 text-white/90 leading-relaxed">
								<p>
									<span className="font-medium">15.1</span> Tyto podmínky jsou platné od: <span className="font-semibold text-amber-200">1. 3. 2026</span>
								</p>
								<p>
									<span className="font-medium">15.2</span> Prodávající si vyhrazuje právo tyto podmínky měnit.
								</p>
								<p>
									<span className="font-medium">15.3</span> Právní vztahy se řídí právem České republiky.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Footer note */}
				<div className="text-center text-sm md:text-base text-white/60 pt-8 border-t border-white/10">
					<p>© 2026 Abramova Svíčky & Dekorace. Všechna práva vyhrazena.</p>
				</div>
			</div>
		</div>
	);
}
