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
    type varchar(10) check ( type in ('admin', 'client','worker') )
);


create table city (
    id serial primary key,
    name varchar(100) not null,
    uf char(2) not null
);

insert into city values (default, 'ERECHIM', 'RS');

table city;
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

alter table person add foreign key (city_id) references city;
alter table scheduling add foreign key (service_id) references service;
alter table scheduling add foreign key (vehicle_placa) references vehicle;
alter table vehicle add foreign key (owner_id) references person;

select c.name from person p
    join city c on p.city_id = c.id;