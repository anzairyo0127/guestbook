CREATE TABLE public.posts (
    id SERIAL  NOT NULL,
    title character varying(256) NOT NULL,
    text text NOT NULL,
    name character varying(256) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);