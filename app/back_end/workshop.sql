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
    service_area_id int not null,
    service_type_id int not null ,
    vehicle_id int not null
);

create table service_area (
    id smallint primary key ,
    name varchar(30) not null
);

create table service_type (
    id smallint primary key ,
    name varchar(10) not null
);


create table vehicle (
    id serial primary key ,
    placa char(7) not null check ( placa ~ '^[A-Z]{3}[A-Z0-9]{4}$') unique ,
    model_id int not null ,
    year char(4) not null,
    description varchar(100),
    owner_id int not null
);
insert into vehicle (placa, model_id, year, owner_id) values ('IKP3J96',194,'2002',1);
insert into service_type values (1,'preventiva'), (2,'corretiva');
insert into service_area values (1,'motor'), (2,'eletrica'), (3,'suspenção'),(4,'escapamento');

alter table person add foreign key (city_id) references city;
alter table scheduling add foreign key (vehicle_id) references vehicle;
alter table scheduling add foreign key (service_area_id) references service_area;
alter table scheduling add foreign key (service_type_id) references service_type;
alter table vehicle add foreign key (owner_id) references person;
alter table model  add foreign key (brand_id) references brand ;
alter table vehicle add foreign key (model_id) references model;
alter table city add foreign key (state_id) references state;



delete from vehicle;
table person;
table vehicle;