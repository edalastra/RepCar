create database workshop;

\conncet workshop

drop table city;

create table person (
    id serial primary key,
    cpf char(11) not null check( cpf ~ '^[0-9]{11}$' ),
    name varchar(100) not null,
    email varchar(100) not null,
    birthDate date not null,
    address varchar(300) not null,
    neighborhood varchar(100) not null,
    city_id int not null,
    created_at date default current_date,
    authenticate_id int not null,
    type varchar(10) check ( type in ('admin', 'client','worker') )
);

create table city (
    id serial primary key,
    name varchar(100) not null ,
    uf char(2) not null
);

create table authenticate (
    id serial primary key,
    username varchar(100) not null,
    password text not null
);


create table scheduling (
    worker_id int not null,
    datatime timestamp not null,
    description text not null,
    ps text,
    service_id int not null,
    vehicle_placa char(7) not null check ( vehicle_placa ~ '^[A-Z]{3}[A-Z0-9]{4}$'),
    constraint pk primary key (worker_id, datatime)
);

create table service (
    id serial primary key ,
    area varchar(10) check ( area in ('motor', 'eletrica', 'suspenção')),
    type varchar(10) check ( type in ('preventiva', 'corretiva')),
    name varchar(100) not null,
    description text not null,
    base_value money
);

create table vehicle (
    placa char(7) not null check ( placa ~ '^[A-Z]{3}[A-Z0-9]{4}$') primary key,
    brand varchar(30) not null ,
    model varchar(30) not null ,
    yaer char(4) not null,
    owner_id int not null
);

table authenticate;
delete from authenticate;