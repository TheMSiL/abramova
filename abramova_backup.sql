--
-- PostgreSQL database dump
--

\restrict lnhEg4Edieknmk7btYuPI5dEXFl13i5bAZJZsMsZn2wWtMXzGjW4EdQY5f55dgt

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    category text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    weight integer,
    height integer,
    aroma text,
    "colorOptions" jsonb,
    "inStock" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, slug, name, description, "createdAt", "updatedAt") FROM stdin;
cmnac1n690000u89p0r883ym8	sklo	SVÍČKA VE SKLE	Ručně vyráběné vonné svíčky z přírodního sójového vosku s pečlivě vybranými vůněmi.	2026-03-28 12:54:57.68	2026-03-28 12:54:57.68
cmnac1n6g0001u89p8xvvapoc	designove	DESIGNOVÉ SVÍČKY	Krásně zabalené dárkové sady svíček pro každou příležitost.	2026-03-28 12:54:57.688	2026-03-28 12:54:57.688
cmnac1n6k0002u89piovgkm30	dekorativni	DEKORATIVNÍ SVÍČKY V KVĚTINÁČI	Elegantní nevonné svíčky pro minimalistický interiér a citlivé osoby.	2026-03-28 12:54:57.692	2026-03-28 12:54:57.692
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, price, category, image, description, weight, height, aroma, "colorOptions", "inStock", "createdAt", "updatedAt") FROM stdin;
svicka-ve-skle-1	SVÍČKA VE SKLENICE	670	sklo	/assets/products/glass/1.jpg	Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.	\N	\N	Bez vůně	[{"name": "Bílá", "value": "white"}, {"name": "Červená", "value": "red"}, {"name": "Žlutá", "value": "yellow"}, {"name": "Fialová", "value": "purple"}]	f	2026-03-28 12:54:57.696	2026-03-28 12:54:57.696
svicka-ve-skle-2	SOJOVÁ SVÍČKA	680	sklo	/assets/products/glass/2.jpg	Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.	\N	\N	Bez vůně	[{"name": "Bílá", "value": "white"}, {"name": "Červená", "value": "red"}, {"name": "Žlutá", "value": "yellow"}, {"name": "Fialová", "value": "purple"}]	t	2026-03-28 12:54:57.701	2026-03-28 12:54:57.701
svicka-ve-skle-3	BÍLÉ TULIPÁNY	690	sklo	/assets/products/glass/3.jpg	Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.	\N	\N	Tulipán	[{"name": "Bílá", "value": "white"}, {"name": "Červená", "value": "red"}, {"name": "Žlutá", "value": "yellow"}, {"name": "Fialová", "value": "purple"}]	t	2026-03-28 12:54:57.703	2026-03-28 12:54:57.703
svicka-ve-skle-4	SOJOVÁ SVÍČKA	1200	sklo	/assets/products/glass/4.jpg	Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.	\N	\N	Ruže	[{"name": "Bílá", "value": "white"}, {"name": "Červená", "value": "red"}, {"name": "Žlutá", "value": "yellow"}, {"name": "Fialová", "value": "purple"}]	t	2026-03-28 12:54:57.705	2026-03-28 12:54:57.705
svicka-ve-skle-5	KROKUSY	699	sklo	/assets/products/glass/5.jpg	Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.	\N	\N	Bez vůně	[{"name": "Bílá", "value": "white"}, {"name": "Červená", "value": "red"}, {"name": "Žlutá", "value": "yellow"}, {"name": "Fialová", "value": "purple"}]	t	2026-03-28 12:54:57.707	2026-03-28 12:54:57.707
svicka-ve-skle-6	BÍLÉ TULIPÁNY	1050	sklo	/assets/products/glass/6.jpg	Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.	\N	\N	Tulipán	[{"name": "Bílá", "value": "white"}, {"name": "Červená", "value": "red"}, {"name": "Žlutá", "value": "yellow"}, {"name": "Fialová", "value": "purple"}]	t	2026-03-28 12:54:57.709	2026-03-28 12:54:57.709
sojova-svicka-dekorace-1	SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI	680	dekorativni	/assets/products/decorate/1.jpg	Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.	\N	\N	\N	\N	t	2026-03-28 12:54:57.712	2026-03-28 12:54:57.712
sojova-svicka-dekorace-2	SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI	480	dekorativni	/assets/products/decorate/2.jpg	Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.	\N	\N	\N	\N	t	2026-03-28 12:54:57.713	2026-03-28 12:54:57.713
sojova-svicka-dekorace-3	SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI	390	dekorativni	/assets/products/decorate/3.jpg	Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.	\N	\N	\N	\N	t	2026-03-28 12:54:57.714	2026-03-28 12:54:57.714
sojova-svicka-dekorace-4	SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI	599	dekorativni	/assets/products/decorate/4.jpg	Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.	\N	\N	\N	\N	t	2026-03-28 12:54:57.716	2026-03-28 12:54:57.716
mlady-par	MLADÝ PÁR	650	designove	/assets/products/design/1.jpg	Dokonalý dárek pro milované osoby. Sada obsahuje dvě designové svíčky s romantickými vůněmi a elegantní dárkové balení.	420	240	\N	\N	t	2026-03-28 12:54:57.72	2026-03-28 12:54:57.72
svicka-medved	SVÍČKA MEDVĚD	830	designove	/assets/products/design/2.jpg	Luxusní dárková sada pro dokonalý relax. Obsahuje tři svíčky s uklidňujícími vůněmi, které vytvoří harmonickou atmosféru.	625	120	\N	\N	t	2026-03-28 12:54:57.721	2026-03-28 12:54:57.721
sojova-svicka-1	SOJOVA SVÍČKA	1050	designove	/assets/products/design/3.jpg	Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.	1100	150	\N	\N	t	2026-03-28 12:54:57.722	2026-03-28 12:54:57.722
sojova-svicka-2	SOJOVA SVÍČKA	210	designove	/assets/products/design/4.jpg	Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.	135	220	\N	\N	t	2026-03-28 12:54:57.723	2026-03-28 12:54:57.723
sojova-svicka-3	SOJOVA SVÍČKA	950	designove	/assets/products/design/5.jpg	Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.	665	130	\N	\N	t	2026-03-28 12:54:57.725	2026-03-28 12:54:57.725
velikonoce-sada	VELIKONOČNÍ SADA	550	designove	/assets/products/design/6.jpg	Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.	1100	150	\N	\N	t	2026-03-28 12:54:57.726	2026-03-28 12:54:57.726
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
80f5cb24-f5c9-45e3-8c5a-6e6f9b6a4838	a0eb944dbc8f946f8714adf9bffa87194223df7bf2ed5ed89150bf6b06950464	2026-03-28 14:52:12.352604+02	20260325161508_remove_product_details	\N	\N	2026-03-28 14:52:12.328072+02	1
\.


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: Product_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_category_idx" ON public."Product" USING btree (category);


--
-- Name: Product_inStock_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_inStock_idx" ON public."Product" USING btree ("inStock");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict lnhEg4Edieknmk7btYuPI5dEXFl13i5bAZJZsMsZn2wWtMXzGjW4EdQY5f55dgt

