drop table if exists users cascade;

create table users (
    id serial primary key,
    name varchar(100) not null,
    email varchar(150) unique not null,
    password_hash varchar(255) not null,
    role varchar(50) not null default 'donor',
    crated_at timestamptz not null default now()
);

drop table if exists campaigns cascade;
create table campaigns (
    id serial primary key,
    title varchar (200) not null,
    description text,
    goal_amount numeric(12,2) not null,
    collected_amount numeric(12,2) not null default 0,
    created_at timestamptz not null default now()
);

drop table if exists donations cascade;
create table donations (
    id serial primary key,
    user_id integer not null references users(id) on delete cascade,
    campaign_id integer not null references campaigns(id) on delete cascade,
    amount numeric(12,2) not null,
    payment_method varchar(50),
    transaction_id varchar(100),
    donated_at timestamptz not null default now()
);

drop table if exists senior_interactions cascade;
create table senior_interactions (
    id serial primary key,
    senior_id integer not null references users(id) on delete cascade,
    agent_id integer not null references users(id) on delete set null,
    summary text,
    status varchar(50) default 'pending',
    interacted_at timestamptz not null default now()
);

drop table if exists admin_users cascade;
create table admin_users (
    id serial primary key,
    username varchar(50) unique not null,
    password_hash varchar(255) not null,
    permissions text[] not null default array['read','write','delete'],
    create_at timestamptz not null default now()
);