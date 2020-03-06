create database workshop;

create table person (
    id serial primary key ,
    cpf char(11) not null check( cpf ~ '^[0-9]{11}$' ) unique ,
    name varchar(100) not null,
    email varchar(100) not null unique,
    password text,
    birthDate date not null,
    cep char(8) not null check ( cep ~ '^[0-9]{8}$' ),
    address varchar(300) not null,
    neighborhood varchar(100) not null,
    city_id int not null,
    created_at date default current_date,
    type varchar(10) check ( type in ('admin', 'client','worker') )
);

drop table person cascade ;
create table city (
    id int primary key,
    name varchar(100) not null,
    state_id int not null
);

create table state (
    id int primary key ,
    name varchar(100) not null,
    uf char(2) not null
);



create table scheduling (
    id serial primary key ,
    datatime timestamp not null,
    description text not null,
    ps text,
    service_id int not null,
    vehicle_id int not null
);

create table service (
    id serial primary key ,
    area varchar(10) check ( area in ('motor', 'eletrica', 'suspenção')),
    type varchar(10) check ( type in ('preventiva', 'corretiva')),
    name varchar(100) not null,
    description text,
    base_value money
);

table service;
create table vehicle (
    id serial primary key ,
    placa char(7) not null check ( placa ~ '^[A-Z]{3}[A-Z0-9]{4}$') unique ,
    brand varchar(30) not null ,
    model varchar(30) not null ,
    yaer char(4) not null,
    owner_id int not null
);
drop table vehicle cascade ;

insert into vehicle (placa, brand, model, yaer, owner_id) values ('IKP3J96','Fiat','Siena','2002',1);

alter table person add foreign key (city_id) references city;
alter table scheduling add foreign key (service_id) references service;
alter table scheduling add foreign key (vehicle_id) references vehicle;
alter table vehicle add foreign key (owner_id) references person;
alter table city add foreign key (state_id) references state;


SELECT c.id from city c
JOIN state s on c.state_id = s.id
WHERE s.uf = 'RS' and c.name = 'Estação';

table person;

SELECT c.id, c.name FROM city c
            JOIN state s ON c.state_id = s.id
            WHERE s.uf = 'RS';
select name from city where id = 3859;
table vehicle;
SELECT id, name FROM state