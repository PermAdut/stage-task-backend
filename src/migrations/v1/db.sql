BEGIN;


CREATE TABLE IF NOT EXISTS public."Projects"
(
    id bigserial NOT NULL,
    image text NOT NULL,
    "altText" character varying NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    version character varying NOT NULL,
    "moreVersion" character varying NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Users"
(
    id bigserial NOT NULL,
    username character varying NOT NULL,
    "passwordHash" character varying NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    age bigint NOT NULL,
    PRIMARY KEY (id)
);
END;