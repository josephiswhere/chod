SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.users (
	"_id" serial NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"name" varchar NOT NULL,
	"password" varchar NOT NULL,
	"is_chef" boolean NOT NULL,
	"bio" varchar,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.meals (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"chef_id" integer NOT NULL,
	CONSTRAINT "meals_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.subscriptions (
	"_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"event_id" integer NOT NULL,
	CONSTRAINT "subscriptions_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.events (
	"_id" serial NOT NULL,
	"meal_id" integer NOT NULL,
  "date" timestamp NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.sessions (
	"_id" serial NOT NULL,
	"cookie_id" varchar NOT NULL,
  "expires_by" timestamp NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.meals ADD CONSTRAINT "meals_fk0" FOREIGN KEY ("chef_id") REFERENCES public.users("_id");

ALTER TABLE public.events ADD CONSTRAINT "events_fk0" FOREIGN KEY ("meal_id") REFERENCES public.meals("_id");

ALTER TABLE public.subscriptions ADD CONSTRAINT "subscriptions_fk0" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");

ALTER TABLE public.subscriptions ADD CONSTRAINT "subscriptions_fk1" FOREIGN KEY ("event_id") REFERENCES  public.events("_id");
